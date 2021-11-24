import React, { useState, createContext, useEffect } from 'react';
import { APIService } from '../firebase/firebase';
import { updateDbProfile } from '../firebase/firestore';
import { defaultUser } from './defaultUser';


const defaultContextValues = {
  authContext: {
    user: {},
    firebaseUserInstance: null,
    isLoggedIn: false,
    isLoading: true
  },
  login: () => {},
  logout: () => {},
  signup: () => {},
}

// Context
export const AuthContext = createContext(defaultContextValues);

// Provider
export const AuthProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(defaultContextValues.authContext);

  const onChange = async (user) => {
    if (user) {
      APIService.db().doc(`users/${user.uid}`).onSnapshot(snapshot => {
        const docData = snapshot.data();
        if(docData) {
          docData.userId = user.uid;
          setAuthContext(currentAuthContext => ({
            ...currentAuthContext,
            user: docData,
            firebaseUserInstance: user,
            isLoggedIn: true,
            isLoading: false,
          }))
        }
      })
    } else {
      setAuthContext((currentAuthContext) => ({
        ...currentAuthContext,
        user: null,
        isLoggedIn: false,
        isLoading: false,
        firebaseUserInstance: null,
      }));
    }
  }

  useEffect(() => {
    const unlisent = APIService.auth().onAuthStateChanged(onChange);
    return () => {
      unlisent();
    }
  }, [])


  const login = (email, password) => {
    return APIService.auth().signInWithEmailAndPassword(email, password);
  }

  const logout = () => {
    return APIService.auth().signOut();
  }

  const signup = async (email, password, name) => {
    const userCredential = await APIService.auth().createUserWithEmailAndPassword(email, password);
    await updateDbProfile(userCredential, name);
    return userCredential;
  }

  const resetPassword = (email) => {
    return APIService.auth().sendPasswordResetEmail(email);
  }

  return (
    <AuthContext.Provider value={{ authContext, login, logout, signup, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
