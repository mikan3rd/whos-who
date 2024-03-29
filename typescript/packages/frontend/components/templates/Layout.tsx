import React from "react";

import { css } from "@emotion/react";
import { SemanticToastContainer } from "react-semantic-toasts";
import TopBarProgress from "react-topbar-progress-indicator";
import { Container } from "semantic-ui-react";

import { ScrollTopButton } from "@/components/atoms/ScrollTopButton";
import { Header } from "@/components/molecules/Header";
import { PcSidebar, PhoneSidebar } from "@/components/molecules/Sidebar";
import { useRouteChange } from "@/hooks/useRouteChange";
import { GlobalStyle } from "@/styles/GlobalStyle";

export const Layout = React.memo(({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);
  const { loading } = useRouteChange();

  const handleOpenSidebar = React.useCallback(() => {
    setIsOpenSidebar(true);
  }, []);

  const handleCloseSidebar = React.useCallback(() => {
    setIsOpenSidebar(false);
  }, []);

  return (
    <>
      {GlobalStyle}

      <Header handleOpenSidebar={handleOpenSidebar} />

      <div
        css={css`
          min-height: 100vh;
          background-color: #f7f7f7;
          margin-left: 260px;
          @media (max-width: 600px) {
            margin-left: 0;
          }
        `}
      >
        <Container
          text
          css={css`
            padding: 16px 0 100px 0;
            @media (max-width: 600px) {
              margin-top: 60px;
            }
          `}
        >
          {children}
        </Container>
      </div>

      <ScrollTopButton />

      <PcSidebar />
      <PhoneSidebar isOpenSidebar={isOpenSidebar} handleCloseSidebar={handleCloseSidebar} />

      <SemanticToastContainer position="top-center" />

      {loading && <TopBarProgress />}
    </>
  );
});
