import React from "react";

import { css } from "@emotion/react";
import dayjs from "dayjs";
import Link from "next/link";
import { Image, Label } from "semantic-ui-react";

import { GetTicketListQuery } from "@/graphql/generated";

type Props = {
  tickets: GetTicketListQuery["getTicketList"]["tickets"];
};

export const TicketList: React.VFC<Props> = (props) => {
  const { tickets } = props;
  return (
    <>
      <Image.Group
        css={css`
          &&& {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
          }
        `}
      >
        {tickets.map((ticket) => {
          const { id, externalImage, uploadedImage, personId, createdAt, _count } = ticket;
          const isAccepting = personId === undefined || personId === null;
          const imageUrl = externalImage?.url ?? uploadedImage?.url ?? "";
          return (
            <div
              key={id}
              css={css`
                position: relative;
                height: 100%;
                margin: 0 8px 8px;
              `}
            >
              <Link href={`/ticket/detail/${ticket.id}`} passHref>
                <a>
                  <Image
                    src={imageUrl}
                    alt={imageUrl}
                    rounded
                    label={{
                      color: isAccepting ? "red" : "green",
                      content: isAccepting ? `回答募集中` : `回答あり`,
                      ribbon: true,
                    }}
                    css={css`
                      &&& {
                        height: 100% !important;
                        margin: 0;
                        img {
                          object-fit: cover;
                          width: 256px;
                          height: 256px;
                        }
                      }
                    `}
                  />
                </a>
              </Link>
              <Label attached="bottom left" color="red" basic>
                Like: {_count.ticketUserLikes}
              </Label>
              <Label attached="bottom right" basic>
                投稿日: {dayjs(createdAt).format("YYYY/MM/DD")}
              </Label>
            </div>
          );
        })}
      </Image.Group>
    </>
  );
};
