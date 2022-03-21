import React from "react";

import { Header } from "semantic-ui-react";

import { TicketListWithPagination } from "@/components/organisms/TicketListWithPagination";
import { SortKey } from "@/graphql/generated";

export const TicketListOrderByLikePage: React.VFC = () => {
  return (
    <>
      <Header content="人気の投稿一覧" />

      <TicketListWithPagination sortKey={SortKey.TicketUserLikes} />
    </>
  );
};
