// FirebaseAuthContext.tsx
import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

type User = firebase.User | null;

const FirebaseAuthContext = React.createContext<User>(null);

const FirebaseAuthProvider: React.FC = ({ children }) => {
  const authUser = localStorage.getItem("authUser");
  const userObj = authUser !== null ? JSON.parse(authUser) : null;
  const [user, setUser] = React.useState<User>(userObj);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseAuth = () => {
  const context = React.useContext(FirebaseAuthContext);
  return context;
};

const signOut = () => {
  auth.signOut();
};

export { FirebaseAuthProvider, useFirebaseAuth, signOut };
