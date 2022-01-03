import { inspect } from "util";

import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import getConfig from "next/config";
import { toast } from "react-semantic-toasts";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const APOLLO_URI = serverRuntimeConfig.APOLLO_URI ?? publicRuntimeConfig.APOLLO_URI;

const uploadLink = createUploadLink({
  uri: `${APOLLO_URI}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return {
    headers: {
      ...headers,
      authorization: token !== null ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors !== undefined)
    graphQLErrors.forEach((error) => {
      const { message, extensions } = error;
      // eslint-disable-next-line no-console
      console.error(`[GraphQL error]: ${inspect(error, { depth: null })}`);
      toast({
        type: "error",
        title: message,
        description: extensions.code,
        time: 5000,
      });
    });

  if (networkError !== undefined) {
    // eslint-disable-next-line no-console
    console.error(`[Network error]: ${networkError}`);
    toast({
      type: "error",
      title: networkError?.name ?? "",
      description: networkError?.message ?? "",
      time: 5000,
    });
  }
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, uploadLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
