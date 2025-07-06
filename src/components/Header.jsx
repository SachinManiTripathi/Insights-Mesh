import React from "react";
import InsightsMeshLogo from "../assets/InsightsMesh.png";
import ThemeToggle from "./ThemeToggle";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    if (location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-3">
      <div className="flex items-center">
        <img
          src={InsightsMeshLogo}
          alt="InsightsMesh logo"
          className="h-10 w-10 inline-block mr-2"
        />
        <h1 className="text-xl font-bold">InsightsMesh</h1>
      </div>
      <div className="flex gap-5">
        <ThemeToggle />

        <button
          onClick={logout}
          className=" flex gap-2 items-center rounded bg-red-500 hover:bg-red-800 px-2 py-1 mr-2 text-white shadow shadow"
        >
          Logout
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Header;
