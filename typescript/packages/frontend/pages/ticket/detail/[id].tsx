import React, { useCallback, useMemo } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { TicketDetailPage } from "@/components/pages/TicketDetailPage";
import { Meta } from "@/components/templates/Meta";
import { client } from "@/graphql/client";
import {
  GetTicketByIdDocument,
  GetTicketByIdQuery,
  GetTicketByIdQueryVariables,
  useGetTicketByIdLazyQuery,
} from "@/graphql/generated";

type ServerSideProps = {
  getTicketByIdData: NonNullable<GetTicketByIdQuery["getTicketById"]>;
};

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
  const [fetch, { data }] = useGetTicketByIdLazyQuery({ fetchPolicy: "cache-and-network" });

  const getTicketByIdData = useMemo(
    () => data?.getTicketById ?? props.getTicketByIdData,
    [data?.getTicketById, props.getTicketByIdData],
  );

  const { person, externalImage, uploadedImage } = getTicketByIdData;
  const isAccepting = person === undefined || person === null;

  const imageUrl = useMemo(
    () => externalImage?.url ?? uploadedImage?.url ?? "",
    [externalImage?.url, uploadedImage?.url],
  );

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
        imageUrl={imageUrl}
      />
      <TicketDetailPage
        getTicketByIdData={getTicketByIdData}
        isAccepting={isAccepting}
        imageUrl={imageUrl}
        refetchTicket={refetchTicket}
      />
    </>
  );
};

export default TicketDetail;
