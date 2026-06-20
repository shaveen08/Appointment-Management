import React, { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Notification01FreeIcons,
  Mail01Icon,
  UserAccountIcon,
  OfficeIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const routeTitleMap = {
    "/dashboard": "Dashboard",
    "/lead": "Lead",
    "/deals": "Deals",
    "/activity": "Activity",
    "/appointment": "Appointment",
    "/users": "Users",
    "/notification": "Notification",
    "/settings": "Settings",
  };

  const title = routeTitleMap[location.pathname];

  // --- Close dropdown on outside click ----------------------------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = () => setShowProfileMenu(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-60 right-0 h-15.25 bg-white flex items-center justify-between p-4 z-50">
      {/* Page Title */}
      <h4 className="text-md font-semibold">{title}</h4>

      {/* Right Section */}
      <div className="flex gap-2 items-center">
        {/* Notification */}
        <div className="relative h-10 w-10 flex items-center justify-center border border-gray-300 rounded-xl cursor-pointer">
          <HugeiconsIcon icon={Notification01FreeIcons} size={20} />
        </div>

        {/* Profile Trigger */}
        <div className="relative h-10 w-10 flex items-center justify-center border border-gray-300 rounded-xl cursor-pointer">
          <HugeiconsIcon icon={UserIcon} size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
