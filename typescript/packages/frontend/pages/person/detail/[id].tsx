import React, { useMemo } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { PersonDetailPage } from "@/components/pages/PersonDetailPage";
import { Meta } from "@/components/templates/Meta";
import { client } from "@/graphql/client";
import { GetPersonByIdDocument, GetPersonByIdQuery, GetPersonByIdQueryVariables } from "@/graphql/generated";

type ServerSideProps = {
  getPersonById: NonNullable<GetPersonByIdQuery["getPersonById"]>;
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
      getPersonById,
    },
  };
};

const PersonDetail = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { getPersonById } = props;
  const { tickets } = getPersonById;

  const imageUrl = useMemo(
    () => tickets?.[0]?.externalImage?.url ?? tickets?.[0]?.uploadedImage?.url ?? undefined,
    [tickets],
  );

  return (
    <>
      <Meta title={`${getPersonById.name}の投稿一覧`} imageUrl={imageUrl} />
      <PersonDetailPage getPersonByIdData={getPersonById} />
    </>
  );
};

export default PersonDetail;
