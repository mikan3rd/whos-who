import React, { useCallback, useMemo, useState } from "react";

import { css } from "@emotion/react";
import dayjs from "dayjs";
import Link from "next/link";
import { toast } from "react-semantic-toasts";
import { useDebounce } from "react-use";
import {
  Button,
  Card,
  Divider,
  DropdownItemProps,
  DropdownOnSearchChangeData,
  DropdownProps,
  Form,
  Header,
  Icon,
  Label,
  Message,
  Segment,
} from "semantic-ui-react";

import { useAuthContext } from "@/context/auth";
import {
  GetTicketByIdQuery,
  useCreatePersonSuggestionLikeMutation,
  useCreatePersonSuggestionMutation,
  useSearchPersonByWordLazyQuery,
} from "@/graphql/generated";

const NewPersonValue = "new" as const;

export type Props = {
  getTicketByIdData: NonNullable<GetTicketByIdQuery["getTicketById"]>;
  isAccepting: boolean;
  refetchTicket: () => Promise<void>;
};

export const TicketDetailPage: React.VFC<Props> = (props) => {
  const {
    getTicketByIdData: {
      id: ticketId,
      personId,
      user,
      externalImage,
      uploadedImage,
      personSuggestions,
      createdAt,
      _count,
    },
    isAccepting,
    refetchTicket,
  } = props;

  const {
    state: { currentUser },
  } = useAuthContext();

  const [searchPersonByWord, { data: searchPersonResult, loading: searchLoading }] = useSearchPersonByWordLazyQuery();
  const [createPersonSuggestion, { loading: createLoading }] = useCreatePersonSuggestionMutation();
  const [createPersonSuggestionLike, { loading: createLikeLoading }] = useCreatePersonSuggestionLikeMutation();

  const [searchText, setSearchText] = useState("");

  useDebounce(
    async () => {
      await searchPersonByWord({ variables: { word: searchText } });
    },
    1000,
    [searchText],
  );

  const [newPerson, setNewPerson] = useState<DropdownItemProps | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<DropdownItemProps | null>(null);

  const imageUrl = useMemo(
    () => externalImage?.url ?? uploadedImage?.url ?? "",
    [externalImage?.url, uploadedImage?.url],
  );
  const isExternalUrl = useMemo(() => externalImage?.url !== undefined, [externalImage?.url]);

  const isSuggested = useMemo(() => {
    if (selectedPerson === null || selectedPerson.value === NewPersonValue) {
      return false;
    }
    const target = personSuggestions?.find((personSuggestion) => personSuggestion.person.id === selectedPerson.value);
    return target !== undefined;
  }, [personSuggestions, selectedPerson]);

  const isSuggestedSelf = useMemo(() => {
    const target = personSuggestions?.find((personSuggestion) => personSuggestion.user.id === currentUser?.id);
    return target !== undefined;
  }, [currentUser?.id, personSuggestions]);

  const isValid = useMemo(() => {
    if (selectedPerson === null || isSuggested || isSuggestedSelf) {
      return false;
    }
    return true;
  }, [isSuggested, isSuggestedSelf, selectedPerson]);

  const personOptions = useMemo(() => {
    const options: DropdownItemProps[] =
      searchPersonResult?.searchPersonByWord.map((person) => ({ value: person.id, text: person.name })) ?? [];
    if (newPerson !== null) {
      options.push(newPerson);
    }
    return options;
  }, [newPerson, searchPersonResult?.searchPersonByWord]);

  const handleSearchPersonByWord = useCallback(
    (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownOnSearchChangeData) => {
      setSearchText(data.searchQuery);
    },
    [],
  );

  const handleAddPerson = useCallback((event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const option: DropdownItemProps = { value: NewPersonValue, text: data.value };
    setNewPerson(option);
    setSelectedPerson(option);
  }, []);

  const handleChangePerson = useCallback((event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const option = data.options?.find((option) => option.value === data.value) ?? null;
    setSelectedPerson(option);
  }, []);

  const handleCreatePersonSuggestion = useCallback(async () => {
    if (!isValid || selectedPerson === null) {
      return;
    }

    let personId;
    let personName;

    if (selectedPerson.value === NewPersonValue) {
      personName = selectedPerson.text as string;
    } else {
      personId = selectedPerson.value as string;
    }

    const { data } = await createPersonSuggestion({
      variables: { personSuggestionCreate: { ticketId, personId, personName } },
    });

    if (data !== undefined && data !== null) {
      await refetchTicket();
      toast({
        type: "success",
        title: "名前を登録しました！",
      });
    }
  }, [createPersonSuggestion, isValid, refetchTicket, selectedPerson, ticketId]);

  const handleCreatePersonSuggestionLike = useCallback(
    async (personSuggestionId: string) => {
      const { data } = await createPersonSuggestionLike({ variables: { personSuggestionId } });
      if (data !== undefined && data !== null) {
        await refetchTicket();
        toast({
          type: "success",
          title: "投票しました！",
        });
      }
    },
    [createPersonSuggestionLike, refetchTicket],
  );

  return (
    <>
      <Header>
        <Header.Content
          css={css`
            &&& {
              display: flex;
            }
          `}
        >
          <Label
            content={isAccepting ? `募集中` : `回答済み`}
            color={isAccepting ? "red" : "green"}
            css={css`
              &&& {
                margin-right: 4px;
                flex-shrink: 0;
              }
            `}
          />
          {isAccepting
            ? `この画像の人物の名前を知っている人を探しています！`
            : `この画像の人物の名前を確認してみよう！`}
        </Header.Content>
      </Header>

      <Segment>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          `}
        >
          <Button
            color="red"
            content="Like"
            icon="heart"
            label={{ basic: true, color: "red", pointing: "left", content: _count.ticketUserLikes }}
            // TODO: onClick
            // TODO: basic when user liked
          />

          <label>作成日: {dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</label>
        </div>

        <img
          src={imageUrl}
          alt={imageUrl}
          css={css`
            width: 100%;
            margin-top: 8px;
          `}
        />
        <Link href={`/user/detail/${user.id}`} passHref>
          <Label
            content={`投稿者: ${user.role !== "NONE" ? user.displayName : `ゲストユーザー${user.id.slice(0, 5)}`}`}
            css={css`
              &&& {
                margin-top: 4px;
              }
            `}
          />
        </Link>
        <br />
        {isExternalUrl && (
          <Label
            as="a"
            target="_blank"
            href={imageUrl}
            content={`画像参照先: ${imageUrl}`}
            css={css`
              &&& {
                margin-top: 4px;
              }
            `}
          />
        )}

        <Divider />

        {(personSuggestions === null || personSuggestions === undefined || personSuggestions.length === 0) && (
          <Message warning header="回答はまだありません" content="あなたが最初の回答者になりませんか？" />
        )}

        {personSuggestions?.map((personSuggestion) => {
          const {
            id: personSuggestionId,
            person,
            _count: { personSuggestionLikes },
          } = personSuggestion;
          const isTop = personId === person.id;
          return (
            <div
              key={personSuggestionId}
              css={css`
                &&& {
                  position: relative;
                }
              `}
            >
              <Link href={`/person/detail/${person.id}`} passHref>
                <Card
                  fluid
                  color={isTop ? "green" : undefined}
                  css={css`
                    &&& {
                      transform: none !important;
                    }
                  `}
                >
                  <Card.Content>
                    <Card.Header>
                      {isTop && <Icon name="check" color="green" />}
                      {person.name}
                    </Card.Header>
                    <Card.Meta>{personSuggestionLikes}票</Card.Meta>
                  </Card.Content>
                </Card>
              </Link>
              <Button
                content="投票する"
                color="blue"
                size="small"
                disabled={createLikeLoading}
                onClick={() => handleCreatePersonSuggestionLike(personSuggestionId)}
                css={css`
                  &&& {
                    position: absolute !important;
                    top: 1em;
                    right: 1em;
                    margin: 0;
                    width: fit-content;
                    z-index: 5;
                  }
                `}
              />
            </div>
          );
        })}

        <Divider />

        <Form>
          <Form.Field>
            <label>人物名の登録</label>
            <p>
              この画像の人物名を入力して名前が見つかった場合は選択してください
              <br />
              見つからない場合は新規登録してください
            </p>
            <Form.Dropdown
              options={personOptions}
              placeholder="人物名を入力してください"
              additionLabel="新規登録: "
              search
              selection
              fluid
              allowAdditions
              clearable
              additionPosition="bottom"
              value={selectedPerson?.value}
              loading={searchLoading}
              onSearchChange={handleSearchPersonByWord}
              onAddItem={handleAddPerson}
              onChange={handleChangePerson}
              error={isSuggested ? { content: "既に登録されている名前です" } : undefined}
            />
          </Form.Field>
          <Form.Field>
            <Form.Button
              content="上記の名前で登録する"
              color="blue"
              disabled={!isValid || createLoading}
              onClick={handleCreatePersonSuggestion}
              error={isSuggestedSelf ? { content: "既に回答済みです", pointing: "left" } : undefined}
            />
          </Form.Field>
        </Form>
      </Segment>
    </>
  );
};
