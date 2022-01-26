import React from "react";

import { Header } from "semantic-ui-react";

import { TicketList } from "@/components/organisms/TicketList";
import { SortKey } from "@/graphql/generated";

export const TicketListOrderByLikePage: React.VFC = () => {
  return (
    <>
      <Header content="人気の投稿一覧" />

      <TicketList sortKey={SortKey.TicketUserLikes} />
    </>
  );
};
