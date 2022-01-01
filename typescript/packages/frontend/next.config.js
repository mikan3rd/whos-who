/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false, // FIXME: react-semantic-uiが常にWarningとなるため
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
    APOLLO_URI: process.env.SERVER_APOLLO_URI,
  },
  publicRuntimeConfig: {
    APOLLO_URI: process.env.PUBLIC_APOLLO_URI,
  },
  devIndicators: {
    autoPrerender: false,
  },
};
