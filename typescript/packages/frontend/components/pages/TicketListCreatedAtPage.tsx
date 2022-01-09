import React from "react";

import { css } from "@emotion/react";
import dayjs from "dayjs";
import Link from "next/link";
import { Header, Image, Label, Segment } from "semantic-ui-react";

import { SortKey, SortOrder, useGetTicketListQuery } from "@/graphql/generated";

export const TicketListCreatedAtPage: React.VFC = () => {
  const { data } = useGetTicketListQuery({
    variables: {
      ticketListInput: {
        sortKey: SortKey.CreatedAt,
        sortOrder: SortOrder.Desc,
        take: 10,
        page: 1,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <>
      <Header content="新しい投稿一覧" />
      <Segment>
        <Image.Group
          size="medium"
          css={css`
            &&& {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
            }
          `}
        >
          {data?.getTicketList.map((ticket) => {
            const { id, externalImage, uploadedImage, personId, createdAt, _count } = ticket;
            const isAccepting = personId === undefined || personId === null;
            const imageUrl = externalImage?.url ?? uploadedImage?.url ?? "";
            return (
              <Link key={id} href={`/ticket/detail/${ticket.id}`} passHref>
                <div
                  css={css`
                    position: relative;
                    height: 100%;
                  `}
                >
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
                        img {
                          object-fit: cover;
                          width: 100%;
                          height: 100%;
                        }
                      }
                    `}
                  />

                  <Label
                    attached="bottom left"
                    color="red"
                    basic
                    css={css`
                      &&& {
                        bottom: 7px;
                        left: 4px;
                      }
                    `}
                  >
                    Like: {_count.ticketUserLikes}
                  </Label>
                  <Label
                    attached="bottom right"
                    basic
                    css={css`
                      &&& {
                        right: 3px;
                        bottom: 7px;
                      }
                    `}
                  >
                    投稿日: {dayjs(createdAt).format("YYYY/MM/DD")}
                  </Label>
                </div>
              </Link>
            );
          })}
        </Image.Group>
      </Segment>
    </>
  );
};
