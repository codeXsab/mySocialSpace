import { useState, createContext, useEffect } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const darkModeToggleFunc = () => {
    setDarkMode((prev) => {
      return !prev;
    });
  };
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, darkModeToggleFunc }}>
      {children}
    </DarkModeContext.Provider>
  );
};
