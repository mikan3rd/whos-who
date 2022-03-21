import React from "react";

import type { NextPage } from "next";

import { TopPage } from "@/components/pages/TopPage";
import { Meta } from "@/components/templates/Meta";

const Home: NextPage = () => {
  return (
    <>
      <Meta title="トップ" />
      <TopPage />
    </>
  );
};

export default Home;
