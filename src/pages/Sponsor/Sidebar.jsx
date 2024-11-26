import React from "react";
import {
  CalendarIcon,
  UserIcon,
  UsersIcon,
  MessageCircle,
  TableOfContents,
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

  return (
    <div className="w-64 bg-gray-900 text-white h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Sports Sponsors</h1>
      </div>
      <nav className="mt-8">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-gray-800 rounded cursor-pointer"
            onClick={() => item.onclick(navigate)}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
