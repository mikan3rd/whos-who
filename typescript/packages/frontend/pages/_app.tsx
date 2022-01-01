import React from "react";

import { ApolloProvider } from "@apollo/client";
import { locale } from "dayjs";
import type { AppProps } from "next/app";

import { AuthProvider } from "@/context/auth";
import { client } from "@/graphql/client";
import { GlobalStyle } from "@/styles/GlobalStyle";

import "dayjs/locale/ja";
import "semantic-ui-css/semantic.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";

locale("ja");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {GlobalStyle}
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
