import React from "react";

import type { NextPage } from "next";

import { TicketListCreatedAtPage } from "@/components/pages/TicketListCreatedAtPage";
import { Meta } from "@/components/templates/Meta";

const TicketListCreatedAt: NextPage = () => {
  return (
    <>
      <Meta title="新しい投稿一覧" />
      <TicketListCreatedAtPage />
    </>
  );
};

export default TicketListCreatedAt;
