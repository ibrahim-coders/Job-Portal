import { useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import auth from '../firebase/firebase.init';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);
  //crecuser
  const creactUser = (email, password) => {
    setLoding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login
  const loginuser = (email, password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //signout
  const signOutUser = () => {
    setLoding(true);
    return signOut(auth);
  };
  //google
  const provider = new GoogleAuthProvider();
  const singwithGoogle = () => {
    setLoding(true);
    return signInWithPopup(auth, provider);
  };
  //observer
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoding(false);
    });
    return unsubcribe;
  }, []);
  const authInfo = {
    user,
    setUser,
    loding,
    setLoding,
    creactUser,
    loginuser,
    signOutUser,
    singwithGoogle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
