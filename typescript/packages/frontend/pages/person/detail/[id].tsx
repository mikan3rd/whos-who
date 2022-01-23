import React from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { PersonDetailPage } from "@/components/pages/PersonDetailPage";
import { Meta } from "@/components/templates/Meta";
import { client } from "@/graphql/client";
import { GetPersonByIdDocument, GetPersonByIdQuery, GetPersonByIdQueryVariables } from "@/graphql/generated";

type ServerSideProps = {
  getPersonByIdData: NonNullable<GetPersonByIdQuery["getPersonById"]>;
};

export const getServerSideProps: GetServerSideProps<ServerSideProps, { id: string }> = async ({ params }) => {
  if (params === undefined) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  const { data } = await client.query<GetPersonByIdQuery, GetPersonByIdQueryVariables>({
    query: GetPersonByIdDocument,
    variables: { id: params.id },
    fetchPolicy: "no-cache",
  });

  const { getPersonById } = data;
  if (getPersonById === undefined || getPersonById === null) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  return {
    props: {
      getPersonByIdData: getPersonById,
    },
  };
};

const PersonDetail = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { getPersonByIdData } = props;
  return (
    <>
      <Meta title={`${getPersonByIdData.name}の詳細`} />
      <PersonDetailPage />
    </>
  );
};

export default PersonDetail;
