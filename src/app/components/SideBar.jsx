"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaThLarge, FaChartLine, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { id: "device-controller", icon: FaThLarge },
    { id: "analytics", icon: FaChartLine },
    { id: "setting", icon: FaCog },
  ];

  return (
    <div className="fixed md:left-0 md:top-0 md:h-full md:w-16 md:transform-none md:translate-x-0 md:rounded-none bg-gray-800 left-1/2 transform -translate-x-1/2 flex md:flex-col w-11/12 h-12 bottom-0 items-center justify-center shadow-lg z-50 rounded-3xl mb-1">
      <div className="flex flex-row md:flex-col items-center justify-center w-full h-full">
        <div className="flex flex-row md:flex-col items-center justify-center md:mt-auto md:mb-6 space-x-8 md:space-x-0 md:space-y-10">
          {menuItems.map(({ id, icon: Icon }) => (
            <button key={id} onClick={() => router.push(`/${id}`)}>
              <Icon
                size={30}
                className={`${
                  pathname.includes(id) ? "text-blue-500" : "text-[#a5a5a5]"
                } cursor-pointer`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
