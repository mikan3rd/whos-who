import React, { useCallback, useEffect, useMemo, useState } from "react";

import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-semantic-toasts";
import { Divider, Form, Header, Message, Segment } from "semantic-ui-react";

import {
  useCreateTicketByExternalImageUrlMutation,
  useGetTicketByExternalImageUrlLazyQuery,
} from "@/graphql/generated";

const RadioName = "imageType" as const;
type ImageType = "externalImageUrl" | "uploadImage";

export const TicketCreatePage: React.VFC = () => {
  const router = useRouter();
  const [getTicket, { data: getTicketData, loading: getTicketLoading }] = useGetTicketByExternalImageUrlLazyQuery();
  const [createTicketByExternalImageUrl, { loading: createTicketLoading }] =
    useCreateTicketByExternalImageUrlMutation();

  const [imageType, setImageType] = useState<ImageType>("externalImageUrl");
  const [externalImageUrl, setExternalImageUrl] = useState("");
  const [isImageValid, setIsImageValid] = useState(false);

  const loading = useMemo(() => getTicketLoading ?? createTicketLoading, [createTicketLoading, getTicketLoading]);

  const alreadyExistTicketId = useMemo(
    () => getTicketData?.getTicketByExternalImageUrl?.id ?? null,
    [getTicketData?.getTicketByExternalImageUrl?.id],
  );

  const isValid = useMemo(() => {
    if (imageType === "externalImageUrl") {
      return isImageValid && alreadyExistTicketId === null;
    }
    // TODO
    return false;
  }, [alreadyExistTicketId, imageType, isImageValid]);

  const loadImage = useCallback((imageUrl: string) => {
    return new Promise<boolean>((resolve, reject) => {
      const img = new Image();
      img.onerror = (e) => {
        reject(false);
      };
      img.onload = () => {
        resolve(true);
      };
      img.src = imageUrl;
    });
  }, []);

  useEffect(() => {
    const checkValid = async () => {
      setIsImageValid(false);
      if (imageType === "externalImageUrl") {
        const result = await loadImage(externalImageUrl);
        setIsImageValid(result);
        if (result) {
          getTicket({ variables: { externalImageUrl } });
        }
      }
      if (imageType === "uploadImage") {
        // TODO
        setIsImageValid(false);
      }
    };

    checkValid();
  }, [externalImageUrl, getTicket, imageType, loadImage]);

  const handleCreateTicket = useCallback(async () => {
    if (!isValid) {
      return;
    }
    if (imageType === "externalImageUrl") {
      const { data, errors } = await createTicketByExternalImageUrl({
        variables: {
          externalImageUrl,
        },
      });
      if (errors !== undefined) {
        // eslint-disable-next-line no-console
        console.error(errors);
        return;
      }
      if (data !== undefined && data !== null) {
        await router.push({
          pathname: "/ticket/detail/[id]",
          query: { id: data.createTicketByExternalImageUrl.id },
        });
        toast({
          type: "success",
          title: "画像を投稿しました！",
        });
      }
    }
  }, [createTicketByExternalImageUrl, externalImageUrl, imageType, isValid, router]);

  return (
    <>
      <Header content="画像を投稿しよう！" />
      <Segment>
        <Form>
          <Form.Field>
            <label
              css={css`
                padding-bottom: 12px;
              `}
            >
              画像の登録方法を選択してください
            </label>
            <Form.Radio
              label="URLを入力して画像を投稿"
              name={RadioName}
              value="externalImageUrl"
              checked={imageType === "externalImageUrl"}
              onChange={() => setImageType("externalImageUrl")}
            />
            <Form.Radio
              label="画像をアップロードして投稿"
              name={RadioName}
              value="uploadImage"
              checked={imageType === "uploadImage"}
              onChange={() => setImageType("uploadImage")}
            />
            <Divider />
            {imageType === "externalImageUrl" && (
              <>
                <label
                  css={css`
                    padding-bottom: 8px;
                  `}
                >
                  画像のURLを入力してください
                  <span
                    css={css`
                      color: gray;
                      margin-left: 8px;
                    `}
                  >
                    例: https://example.jpg
                  </span>
                </label>
                <Form.Input
                  placeholder="画像のURLを入力してください"
                  value={externalImageUrl}
                  onChange={(e) => setExternalImageUrl(e.target.value)}
                  error={isImageValid ? undefined : "画像のURLが正しくありません"}
                />
              </>
            )}
            <Divider />
            <label>画像プレビュー</label>
            {imageType === "externalImageUrl" && isImageValid && (
              <>
                {alreadyExistTicketId !== null && (
                  <Link href={`/ticket/detail/${alreadyExistTicketId}`} passHref>
                    <Message
                      warning
                      css={css`
                        &&& {
                          display: block !important;
                        }
                      `}
                    >
                      <Message.Header>この画像は登録済みです</Message.Header>
                      <Message.Content>ここをクリックしてこの画像の投稿に遷移できます</Message.Content>
                    </Message>
                  </Link>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={externalImageUrl}
                  alt={externalImageUrl}
                  css={css`
                    width: 100%;
                  `}
                />
              </>
            )}
          </Form.Field>

          <Form.Button
            content="この画像の人物を募集する"
            color="blue"
            disabled={!isValid}
            loading={loading}
            onClick={handleCreateTicket}
          />
        </Form>
      </Segment>
    </>
  );
};
