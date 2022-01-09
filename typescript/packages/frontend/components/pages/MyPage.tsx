import React, { useMemo } from "react";

import { Button, Divider, Header, Icon, Message, Segment } from "semantic-ui-react";

import { useAuthContext } from "@/context/auth";

export const MyPage: React.VFC = () => {
  const {
    state: { currentUser },
    dispatch,
    signupWithGoogle,
    signupWithTwitter,
  } = useAuthContext();

  const isLinkedGoogle = useMemo(
    () => currentUser?.googleAuthCredential !== null && currentUser?.googleAuthCredential !== undefined,
    [currentUser?.googleAuthCredential],
  );

  const isLinkedTwitter = useMemo(
    () => currentUser?.twitterAuthCredential !== null && currentUser?.twitterAuthCredential !== undefined,
    [currentUser?.twitterAuthCredential],
  );

  return (
    <>
      <Header content="マイページ" />

      {currentUser?.role === "NONE" && (
        <Segment>
          <Message warning>
            <Message.Header>新規登録もしくはログインしてください</Message.Header>
            <Message.Content>
              投稿した画像やLikeした投稿を後から確認できるようになります
              <br />
              TwitterやGoogleなどのアカウントを使って簡単に登録できます
            </Message.Content>
          </Message>
          <Button
            content="新規登録"
            color="blue"
            onClick={() => dispatch({ type: "SetModalStatus", payload: "signup" })}
          />
          <Button
            content="ログイン"
            color="blue"
            onClick={() => dispatch({ type: "SetModalStatus", payload: "login" })}
          />
        </Segment>
      )}

      {currentUser !== null && currentUser.role !== "NONE" && (
        <Segment>
          <Header content="アカウント連携" />

          <p>連携しておくと別のログイン方法で同じアカウントを使用することができるようになります</p>

          <Button color="twitter" disabled={isLinkedTwitter} onClick={signupWithTwitter}>
            <Icon name="twitter" />
            {isLinkedTwitter ? "Twitterで登録済み" : "Twitterで連携"}
          </Button>

          <Button color="black" disabled={isLinkedGoogle} onClick={signupWithGoogle}>
            <Icon name="google" />
            {isLinkedGoogle ? "Googleで登録済み" : "Googleで連携"}
          </Button>
          <Divider />

          <Button
            content="ログアウト"
            color="red"
            onClick={() => dispatch({ type: "SetModalStatus", payload: "logout" })}
          />
        </Segment>
      )}
    </>
  );
};
