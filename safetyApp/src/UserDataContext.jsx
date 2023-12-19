import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../src/Auth/firebase.jsx";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [mockUserData, setMockUserData] = useState(null);

  const instance = axios.create({
    baseURL: "https://657b4290394ca9e4af14126e.mockapi.io/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserData(user);
        setIsLogin(true);
        
        await getUserData(user.email);
      } else {
        setUserData(null);
        setIsLogin(false);
        setMockUserData(null); 
      }
    });
  
    return () => unsubscribe();
  }, []);
  



  const logIn = async (email, password) => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserData(userCredential.user);
      setIsLogin(true);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const getUserData = async (email) => {
    const res = await instance.get("users");
    const users = res.data;
    const loggedUserDataFromApi = users.find((el) => el.email === email);
    console.log("getting user is done", loggedUserDataFromApi);
    setMockUserData(loggedUserDataFromApi);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      setIsLogin(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateApiUserChemicals = async (payload) => {
    try {
      console.log("payload", payload);
      const res = await instance.put(`users/${payload.id}`, payload);
      console.log(res);
      setMockUserData(res.data);
    } catch (error) {
      console.error("Error updating chemicals:", error.response ? error.response.data : error);
    }
    
  };
  

  const signUpMockUser = async (payload) => {
    const res = await instance.post(`users`, payload);
    console.log(res);
    setMockUserData(res.data);
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        logIn,
        isLogin,
        logOut,
        error,
        getUserData,
        updateApiUserChemicals,
        mockUserData,
        signUpMockUser,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
