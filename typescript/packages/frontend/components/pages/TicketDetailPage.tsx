import React, { useMemo } from "react";

import { css } from "@emotion/react";
import { Button, Divider, Header, Label, Segment } from "semantic-ui-react";

import { GetTicketByIdQuery } from "@/graphql/generated";

export type Props = {
  getTicketByIdData: NonNullable<GetTicketByIdQuery["getTicketById"]>;
  isAccepting: boolean;
};

export const TicketDetailPage: React.VFC<Props> = (props) => {
  const {
    getTicketByIdData: { externalImage, _count },
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
        <Button
          color="red"
          content="Like"
          icon="heart"
          label={{ basic: true, color: "red", pointing: "left", content: _count.ticketUserLikes }}
          // TODO: onClick
        />
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
      </Segment>
    </>
  );
};
