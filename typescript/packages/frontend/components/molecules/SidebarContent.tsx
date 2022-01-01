import React from "react";

import { css } from "@emotion/react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

import { useAuthContext } from "@/context/auth";

export const SidebarContent = React.memo(() => {
  const {
    state: { firebaseUser, currentUser },
    logout,
  } = useAuthContext();

  return (
    <>
      <Link href="/" passHref>
        <Menu.Item>
          <img
            src="/vercel.svg"
            alt="Vercel"
            css={css`
              height: 60px;
              margin: 0;
            `}
          />
        </Menu.Item>
      </Link>

      <Link href="/" passHref>
        <Menu.Item content="TOP" />
      </Link>

      {currentUser && (
        <Link href="/admin" passHref>
          <Menu.Item content="管理用" />
        </Link>
      )}

      {firebaseUser && <Menu.Item content="ログアウト" onClick={logout} />}
    </>
  );
});
