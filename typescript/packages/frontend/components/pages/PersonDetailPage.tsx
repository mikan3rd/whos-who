import React from "react";

import { css } from "@emotion/react";
import dayjs from "dayjs";
import Link from "next/link";
import { Header, Image, Label, Segment } from "semantic-ui-react";

import { GetPersonByIdQuery } from "@/graphql/generated";

type Props = {
  getPersonByIdData: NonNullable<GetPersonByIdQuery["getPersonById"]>;
};

export const PersonDetailPage: React.VFC<Props> = (props) => {
  const {
    getPersonByIdData: { name, tickets },
  } = props;
  return (
    <>
      <Header content={`${name}の投稿一覧`} />
      {tickets !== undefined && tickets !== null && (
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
            {tickets.map((ticket) => {
              const { id, externalImage, uploadedImage, createdAt, _count } = ticket;
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
                        css={css`
                          &&& {
                            margin: 0;
                            object-fit: cover;
                            width: 256px;
                            height: 256px;
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
        </Segment>
      )}
    </>
  );
};
