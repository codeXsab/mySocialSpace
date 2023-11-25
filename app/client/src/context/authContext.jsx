import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const loginUser = (user) => {
    setLoggedIn(user);
  };
  const logoutUser = () => {
    setLoggedIn(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
