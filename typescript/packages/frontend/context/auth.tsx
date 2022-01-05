import React, { useCallback, useEffect } from "react";

import { ApolloError } from "@apollo/client";
import {
  User as FirebaseUser,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { toast } from "react-semantic-toasts";

import { client } from "@/graphql/client";
import { GetCurrentUserQuery, useGetCurrentUserLazyQuery } from "@/graphql/generated";
import { useFirebase } from "@/hooks/useFirebase";

type State = {
  authStatus: "initial" | "loading" | "completed";
  firebaseUser: FirebaseUser | null;
  currentUser: GetCurrentUserQuery["getCurrentUser"] | null;
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
    };

const reducer: React.Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case "SetAuthStatus":
      return { ...state, authStatus: action.payload };

    case "SetFirebaseUser":
      return { ...state, firebaseUser: action.payload };

    case "SetCurrentUser":
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
};

export const AuthContext = React.createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
      loginWithGoogle: () => void;
      loginWithTwitter: () => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const { firebaseApp } = useFirebase();

  const [state, dispatch] = React.useReducer(reducer, {
    authStatus: "initial",
    firebaseUser: null,
    currentUser: null,
  });
  const { firebaseUser } = state;

  const logout = useCallback(async () => {
    // TODO: 複数のソーシャルアカウントを使い分ける場合の考慮
    if (firebaseApp !== null) {
      const firebaseAuth = getAuth(firebaseApp);
      await signOut(firebaseAuth);
    }

    localStorage.removeItem("token");
    client.clearStore();

    dispatch({ type: "SetCurrentUser", payload: null });
    dispatch({ type: "SetFirebaseUser", payload: null });

    toast({
      type: "success",
      title: "ログアウトしました！",
    });
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
        await signInAnonymously(firebaseAuth);
      }
    });
  }, [fetchCurrentUser, firebaseApp]);

  const loginWithGoogle = useCallback(async () => {
    if (firebaseApp === null || firebaseUser === null) {
      return;
    }
    const provider = new GoogleAuthProvider();
    const firebaseAuth = getAuth(firebaseApp);
    await signInWithPopup(firebaseAuth, provider);
    await linkWithPopup(firebaseUser, provider);
    await setCurrentUser();
  }, [firebaseApp, firebaseUser, setCurrentUser]);

  const loginWithTwitter = useCallback(async () => {
    if (firebaseApp === null || firebaseUser === null) {
      return;
    }
    const provider = new TwitterAuthProvider();
    provider.setCustomParameters({ force_login: "true" });
    const firebaseAuth = getAuth(firebaseApp);
    await signInWithPopup(firebaseAuth, provider);
    await linkWithPopup(firebaseUser, provider);
    await setCurrentUser();
  }, [firebaseApp, firebaseUser, setCurrentUser]);

  useEffect(() => {
    if (firebaseUser === null) {
      setCurrentUser();
    }
  }, [setCurrentUser, firebaseUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch, loginWithGoogle, loginWithTwitter, logout }}>
      {children}
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
