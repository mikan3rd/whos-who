import React, { useCallback, useEffect, useMemo } from "react";

import { ApolloError } from "@apollo/client";
import { css } from "@emotion/react";
import {
  User as FirebaseUser,
  GoogleAuthProvider,
  TwitterAuthProvider,
  UserCredential,
  getAuth,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { toast } from "react-semantic-toasts";
import { Button, Icon, Modal } from "semantic-ui-react";

import { client } from "@/graphql/client";
import {
  GetCurrentUserQuery,
  useGetCurrentUserLazyQuery,
  useUpsertGoogleAuthCredentialMutation,
} from "@/graphql/generated";
import { useFirebase } from "@/hooks/useFirebase";

type Credential = UserCredential & { user: { accessToken: string } };

type State = {
  authStatus: "initial" | "loading" | "completed";
  firebaseUser: FirebaseUser | null;
  currentUser: GetCurrentUserQuery["getCurrentUser"] | null;
  isLoginModalOpen: boolean;
};

type Action =
  | {
      type: "SetAuthStatus";
      payload: State["authStatus"];
    }
  | {
      type: "SetFirebaseUser";
      payload: State["firebaseUser"];
    }
  | {
      type: "SetCurrentUser";
      payload: State["currentUser"];
    }
  | {
      type: "SetIsLoginModalOpen";
      payload: State["isLoginModalOpen"];
    };

const reducer: React.Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case "SetAuthStatus":
      return { ...state, authStatus: action.payload };

    case "SetFirebaseUser":
      return { ...state, firebaseUser: action.payload };

    case "SetCurrentUser":
      return { ...state, currentUser: action.payload };

    case "SetIsLoginModalOpen":
      return { ...state, isLoginModalOpen: action.payload };

    default:
      return state;
  }
};

export const AuthContext = React.createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const { firebaseApp } = useFirebase();

  const [upsertGoogleAuthCredential] = useUpsertGoogleAuthCredentialMutation();

  const [state, dispatch] = React.useReducer(reducer, {
    authStatus: "initial",
    firebaseUser: null,
    currentUser: null,
    isLoginModalOpen: false,
  });
  const { firebaseUser, isLoginModalOpen, authStatus, currentUser } = state;
  // console.log({ firebaseUser, currentUser });

  const isLinkedGoogle = useMemo(
    () => currentUser?.googleAuthCredential !== null && currentUser?.googleAuthCredential !== undefined,
    [currentUser?.googleAuthCredential],
  );

  const logout = useCallback(async () => {
    // TODO: 複数のソーシャルアカウントを使い分ける場合の考慮
    if (firebaseApp !== null) {
      const firebaseAuth = getAuth(firebaseApp);
      await signOut(firebaseAuth);
      dispatch({ type: "SetFirebaseUser", payload: null });
    }

    localStorage.removeItem("token");
    client.clearStore();
    dispatch({ type: "SetCurrentUser", payload: null });

    toast({
      type: "success",
      title: "ログアウトしました！",
    });

    // if (firebaseApp !== null) {
    //   const firebaseAuth = getAuth(firebaseApp);
    //   await signInAnonymously(firebaseAuth);
    // }
  }, [firebaseApp]);

  const handleCompleteCurrentUser = useCallback((data: GetCurrentUserQuery) => {
    dispatch({ type: "SetCurrentUser", payload: data.getCurrentUser });
    dispatch({ type: "SetAuthStatus", payload: "completed" });

    if (data.getCurrentUser.role !== "NONE") {
      toast({
        type: "success",
        title: "ログインしました！",
      });
    }
    dispatch({ type: "SetIsLoginModalOpen", payload: false });
  }, []);

  const handleErrorCurrentUser = useCallback(
    (error: ApolloError) => {
      logout();
      dispatch({ type: "SetAuthStatus", payload: "completed" });
      toast({
        type: "error",
        title: error.name,
        description: error.message,
      });
    },
    [logout],
  );

  const [fetchCurrentUser] = useGetCurrentUserLazyQuery({
    onCompleted: handleCompleteCurrentUser,
    onError: handleErrorCurrentUser,
    fetchPolicy: "no-cache",
  });

  const setCurrentUser = useCallback(async () => {
    if (firebaseApp === null) {
      return;
    }

    dispatch({ type: "SetAuthStatus", payload: "loading" });

    const firebaseAuth = getAuth(firebaseApp);
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      dispatch({ type: "SetFirebaseUser", payload: currentUser });

      if (currentUser !== null) {
        const idToken = await currentUser.getIdToken();
        localStorage.setItem("token", idToken);
        fetchCurrentUser();
      } else {
        // 常に匿名ユーザーとしてログインする
        await signInAnonymously(firebaseAuth);
      }
    });
  }, [fetchCurrentUser, firebaseApp]);

  const loginWithGoogle = useCallback(async () => {
    if (firebaseUser === null) {
      return;
    }
    const provider = new GoogleAuthProvider();
    // TODO: ログアウト後の再ログインで別の匿名アカウントに紐づかないように修正する
    const credential = await linkWithPopup(firebaseUser, provider);

    const {
      user: { accessToken, refreshToken, displayName, email },
    } = credential as Credential;

    await upsertGoogleAuthCredential({
      variables: { googleAuthCredentialInput: { accessToken, refreshToken, displayName, email: email as string } },
    });

    await setCurrentUser();

    dispatch({ type: "SetIsLoginModalOpen", payload: false });
  }, [firebaseUser, setCurrentUser, upsertGoogleAuthCredential]);

  const loginWithTwitter = useCallback(async () => {
    if (firebaseUser === null) {
      return;
    }
    const provider = new TwitterAuthProvider();
    provider.setCustomParameters({ force_login: "true" });
    // TODO: ログアウト後の再ログインで別の匿名アカウントに紐づかないように修正する
    const credential = await linkWithPopup(firebaseUser, provider);
    // eslint-disable-next-line no-console
    console.log(credential);

    await setCurrentUser();

    dispatch({ type: "SetIsLoginModalOpen", payload: false });
  }, [firebaseUser, setCurrentUser]);

  useEffect(() => {
    if (firebaseUser === null) {
      setCurrentUser();
    }
  }, [setCurrentUser, firebaseUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch, logout }}>
      {children}
      <Modal
        open={isLoginModalOpen}
        size="tiny"
        closeIcon
        onClose={() => dispatch({ type: "SetIsLoginModalOpen", payload: false })}
      >
        <Modal.Header>ログイン</Modal.Header>
        <Modal.Content
          scrolling
          css={css`
            &&& {
              text-align: center;
            }
          `}
        >
          <p>ログインするとあなたの投稿やLikeした投稿が確認できるようになります</p>
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
          <Button
            color="black"
            size="huge"
            disabled={authStatus === "loading" || isLinkedGoogle}
            onClick={loginWithGoogle}
          >
            <Icon name="google" />
            {isLinkedGoogle ? "Googleログイン済" : "Googleログイン"}
          </Button>
        </Modal.Content>
      </Modal>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
