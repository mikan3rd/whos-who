import React from "react";

import { css } from "@emotion/react";
import { Button, Icon, Modal } from "semantic-ui-react";

type Props = {
  isLoginModalOpen: boolean;
  isLinkedGoogle: boolean;
  loginWithTwitter: () => void;
  loginWithGoogle: () => void;
  onCloseLoginModal: () => void;
};

export const LoginModal: React.VFC<Props> = (props) => {
  const { isLoginModalOpen, isLinkedGoogle, loginWithTwitter, loginWithGoogle, onCloseLoginModal } = props;
  return (
    <Modal open={isLoginModalOpen} size="tiny" closeIcon onClose={onCloseLoginModal}>
      <Modal.Header>ログイン</Modal.Header>
      <Modal.Content
        scrolling
        css={css`
          &&& {
            text-align: center;
          }
        `}
      >
        ログインするとあなたの投稿やLikeした投稿が確認できるようになります
        <Button
          color="twitter"
          size="huge"
          disabled
          // disabled={authStatus === "loading"} // TODO: Twitter APIの Elevated アクセス権が必要
          onClick={loginWithTwitter}
        >
          <Icon name="twitter" />
          Twitterログイン
        </Button>
        <div
          css={css`
            margin: 8px 0;
          `}
        />
        <Button color="black" size="huge" disabled={isLinkedGoogle} onClick={loginWithGoogle}>
          <Icon name="google" />
          {isLinkedGoogle ? "Googleログイン済" : "Googleログイン"}
        </Button>
      </Modal.Content>
    </Modal>
  );
};
