import React from "react";

import { Button, Header, Message, Segment } from "semantic-ui-react";

import { useAuthContext } from "@/context/auth";

export const MyPage: React.VFC = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useAuthContext();

  return (
    <>
      <Header content="マイページ" />
      <Segment>
        {currentUser?.role === "NONE" && (
          <>
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
          </>
        )}

        {currentUser !== null && currentUser.role !== "NONE" && (
          <Button
            content="ログアウト"
            color="red"
            onClick={() => dispatch({ type: "SetModalStatus", payload: "logout" })}
          />
        )}
      </Segment>
    </>
  );
};
