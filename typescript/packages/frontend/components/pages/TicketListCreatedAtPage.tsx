import React, { useMemo, useState } from "react";

import { css } from "@emotion/react";
import dayjs from "dayjs";
import Link from "next/link";
import { Header, Image, Label, Pagination, PaginationProps, Segment } from "semantic-ui-react";

import { SortKey, SortOrder, useGetTicketListQuery } from "@/graphql/generated";

const take = 10;

export const TicketListCreatedAtPage: React.VFC = () => {
  const [activePage, setActivePage] = useState(1);

  const { data, refetch } = useGetTicketListQuery({
    variables: {
      ticketListInput: {
        sortKey: SortKey.CreatedAt,
        sortOrder: SortOrder.Desc,
        take,
        page: activePage,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const totalPages = useMemo(
    () => (data?.getTicketList !== undefined ? Math.ceil(data.getTicketList.totalCount / take) : 1),
    [data?.getTicketList],
  );

  const handlePageChange = React.useCallback(
    async (event: React.MouseEvent, data: PaginationProps) => {
      const page = data.activePage;
      if (typeof page === "number") {
        await refetch({
          ticketListInput: {
            sortKey: SortKey.CreatedAt,
            sortOrder: SortOrder.Desc,
            take,
            page,
          },
        });
        setActivePage(page);
      }
    },
    [refetch],
  );

  return (
    <>
      <Header content="新しい投稿一覧" />

      {data?.getTicketList !== undefined && (
        <Segment>
          <Image.Group
            css={css`
              &&& {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
              }
            `}
          >
            {data.getTicketList.tickets.map((ticket) => {
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

          <Pagination
            css={css`
              &&& {
                width: 100%;
                margin-top: 10px;
                overflow-x: auto;
                > a {
                  flex-grow: 1;
                  display: flex;
                  justify-content: center;
                }
              }
            `}
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Segment>
      )}
    </>
  );
};
