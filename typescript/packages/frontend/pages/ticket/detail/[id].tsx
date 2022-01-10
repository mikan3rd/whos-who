import React, { useCallback, useMemo } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Props, TicketDetailPage } from "@/components/pages/TicketDetailPage";
import { Meta } from "@/components/templates/Meta";
import { client } from "@/graphql/client";
import {
  GetTicketByIdDocument,
  GetTicketByIdQuery,
  GetTicketByIdQueryVariables,
  useGetTicketByIdLazyQuery,
} from "@/graphql/generated";

type ServerSideProps = Pick<Props, "getTicketByIdData">;

export const getServerSideProps: GetServerSideProps<ServerSideProps, { id: string }> = async ({ params }) => {
  if (params === undefined) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  const { data } = await client.query<GetTicketByIdQuery, GetTicketByIdQueryVariables>({
    query: GetTicketByIdDocument,
    variables: { id: params.id },
    fetchPolicy: "no-cache",
  });

  const { getTicketById } = data;
  if (getTicketById === undefined || getTicketById === null) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  return {
    props: {
      getTicketByIdData: getTicketById,
    },
  };
};

const TicketDetail = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [fetch, { data }] = useGetTicketByIdLazyQuery();

  const getTicketByIdData = useMemo(
    () => data?.getTicketById ?? props.getTicketByIdData,
    [data?.getTicketById, props.getTicketByIdData],
  );

  const { person, externalImage } = getTicketByIdData;
  const isAccepting = person === undefined || person === null;

  const refetchTicket = useCallback(async () => {
    await fetch({ variables: { id: getTicketByIdData.id } });
  }, [fetch, getTicketByIdData.id]);

  return (
    <>
      <Meta
        title={isAccepting ? `回答者募集中の投稿` : `回答済みの投稿`}
        description={
          isAccepting ? `この画像の人物の名前を知っている人を探しています！` : `この画像の人物の名前を確認してみよう！`
        }
        imageUrl={externalImage?.url} // TODO: uploadedImageに対応
      />
      <TicketDetailPage getTicketByIdData={getTicketByIdData} isAccepting={isAccepting} refetchTicket={refetchTicket} />
    </>
  );
};

export default TicketDetail;
