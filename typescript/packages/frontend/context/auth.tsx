import React, { useCallback, useEffect } from "react";

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
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-semantic-toasts";

import { LoginModal } from "@/components/molecules/LoginModal";
import { LogoutModal } from "@/components/molecules/LogoutModal";
import { SignupModal } from "@/components/molecules/SignupModal";
import { client } from "@/graphql/client";
import {
  GetCurrentUserQuery,
  useGetCurrentUserLazyQuery,
  useUpsertGoogleAuthCredentialMutation,
  useUpsertTwitterAuthCredentialMutation,
} from "@/graphql/generated";
import { useFirebase } from "@/hooks/useFirebase";

type Credential = UserCredential & { user: { accessToken: string } };

const GoogleProviderId = "google.com" as const;
const TwitterProviderId = "twitter.com" as const;

type TwitterCredential = Credential & {
  _tokenResponse: { oauthAccessToken: string; oauthTokenSecret: string };
};

const AlreadyUseAccount = "auth/credential-already-in-use" as const;

type State = {
  authStatus: "initial" | "loading" | "completed";
  firebaseUser: FirebaseUser | null;
  currentUser: GetCurrentUserQuery["getCurrentUser"] | null;
  modalStatus: "none" | "signup" | "login" | "logout";
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
      type: "SetModalStatus";
      payload: State["modalStatus"];
    };

const reducer: React.Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case "SetAuthStatus":
      return { ...state, authStatus: action.payload };

    case "SetFirebaseUser":
      return { ...state, firebaseUser: action.payload };

    case "SetCurrentUser":
      return { ...state, currentUser: action.payload };

    case "SetModalStatus":
      return { ...state, modalStatus: action.payload };

    default:
      return state;
  }
};

export const AuthContext = React.createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
      signupWithGoogle: () => Promise<void>;
      signupWithTwitter: () => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const { firebaseApp } = useFirebase();
  const router = useRouter();

  const [upsertGoogleAuthCredential] = useUpsertGoogleAuthCredentialMutation();
  const [upsertTwitterAuthCredential] = useUpsertTwitterAuthCredentialMutation();

  const [state, dispatch] = React.useReducer(reducer, {
    authStatus: "initial",
    firebaseUser: null,
    currentUser: null,
    modalStatus: "none",
  });
  const { firebaseUser, modalStatus } = state;

  const handleCloseModal = useCallback(() => {
    dispatch({ type: "SetModalStatus", payload: "none" });
  }, []);

  const logout = useCallback(async () => {
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

    handleCloseModal();
  }, [firebaseApp, handleCloseModal, router]);

  const handleCompleteCurrentUser = useCallback(
    (args: { data: GetCurrentUserQuery; isToast: boolean }) => {
      const { data, isToast } = args;

      dispatch({ type: "SetCurrentUser", payload: data.getCurrentUser });
      dispatch({ type: "SetAuthStatus", payload: "completed" });

      if (isToast) {
        toast({
          type: "success",
          title: "ログインしました！",
        });
      }

      handleCloseModal();
    },
    [handleCloseModal],
  );

  const handleErrorCurrentUser = useCallback(
    (error: ApolloError) => {
      logout();
      dispatch({ type: "SetAuthStatus", payload: "completed" });
    },
    [logout],
  );

  const [fetchCurrentUser] = useGetCurrentUserLazyQuery({
    fetchPolicy: "no-cache",
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
          await signInAnonymously(firebaseAuth).catch((error) => {
            toast({
              type: "error",
              title: error.name,
              description: error.message,
              time: 5000,
            });
          });
        }
      });
    },
    [fetchCurrentUser, firebaseApp, handleCompleteCurrentUser, handleErrorCurrentUser],
  );

  const handleSignupError = useCallback((error: Error) => {
    if (error.message.includes(AlreadyUseAccount)) {
      toast({
        type: "error",
        title: "このアカウントは既に使用されています",
        description: "ログインをお試しください",
        time: 5000,
      });
      return null;
    }

    toast({
      type: "error",
      title: error.name,
      description: error.message,
      time: 5000,
    });
    return null;
  }, []);

  const signupWithGoogle = useCallback(async () => {
    if (firebaseUser === null) {
      return;
    }
    const provider = new GoogleAuthProvider();
    const credential = await linkWithPopup(firebaseUser, provider).catch((error: Error) => handleSignupError(error));

    if (credential === null) {
      return;
    }

    const {
      user: { providerData, accessToken, refreshToken },
    } = credential as Credential;
    const userData = providerData.find((d) => d.providerId === GoogleProviderId);

    if (userData === undefined) {
      return;
    }

    const { uid, displayName, email, photoURL } = userData;

    await upsertGoogleAuthCredential({
      variables: {
        googleAuthCredentialInput: {
          accessToken,
          refreshToken,
          uid,
          displayName,
          email: email as string,
          photoUrl: photoURL,
        },
      },
    });

    await setCurrentUser();
  }, [firebaseUser, handleSignupError, setCurrentUser, upsertGoogleAuthCredential]);

  const signupWithTwitter = useCallback(async () => {
    if (firebaseUser === null) {
      return;
    }
    const provider = new TwitterAuthProvider();
    provider.setCustomParameters({ force_login: "true" });
    const credential = await linkWithPopup(firebaseUser, provider).catch((error: Error) => handleSignupError(error));

    if (credential === null) {
      return;
    }

    const {
      user: { providerData, accessToken, refreshToken },
      _tokenResponse: { oauthAccessToken, oauthTokenSecret },
    } = credential as TwitterCredential;
    const userData = providerData.find((d) => d.providerId === TwitterProviderId);

    if (userData === undefined) {
      return;
    }

    const { uid, displayName, email, photoURL } = userData;

    await upsertTwitterAuthCredential({
      variables: {
        twitterAuthCredentialInput: {
          accessToken,
          refreshToken,
          oauthAccessToken,
          oauthTokenSecret,
          uid,
          displayName,
          email,
          photoUrl: photoURL,
        },
      },
    });

    await setCurrentUser();
  }, [firebaseUser, handleSignupError, setCurrentUser, upsertTwitterAuthCredential]);

  const loginWithGoogle = useCallback(async () => {
    if (firebaseApp === null) {
      return;
    }
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(firebaseAuth, provider);

    await setCurrentUser();

    const {
      user: { providerData, accessToken, refreshToken },
    } = credential as Credential;
    const userData = providerData.find((d) => d.providerId === GoogleProviderId);

    if (userData === undefined) {
      return;
    }

    const { uid, displayName, email, photoURL } = userData;

    // AuthTokenが更新された後に認証情報を更新
    await upsertGoogleAuthCredential({
      variables: {
        googleAuthCredentialInput: {
          accessToken,
          refreshToken,
          uid,
          displayName,
          email: email as string,
          photoUrl: photoURL,
        },
      },
    });
  }, [firebaseApp, setCurrentUser, upsertGoogleAuthCredential]);

  const loginWithTwitter = useCallback(async () => {
    if (firebaseApp === null) {
      return;
    }
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new TwitterAuthProvider();
    provider.setCustomParameters({ force_login: "true" });
    const credential = await signInWithPopup(firebaseAuth, provider).catch((error: Error) => handleSignupError(error));

    if (credential === null) {
      return;
    }

    await setCurrentUser();

    const {
      user: { providerData, accessToken, refreshToken },
      _tokenResponse: { oauthAccessToken, oauthTokenSecret },
    } = credential as TwitterCredential;
    const userData = providerData.find((d) => d.providerId === TwitterProviderId);

    if (userData === undefined) {
      return;
    }

    const { uid, displayName, email, photoURL } = userData;

    // AuthTokenが更新された後に認証情報を更新
    await upsertTwitterAuthCredential({
      variables: {
        twitterAuthCredentialInput: {
          accessToken,
          refreshToken,
          oauthAccessToken,
          oauthTokenSecret,
          uid,
          displayName,
          email,
          photoUrl: photoURL,
        },
      },
    });
  }, [firebaseApp, handleSignupError, setCurrentUser, upsertTwitterAuthCredential]);

  useEffect(() => {
    setCurrentUser(false);
  }, [setCurrentUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch, signupWithGoogle, signupWithTwitter }}>
      {children}
      <SignupModal
        isLoginModalOpen={modalStatus === "signup"}
        signupWithTwitter={signupWithTwitter}
        signupWithGoogle={signupWithGoogle}
        onCloseLoginModal={handleCloseModal}
        openLoginModal={() => dispatch({ type: "SetModalStatus", payload: "login" })}
      />
      <LoginModal
        isLoginModalOpen={modalStatus === "login"}
        loginWithTwitter={loginWithTwitter}
        loginWithGoogle={loginWithGoogle}
        onCloseLoginModal={handleCloseModal}
        openSignupModal={() => dispatch({ type: "SetModalStatus", payload: "signup" })}
      />
      <LogoutModal isLogoutModalOpen={modalStatus === "logout"} logout={logout} onCloseLogoutModal={handleCloseModal} />
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
