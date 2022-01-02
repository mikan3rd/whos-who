import React from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { client } from "@/graphql/client";
import { GetTicketByIdDocument, GetTicketByIdQuery, GetTicketByIdQueryVariables } from "@/graphql/generated";

type Props = { getTicketByIdData: NonNullable<GetTicketByIdQuery["getTicketById"]> };

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async ({ params }) => {
  if (params === undefined) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  const { data } = await client.query<GetTicketByIdQuery, GetTicketByIdQueryVariables>({
    query: GetTicketByIdDocument,
    variables: { id: params.id },
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
  return <>TEST</>;
};

export default TicketDetail;
