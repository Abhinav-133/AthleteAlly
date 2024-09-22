"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  User,
  ShoppingBag,
  Trophy,
  Users,
  Dumbbell,
  Apple,
  X,
  LogOut,
  Quote,
} from "lucide-react";
import { Outlet } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: User, label: "My Profile",link:"/athlete-dashboard/profile" },
    { icon: ShoppingBag, label: "Sports Gear" ,link:"/athlete-dashboard/sportsgear" },
    { icon: Trophy, label: "Tournaments",link:"/athlete-dashboard/tournaments" },
    { icon: Users, label: "Job Portals",link:"/athlete-dashboard/jobs" },
    { icon: Dumbbell, label: "Latest News",link:"/athlete-dashboard/news" },
    { icon: Apple, label: "Community" },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white p-5 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out z-20`}
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>
          athleteally
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <item.icon size={24} className="mr-4" />
                <span className={isOpen ? "block" : "hidden"}>
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Search className="mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="mr-2">John Doe</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
