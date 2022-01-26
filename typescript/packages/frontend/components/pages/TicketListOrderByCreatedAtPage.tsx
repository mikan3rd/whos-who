import React from "react";

import { Header } from "semantic-ui-react";

import { TicketList } from "@/components/organisms/TicketList";
import { SortKey } from "@/graphql/generated";

export const TicketListOrderByCreatedAtPage: React.VFC = () => {
  return (
    <>
      <Header content="新しい投稿一覧" />

      <TicketList sortKey={SortKey.CreatedAt} />
    </>
  );
};
