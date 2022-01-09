import React from "react";

import { css } from "@emotion/react";
import { Button, Divider, Icon, Modal } from "semantic-ui-react";

type Props = {
  isLoginModalOpen: boolean;
  signupWithTwitter: () => void;
  signupWithGoogle: () => void;
  onCloseLoginModal: () => void;
  openLoginModal: () => void;
};

export const SignupModal: React.VFC<Props> = (props) => {
  const { isLoginModalOpen, signupWithTwitter, signupWithGoogle, onCloseLoginModal, openLoginModal } = props;
  return (
    <Modal open={isLoginModalOpen} size="tiny" closeIcon onClose={onCloseLoginModal}>
      <Modal.Header>新規登録</Modal.Header>
      <Modal.Content
        scrolling
        css={css`
          &&& {
            text-align: center;
          }
        `}
      >
        新規登録するとあなたの投稿やLikeした投稿が確認できるようになります
        <div
          css={css`
            margin: 8px 0;
          `}
        />
        <Button color="twitter" size="huge" onClick={signupWithTwitter}>
          <Icon name="twitter" />
          Twitterで新規登録
        </Button>
        <div
          css={css`
            margin: 8px 0;
          `}
        />
        <Button color="black" size="huge" onClick={signupWithGoogle}>
          <Icon name="google" />
          Googleで新規登録
        </Button>
        <Divider />
        <Button content="ログインはこちら" size="huge" onClick={openLoginModal} />
      </Modal.Content>
    </Modal>
  );
};
