import React from "react";

import { css } from "@emotion/react";
import NextImage from "next/image";
import Link from "next/link";
import { Card, Image, Menu } from "semantic-ui-react";

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
          <NextImage src="/vercel.svg" alt="Vercel" layout="fill" />
        </Menu.Item>
      </Link>

      <Link href="/" passHref>
        <Menu.Item content="TOP" />
      </Link>

      <Link href="/ticket/create" passHref>
        <Menu.Item content="画像から人物を探す" />
      </Link>

      <Menu.Item>
        <Menu.Header content="個人設定" />
        <Menu.Menu>
          {currentUser?.role === "NONE" && (
            <Menu.Item content="新規登録" onClick={() => dispatch({ type: "SetModalStatus", payload: "signup" })} />
          )}

          {currentUser?.role === "NONE" && (
            <Menu.Item content="ログイン" onClick={() => dispatch({ type: "SetModalStatus", payload: "login" })} />
          )}

          <Link href="/mypage" passHref>
            <Menu.Item content="マイページ" />
          </Link>
        </Menu.Menu>
      </Menu.Item>

      {currentUser?.role === "ADMIN" && (
        <Link href="/admin" passHref>
          <Menu.Item content="管理用" />
        </Link>
      )}

      {currentUser !== null && (
        <div
          css={css`
            &&& {
              position: absolute;
              bottom: 0;
              width: 100%;
              padding: 8px;
            }
          `}
        >
          <Link href="/mypage" passHref>
            <Card>
              <Card.Content>
                {currentUser.photoUrl !== null && currentUser.photoUrl !== undefined && (
                  <Image
                    floated="right"
                    size="mini"
                    src={currentUser.photoUrl}
                    alt={currentUser.photoUrl}
                    css={css`
                      &&& {
                        margin-bottom: 0 !important;
                      }
                    `}
                  />
                )}
                <Card.Header>
                  {currentUser.role === "NONE"
                    ? `ゲスト${currentUser.id.slice(0, 5)}`
                    : currentUser.displayName ?? `ユーザー${currentUser.id.slice(0, 5)}`}
                </Card.Header>
                <Card.Meta>{currentUser.role === "NONE" ? `ログインが必要です` : `ログイン中`}</Card.Meta>
              </Card.Content>
            </Card>
          </Link>
        </div>
      )}
    </>
  );
});
