import React from "react";

import Link from "next/link";
import { Divider, Header, Segment } from "semantic-ui-react";

import { TicketList } from "@/components/molecules/TicketList";
import { useGetTopPageDataQuery } from "@/graphql/generated";

export const TopPage: React.VFC = (props) => {
  const { data } = useGetTopPageDataQuery();

  return (
    <>
      {data?.getTopPageData !== undefined && (
        <>
          <Link href="/ticket/list/like" passHref>
            <a>
              <Header content="人気の投稿一覧" />
            </a>
          </Link>
          <Segment>
            <TicketList tickets={data.getTopPageData.ticketsOrderByLike} />
          </Segment>

          <Divider />

          <Link href="/ticket/list/createdAt" passHref>
            <a>
              <Header content="新しい投稿一覧" />
            </a>
          </Link>
          <Segment>
            <TicketList tickets={data.getTopPageData.ticketsOrderByCreatedAt} />
          </Segment>
        </>
      )}
    </>
  );
};
