import React from "react";

import type { NextPage } from "next";

import { TicketListOrderByCreatedAtPage } from "@/components/pages/TicketListOrderByCreatedAtPage";
import { Meta } from "@/components/templates/Meta";

const TicketListCreatedAt: NextPage = () => {
  return (
    <>
      <Meta title="新しい投稿一覧" />
      <TicketListOrderByCreatedAtPage />
    </>
  );
};

export default TicketListCreatedAt;
