import React from "react";

import { Button, Modal } from "semantic-ui-react";

type Props = {
  isLogoutModalOpen: boolean;
  logout: () => void;
  onCloseLogoutModal: () => void;
};

export const LogoutModal: React.VFC<Props> = (props) => {
  const { isLogoutModalOpen, logout, onCloseLogoutModal } = props;
  return (
    <Modal open={isLogoutModalOpen} size="tiny" closeIcon onClose={onCloseLogoutModal}>
      <Modal.Header>ログアウト</Modal.Header>
      <Modal.Content scrolling>
        ログアウトするとあなたの投稿やLikeした投稿は確認できなくなります
        <br />
        よろしいですか？
      </Modal.Content>
      <Modal.Actions>
        <Button content="ログアウト" color="red" onClick={logout} />
        <Button content="キャンセル" onClick={onCloseLogoutModal} />
      </Modal.Actions>
    </Modal>
  );
};
