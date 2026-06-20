import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01FreeIcons,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarList = [
    {
      id: 1,
      menuName: "Dashboard",
      path: "/dashboard",
      icon: <HugeiconsIcon icon={DashboardSquare01FreeIcons} size={20} />,
    },
    {
      id: 4,
      menuName: "Appointment",
      path: "/appointment",
      icon: <HugeiconsIcon icon={Calendar03Icon} size={20} />,
    },
  ];

  return (
    <div className="fixed left-0 h-full w-60 flex flex-col gap-4 bg-teal-950 text-white">
      {/* Header */}
      <header className="p-4">
        {/* Logo */}
        <h2 className="text-lg font-bold tracking-wide">AMS System</h2>
      </header>

      {/* Sidebar Menu */}
      <main className="flex flex-col gap-2 p-2.5">
        {sidebarList.map((list) => (
          <NavLink
            key={list.id}
            to={list.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2.5 rounded-md transition ${
                isActive
                  ? "bg-teal-900 text-white font-semibold"
                  : "hover:bg-teal-900/40"
              }`
            }
          >
            {list.icon}
            <span className="text-sm font-medium">{list.menuName}</span>
          </NavLink>
        ))}
      </main>
    </div>
  );
};

export default Sidebar;
