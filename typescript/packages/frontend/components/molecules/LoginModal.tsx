import React from "react";

import { css } from "@emotion/react";
import { Button, Divider, Icon, Modal } from "semantic-ui-react";

type Props = {
  isLoginModalOpen: boolean;
  loginWithTwitter: () => void;
  loginWithGoogle: () => void;
  onCloseLoginModal: () => void;
  openSignupModal: () => void;
};

export const LoginModal: React.VFC<Props> = (props) => {
  const { isLoginModalOpen, loginWithTwitter, loginWithGoogle, onCloseLoginModal, openSignupModal } = props;
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
        <div
          css={css`
            margin: 8px 0;
          `}
        />
        <Button color="twitter" size="huge" onClick={loginWithTwitter}>
          <Icon name="twitter" />
          Twitterログイン
        </Button>
        <div
          css={css`
            margin: 8px 0;
          `}
        />
        <Button color="black" size="huge" onClick={loginWithGoogle}>
          <Icon name="google" />
          Googleログイン
        </Button>
        <Divider />
        <Button content="新規登録はこちら" size="huge" onClick={openSignupModal} />
      </Modal.Content>
    </Modal>
  );
};
