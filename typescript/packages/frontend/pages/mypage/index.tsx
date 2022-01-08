import React from "react";

import type { NextPage } from "next";

import { MyPage } from "@/components/pages/MyPage";
import { Meta } from "@/components/templates/Meta";

const MyPageIndex: NextPage = () => {
  return (
    <>
      <Meta title="マイページ" />
      <MyPage />
    </>
  );
};

export default MyPageIndex;
