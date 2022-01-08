import React from "react";

import { Button, Header, Segment } from "semantic-ui-react";

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
        {currentUser !== null && currentUser.role !== "NONE" && (
          <Button
            content="ログアウト"
            color="red"
            onClick={() => dispatch({ type: "SetIsLogoutModalOpen", payload: true })}
          />
        )}
      </Segment>
    </>
  );
};
