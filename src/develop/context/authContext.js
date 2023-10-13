import React, { createContext, useState } from "react";
import { postData } from "../utils/fetchCall";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);

  const signUp = async (signUpData) => {
    setAuthenticating(true);
    // return postData('/signup', signUpData);
    try {
      const res = await postData('/auth/signup', false, signUpData, 'POST');
      const jsonData = await res.json();

      if (res.status === 422) {
        const errorMessage = jsonData.message !== undefined
          ? jsonData.message : 'Email already in use';
        const error = new Error(errorMessage);
        throw error;
      }
      if (res.status !== 200 || jsonData.token === undefined) {
        const error = new Error('Please try again later');
        throw error;
      }

      localStorage.setItem('token', JSON.stringify(jsonData));
      setAuthData(jsonData);
      setIsLoggedIn(true);
      return Promise.resolve();
    } catch (error) {
      setAuthenticating(false);
      const errorMessage = error.message ? error.message : 'Please try again later';
      return Promise.reject(errorMessage);
    }
  }

  const logIn = async (signUpData) => {
    setAuthenticating(true);
      try {
        const res = await postData('/auth/login', false, signUpData, 'POST');
        // console.log('inside login: ', res.status);
        if (res.status === 401 || res.status === 403) {
          const errorMessage = res.status === 401 ? 'User not found' : 'Password mismatch';
          const error = new Error(errorMessage);
          throw error;
        }
        if (res.status !== 200) {
          const error = new Error('Please try again later');
          throw error;
        }
        const jsonData = await res.json();
        if (jsonData.token === undefined) {
          const error = new Error('Please try again later');
          throw error;
        }
        const token = localStorage.getItem('token');
        if(token){
          localStorage.removeItem('token');
        }
        localStorage.setItem('token', JSON.stringify(jsonData));
        setAuthData(jsonData);
        setIsLoggedIn(true);
        return Promise.resolve();
      } catch (err) {
        setAuthenticating(false);
        const errorMessage = err.message ? err.message : 'Please try again later';
        return Promise.reject(errorMessage);
      }
  }

  const checkIsTokenStored = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('TOKEN: ', token)
    if (token) {
      setAuthData(token);
      setIsLoggedIn(true);
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }

  const logOut = () => {
    try {
      localStorage.removeItem('token');
      isLoggedIn(false);
      setAuthData(null);
      setAuthenticating(false);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject('Please try again later');
    }
  }
  
  return {
    loggedIn: isLoggedIn,
    token: authData,
    authenticating: authenticating,
    checkIsTokenStored: checkIsTokenStored,
    logIn: logIn,
    signUp: signUp,
    logOut: logOut
  }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>    
  )
}

export const useAuthValues = () => React.useContext(AuthContext);

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}