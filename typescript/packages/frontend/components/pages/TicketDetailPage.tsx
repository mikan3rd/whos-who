import React, { useMemo } from "react";

import { css } from "@emotion/react";
import dayjs from "dayjs";
import Link from "next/link";
import { Button, Divider, Header, Label, Message, Segment } from "semantic-ui-react";

import { GetTicketByIdQuery } from "@/graphql/generated";

export type Props = {
  getTicketByIdData: NonNullable<GetTicketByIdQuery["getTicketById"]>;
  isAccepting: boolean;
};

export const TicketDetailPage: React.VFC<Props> = (props) => {
  const {
    getTicketByIdData: { user, externalImage, personSuggestions, createdAt, _count },
    isAccepting,
  } = props;

  // TODO: uploadedImageに対応
  const imageUrl = useMemo(() => externalImage?.url ?? "", [externalImage?.url]);

  const isExternalUrl = useMemo(() => externalImage?.url !== undefined, [externalImage?.url]);

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
          <div
            css={css`
              text-align: right;
            `}
          >
            <label>作成日: {dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</label>
            <br />
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
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageUrl}
          css={css`
            width: 100%;
            margin-top: 8px;
          `}
        />
        {isExternalUrl && <Label as="a" target="_blank" href={imageUrl} content={`画像参照先: ${imageUrl}`} />}
        <Divider />
        {personSuggestions === null && (
          <Message warning header="回答はまだありません" content="あなたが最初の回答者になりませんか？" />
        )}
      </Segment>
    </>
  );
};
