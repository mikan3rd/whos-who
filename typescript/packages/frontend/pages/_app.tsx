import React from "react";

import { locale } from "dayjs";
import type { AppProps } from "next/app";

import { GlobalStyle } from "@/styles/GlobalStyle";

import "dayjs/locale/ja";
import "semantic-ui-css/semantic.min.css";
import "react-semantic-toasts/styles/react-semantic-alert.css";

locale("ja");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {GlobalStyle}
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
