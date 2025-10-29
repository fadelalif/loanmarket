"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface HeaderProps {
  onMenuToggle: () => void;
}

const getPageTitle = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  const mainPath = segments[0] || "";

  switch (mainPath) {
    case "":
      return "Dashboard";
    case "product":
      return "Product";
    case "editapplication":
      return "Edit Application";
    case "contact":
      return "Contact";
    case "loan":
      return "Loan";
    default:
      return "Dashboard";
  }
};

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="flex items-center justify-between p-4 md:p-6 bg-white border-b flex-shrink-0">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="text-gray-500 hover:text-gray-700 md:hidden"
          aria-label="Open sidebar"
        >
          <i className="fa-solid fa-bars fa-lg"></i>
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          {title}
        </h1>
      </div>
      <div className="flex items-center space-x-3 md:space-x-5">
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fa-solid fa-search fa-lg"></i>
        </button>
        <button className="text-gray-500 hover:text-gray-700 relative">
          <i className="fa-solid fa-bell fa-lg"></i>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="font-semibold text-gray-700 hidden md:inline">
            YOHANNES AFFANDY
          </span>
          <i className="fa-solid fa-chevron-down text-xs text-gray-500"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
