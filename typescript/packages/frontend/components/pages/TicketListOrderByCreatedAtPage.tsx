import React from "react";

import { Header } from "semantic-ui-react";

import { TicketListWithPagination } from "@/components/organisms/TicketListWithPagination";
import { SortKey } from "@/graphql/generated";

export const TicketListOrderByCreatedAtPage: React.VFC = () => {
  return (
    <>
      <Header content="新しい投稿一覧" />

      <TicketListWithPagination sortKey={SortKey.CreatedAt} />
    </>
  );
};
