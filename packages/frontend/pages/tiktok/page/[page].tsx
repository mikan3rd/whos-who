import { GetStaticPaths, GetStaticProps } from "next";

import { Props } from "@/components/pages/TiktokIndex";
import TiktokIndexPage, { getCommonStaticProps } from "@/pages/tiktok";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps<Props, { page: string }> = async ({ params }) => {
  if (!params) {
    return { redirect: { statusCode: 302, destination: "/" } };
  }

  return await getCommonStaticProps({ page: Number(params.page) });
};

export default TiktokIndexPage;
