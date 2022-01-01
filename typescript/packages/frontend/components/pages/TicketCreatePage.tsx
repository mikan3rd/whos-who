import React from "react";

import { css } from "@emotion/react";
import { Divider, Form, Header, Segment } from "semantic-ui-react";

const RadioName = "imageType" as const;
type ImageType = "externalImageUrl" | "uploadImage";

export const TicketCreatePage: React.VFC = () => {
  const [imageType, setImageType] = React.useState<ImageType>("externalImageUrl");
  const [externalImageUrl, setExternalImageUrl] = React.useState("");
  return (
    <>
      <Header content="画像を登録しよう！" />
      <Segment>
        <Form>
          <Form.Field>
            <Form.Radio
              label="方法1: URLを入力して画像を登録"
              name={RadioName}
              value="externalImageUrl"
              checked={imageType === "externalImageUrl"}
              onChange={() => setImageType("externalImageUrl")}
            />
            {imageType === "externalImageUrl" && (
              <Form.Input
                placeholder="画像のURLを入力してください"
                value={externalImageUrl}
                onChange={(e) => setExternalImageUrl(e.target.value)}
              />
            )}
            <Divider />
            <Form.Radio
              label="方法2: 画像をアップロードして登録"
              name={RadioName}
              value="uploadImage"
              checked={imageType === "uploadImage"}
              onChange={() => setImageType("uploadImage")}
            />
            <Divider />
            <label>画像プレビュー</label>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={externalImageUrl}
              alt={externalImageUrl}
              css={css`
                width: 100%;
              `}
            />
          </Form.Field>
        </Form>
      </Segment>
    </>
  );
};
