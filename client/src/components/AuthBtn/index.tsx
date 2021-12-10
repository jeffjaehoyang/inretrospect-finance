import { signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoMdLogOut } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

import { auth, db, provider, signOut, useFirebaseAuth } from '../../auth/FirebaseAuthContext';
import * as Styled from './styles';

export const AuthBtn = () => {
  const user = useFirebaseAuth();
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleAuth = () => {
    if (user === null) {
      // sign in with google
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // update db
          const userQuery = query(
            usersCollectionRef,
            where("uid", "==", result.user.uid)
          );
          const userQuerySnapshot = await getDocs(userQuery);
          if (userQuerySnapshot.size === 0) {
            await addDoc(usersCollectionRef, {
              displayName: result.user.displayName,
              email: result.user.email,
              uid: result.user.uid,
            });
          }
          localStorage.setItem("authUser", JSON.stringify(result.user));
          navigate(state?.path || "/dashboard");
        })
        .catch((e) => console.log(e));
    } else {
      signOut();
      localStorage.removeItem("authUser");
      navigate("/");
    }
  };
  return (
    <Styled.AuthBtn onClick={handleAuth}>
      {user ? <IoMdLogOut className="mr-2" /> : <FcGoogle className="mr-2" />}
      {user ? "Logout" : "Login"}
    </Styled.AuthBtn>
  );
};
