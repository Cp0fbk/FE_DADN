"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Header = ({name}) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl md:text-2xl font-bold">{name}</h1>
      <button
        className="bg-red-500 px-3 md:px-4 py-1 md:py-2 rounded-lg hover:bg-red-600 text-sm md:text-base"
        onClick={() => handleLogout()}
      >
        Log Out
      </button>
    </div>
  );
};
export default Header;
