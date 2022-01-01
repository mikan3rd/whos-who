import React, { useCallback, useMemo, useState } from "react";

import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { toast } from "react-semantic-toasts";
import { Divider, Form, Header, Segment } from "semantic-ui-react";

import { useCreateTicketByExternalImageUrlMutation } from "@/graphql/generated";

const RadioName = "imageType" as const;
type ImageType = "externalImageUrl" | "uploadImage";

export const TicketCreatePage: React.VFC = () => {
  const router = useRouter();
  const [createTicketByExternalImageUrl, { loading }] = useCreateTicketByExternalImageUrlMutation();

  const [imageType, setImageType] = useState<ImageType>("externalImageUrl");
  const [externalImageUrl, setExternalImageUrl] = useState("");

  const isValid = useMemo(() => {
    if (imageType === "externalImageUrl") {
      return externalImageUrl.length > 5;
    }
    // TODO: uploadImage
    return false;
  }, [externalImageUrl.length, imageType]);

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
            <Form.Radio
              label="方法1: URLを入力して画像を投稿"
              name={RadioName}
              value="externalImageUrl"
              checked={imageType === "externalImageUrl"}
              onChange={() => setImageType("externalImageUrl")}
              css={css`
                &&& {
                  font-weight: bold;
                }
              `}
            />
            {imageType === "externalImageUrl" && (
              <>
                <p>
                  <span
                    css={css`
                      color: gray;
                      margin-right: 4px;
                    `}
                  >
                    https://example.jpg
                  </span>
                  のようなURLを入力してください
                </p>
                <Form.Input
                  placeholder="画像のURLを入力してください"
                  value={externalImageUrl}
                  onChange={(e) => setExternalImageUrl(e.target.value)}
                />
              </>
            )}
            <Divider />
            <Form.Radio
              label="方法2: 画像をアップロードして投稿"
              name={RadioName}
              value="uploadImage"
              checked={imageType === "uploadImage"}
              onChange={() => setImageType("uploadImage")}
              css={css`
                &&& {
                  font-weight: bold;
                }
              `}
            />
            <Divider />
            <label>画像プレビュー</label>
            {imageType === "externalImageUrl" && isValid ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={externalImageUrl}
                alt={externalImageUrl}
                css={css`
                  width: 100%;
                `}
              />
            ) : (
              <p>画像のURLを入力してください</p>
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
