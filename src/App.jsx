import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { selectMode } from "./redux/slices/themeSlice";
import Header from "./components/Header";
import SessionTags from "./components/SessionTags";
import useSessionIdleLogout from "./hooks/useSessionIdleLogout";

function App() {
  useSessionIdleLogout();
  const mode = useSelector(selectMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);
  return (
    <>
      <div
        className="min-h-screen bg-gray-100 text-black
                  dark:bg-gray-900 dark:text-white transition-colors duration-200"
      >
        <div
          className="sticky top-0 z-50            
                      bg-gray-50  dark:bg-gray-900  
                      text-gray-900 dark:text-gray-100
                      border-b   border-gray-200    dark:border-gray-700
                      backdrop-blur "
        >
          <Header />
        </div>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
