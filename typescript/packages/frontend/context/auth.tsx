import React, { useCallback, useEffect, useMemo } from "react";

import { ApolloError } from "@apollo/client";
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
import { useRouter } from "next/router";
import { toast } from "react-semantic-toasts";

import { LoginModal } from "@/components/molecules/LoginModal";
import { LogoutModal } from "@/components/molecules/LogoutModal";
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
  isLogoutModalOpen: boolean;
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
    }
  | {
      type: "SetIsLogoutModalOpen";
      payload: State["isLogoutModalOpen"];
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

    case "SetIsLogoutModalOpen":
      return { ...state, isLogoutModalOpen: action.payload };

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
  const router = useRouter();

  const [upsertGoogleAuthCredential] = useUpsertGoogleAuthCredentialMutation();

  const [state, dispatch] = React.useReducer(reducer, {
    authStatus: "initial",
    firebaseUser: null,
    currentUser: null,
    isLoginModalOpen: false,
    isLogoutModalOpen: false,
  });
  const { firebaseUser, isLoginModalOpen, isLogoutModalOpen, currentUser } = state;

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

    await router.push({ pathname: "/" });

    toast({
      type: "success",
      title: "ログアウトしました！",
    });

    dispatch({ type: "SetIsLogoutModalOpen", payload: false });
  }, [firebaseApp, router]);

  const handleCompleteCurrentUser = useCallback((args: { data: GetCurrentUserQuery; isToast: boolean }) => {
    const { data, isToast } = args;

    dispatch({ type: "SetCurrentUser", payload: data.getCurrentUser });
    dispatch({ type: "SetAuthStatus", payload: "completed" });

    if (isToast) {
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
    fetchPolicy: "network-only",
  });

  const setCurrentUser = useCallback(
    async (isToast = true) => {
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
          const { data, error } = await fetchCurrentUser();
          if (data !== undefined) {
            handleCompleteCurrentUser({ data, isToast });
          }
          if (error !== undefined) {
            handleErrorCurrentUser(error);
          }
        } else {
          // 常に匿名ユーザーとしてログインした状態にする
          await signInAnonymously(firebaseAuth);
        }
      });
    },
    [fetchCurrentUser, firebaseApp, handleCompleteCurrentUser, handleErrorCurrentUser],
  );

  const loginWithGoogle = useCallback(async () => {
    if (firebaseUser === null) {
      return;
    }

    const provider = new GoogleAuthProvider();
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
      setCurrentUser(false);
    }
  }, [setCurrentUser, firebaseUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch, logout }}>
      {children}
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        isLinkedGoogle={isLinkedGoogle}
        loginWithTwitter={loginWithTwitter}
        loginWithGoogle={loginWithGoogle}
        onCloseLoginModal={() => dispatch({ type: "SetIsLoginModalOpen", payload: false })}
      />
      <LogoutModal
        isLogoutModalOpen={isLogoutModalOpen}
        logout={logout}
        onCloseLogoutModal={() => dispatch({ type: "SetIsLogoutModalOpen", payload: false })}
      />
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
