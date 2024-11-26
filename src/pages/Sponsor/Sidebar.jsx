import React from "react";
import {
  CalendarIcon,
  UserIcon,
  UsersIcon,
  MessageCircle,
  TableOfContents,
  LogOutIcon, // Added icon for logout
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  {
    name: "Overview",
    icon: <TableOfContents className="w-5 h-5" />,
    onclick: (navigate) => navigate("/sponsor"),
  },
  {
    name: "Upcoming Events",
    icon: <CalendarIcon className="w-5 h-5" />,
    onclick: (navigate) => navigate("/sponsor/upcoming-events"),
  },
  {
    name: "Athletes",
    icon: <UserIcon className="w-5 h-5" />,
    onclick: (navigate) => navigate("/sponsor/athletes"),
  },
  {
    name: "Teams",
    icon: <UsersIcon className="w-5 h-5" />,
    onclick: (navigate) => navigate("/sponsor/teams"),
  },
  {
    name: "Engagement",
    icon: <MessageCircle className="w-5 h-5" />,
    onclick: (navigate) => navigate("/sponsor/engagement"),
  },
  {
    name: "Log Out",
    onclick: (navigate) => {
      navigate("/");
      sessionStorage.removeItem("sponsorName");
      sessionStorage.removeItem("sponsorUid");
    },
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Remove sponsorUid from session storage
    sessionStorage.removeItem("sponsorUid");

    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Sports Sponsors</h1>
      </div>
      <nav className="mt-8 flex-grow">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-3 hover:bg-gray-800 rounded cursor-pointer"
            onClick={() => item.onclick(navigate)}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </div>
        ))}
      </nav>
      {/* Logout Button */}
      <div
        onClick={handleLogout}
        className="flex items-center p-3 hover:bg-red-600 rounded-b-lg cursor-pointer mt-4"
      >
        <LogOutIcon className="w-5 h-5 text-red-500" />
        <span className="ml-3 text-red-500 font-semibold">Logout</span>
      </div>
    </div>
  );
}
