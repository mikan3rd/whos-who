import React from "react";

import type { NextPage } from "next";

import { TicketListOrderByLikePage } from "@/components/pages/TicketListOrderByLikePage";
import { Meta } from "@/components/templates/Meta";

const TicketListLike: NextPage = () => {
  return (
    <>
      <Meta title="人気の投稿一覧" />
      <TicketListOrderByLikePage />
    </>
  );
};

export default TicketListLike;
