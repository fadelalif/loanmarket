"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

type NavItem = {
  name: string;
  icon: string;
  href: string;
  children?: Omit<NavItem, "icon" | "children">[];
};

const navItems: NavItem[] = [
  { name: "Dashboard", icon: "fa-solid fa-house", href: "/" },
  { name: "Contact", icon: "fa-solid fa-address-book", href: "#" },
  { name: "Loan", icon: "fa-solid fa-file-invoice-dollar", href: "#" },
  {
    name: "Product",
    icon: "fa-solid fa-box",
    href: "#",
    children: [
      { name: "Bank Product", href: "/product/bankproduct" },
      { name: "Product", href: "#" },
      { name: "Category Product", href: "#" },
    ],
  },
  { name: "Bank", icon: "fa-solid fa-building-columns", href: "#" },
  { name: "Credit Scoring", icon: "fa-solid fa-star", href: "#" },
  { name: "FAQ's", icon: "fa-solid fa-circle-question", href: "#" },
  { name: "Pipeline", icon: "fa-solid fa-filter", href: "#" },
  { name: "Pipeline Developer", icon: "fa-solid fa-code-branch", href: "#" },
  { name: "Marketing Tools", icon: "fa-solid fa-wrench", href: "#" },
  { name: "Whatsapp", icon: "fa-brands fa-whatsapp", href: "#", children: [] },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const activeParent = navItems.find((item) =>
      item.children?.some((child) => child.href === pathname)
    );
    if (activeParent) {
      setOpenMenu(activeParent.name);
    } else {
      const directActiveParent = navItems.find(
        (item) => item.href === pathname && !item.children
      );
      if (!directActiveParent && openMenu !== null) {
        setOpenMenu(null);
      }
    }

    if (isOpen) setIsOpen(false);
  }, [pathname]);

  const handleMenuToggle = (itemName: string) => {
    setOpenMenu(openMenu === itemName ? null : itemName);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <aside
      className={`
        bg-white shadow-md flex-shrink-0 z-30 h-screen transition-transform duration-300 ease-in-out
        fixed inset-y-0 left-0 w-64 transform md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      aria-label="Sidebar"
    >
      <div className="flex items-center justify-between h-20 px-4 border-b mb-8">
        {" "}
        <div className="flex items-center justify-center flex-grow">
          {" "}
          <Image
            src="/assets/Loan.png"
            alt="Loan Market Logo"
            width={150}
            height={40}
            priority
          />
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 md:hidden"
          aria-label="Close sidebar"
        >
          <i className="fa-solid fa-times fa-lg"></i>
        </button>
      </div>

      <nav
        className="py-6 px-4 overflow-y-auto"
        style={{ height: "calc(100vh - 80px - 2rem)" }}
      >
        <ul>
          {navItems.map((item) => {
            const isParentActive = pathname === item.href && !item.children;
            const isChildActive =
              item.children?.some((child) => pathname === child.href) ?? false;
            const isDropdownOpen = openMenu === item.name || isChildActive;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <li key={item.name}>
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => handleMenuToggle(item.name)}
                    className={`
                      flex items-center justify-between space-x-3 p-3 my-1 rounded-lg transition-colors w-full text-left
                      hover:bg-[#17A9E2] hover:text-white
                      ${
                        isChildActive
                          ? "bg-blue-50 text-[#17A9E2] font-semibold"
                          : "text-black"
                      } {/* Highlight ringan jika anak aktif */}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <i
                        className={`${item.icon} w-5 text-center ${
                          isChildActive ? "text-[#17A9E2]" : ""
                        }`}
                      ></i>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <i
                      className={`fa-solid ${
                        isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
                      } text-xs transition-transform ${
                        isChildActive ? "text-[#17A9E2]" : "text-gray-500"
                      }`}
                    ></i>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center justify-between space-x-3 p-3 my-1 rounded-lg transition-colors
                      ${
                        isParentActive
                          ? "bg-[#17A9E2] text-white hover:bg-[#17A9E2] hover:text-white"
                          : "text-black hover:bg-[#17A9E2] hover:text-white"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`${item.icon} w-5 text-center`}></i>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                )}

                {isDropdownOpen && hasChildren && (
                  <ul className="pl-8 mt-1 space-y-1">
                    {item.children?.map((child) => {
                      const isCurrentChildActive = pathname === child.href;
                      return (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            onClick={handleLinkClick}
                            className={`
                              flex items-center p-2 rounded-lg text-sm transition-colors
                              ${
                                isCurrentChildActive
                                  ? "bg-[#17A9E2] text-white font-semibold"
                                  : "text-black hover:bg-gray-100"
                              }
                            `}
                          >
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;