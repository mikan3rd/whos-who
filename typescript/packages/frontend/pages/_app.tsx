import React from "react";

import { ApolloProvider } from "@apollo/client";
import { locale } from "dayjs";
import type { AppProps } from "next/app";
import { polyfill } from "smoothscroll-polyfill";

import { Layout } from "@/components/templates/Layout";
import { AuthProvider } from "@/context/auth";
import { client } from "@/graphql/client";
import { GlobalStyle } from "@/styles/GlobalStyle";

import "dayjs/locale/ja";
import "semantic-ui-css/semantic.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";

locale("ja");

if (typeof window !== "undefined") {
  polyfill();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {GlobalStyle}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
