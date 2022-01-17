import React from "react";

import Head from "next/head";

export const Meta = React.memo<{
  title: string;
  description?: string;
  imageUrl?: string;
}>((props) => {
  const appUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const {
    title,
    description = "Who's Whoは画像と人物名を合わせるためのサービスです。\n誰の画像なのか投稿して聞いてみよう！",
    imageUrl = `${appUrl}/ogp_logo.png`,
  } = props;
  const titleWithSiteName = `${title} | Who's Who （フーズ・フー）`;
  return (
    <Head>
      <title>{titleWithSiteName}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={titleWithSiteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:title" content={titleWithSiteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />

      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" type="image/png" href="/logo_icon.png" />
    </Head>
  );
});
