import React from "react";

import type { NextPage } from "next";

import { TicketCreatePage } from "@/components/pages/TicketCreatePage";
import { Meta } from "@/components/templates/Meta";

const CreateTicket: NextPage = () => {
  return (
    <>
      <Meta title="画像を投稿しよう！" />
      <TicketCreatePage />
    </>
  );
};

export default CreateTicket;
