import React from "react";

import { Header, Segment } from "semantic-ui-react";

import { TicketList } from "@/components/molecules/TicketList";
import { useGetTopPageDataQuery } from "@/graphql/generated";

export const TopPage: React.VFC = (props) => {
  const { data } = useGetTopPageDataQuery();

  return (
    <>
      {data?.getTopPageData !== undefined && (
        <>
          <Header content="人気の投稿一覧" />
          <Segment>
            <TicketList tickets={data.getTopPageData.ticketsOrderByLike} />
          </Segment>

          <Header content="新しい投稿一覧" />
          <Segment>
            <TicketList tickets={data.getTopPageData.ticketsOrderByCreatedAt} />
          </Segment>
        </>
      )}
    </>
  );
};
