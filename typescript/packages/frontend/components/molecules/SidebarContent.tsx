import React from "react";

import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

import { useAuthContext } from "@/context/auth";

export const SidebarContent = React.memo(() => {
  const {
    state: { currentUser },
    dispatch,
  } = useAuthContext();

  return (
    <>
      <Link href="/" passHref>
        <Menu.Item
          css={css`
            &&& {
              height: 60px;
            }
          `}
        >
          <Image src="/vercel.svg" alt="Vercel" layout="fill" />
        </Menu.Item>
      </Link>

      <Link href="/" passHref>
        <Menu.Item content="TOP" />
      </Link>

      <Link href="/ticket/create" passHref>
        <Menu.Item content="画像から人物を探す" />
      </Link>

      <Link href="/mypage" passHref>
        <Menu.Item content="マイページ" />
      </Link>

      {currentUser?.role === "NONE" && (
        <Menu.Item content="ログイン" onClick={() => dispatch({ type: "SetIsLoginModalOpen", payload: true })} />
      )}

      {currentUser?.role === "ADMIN" && (
        <Link href="/admin" passHref>
          <Menu.Item content="管理用" />
        </Link>
      )}
    </>
  );
});
