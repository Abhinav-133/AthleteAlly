"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  User,
  Trophy,
  Dumbbell,
  Apple,
  X,
  LogOut,
} from "lucide-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: User, label: "My Profile", link: "/athlete-dashboard/profile" },
    {
      icon: Trophy,
      label: "Tournaments",
      link: "/athlete-dashboard/tournaments",
    },
    { icon: Dumbbell, label: "Latest News", link: "/athlete-dashboard/news" },
    { icon: Apple, label: "Community", link: "/athlete-dashboard/community" },
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
          aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label={item.label}
              >
                <item.icon size={24} className="mr-4" />
                <span className={isOpen ? "block" : "hidden"}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

// Navbar Component
const Navbar = ({ userName, userImage, handleLogout }) => {
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
        <button
          className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center">
          <span className="mr-2">{userName || "User"}</span>
          <ChevronDown size={16} />
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Logout"
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

// Fetch User Data Function
const fetchUserData = async (userId, db) => {
  if (!userId) return; // Ensure userId exists
  try {
    const userDocRef = doc(db, "athletes", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User data:", userData);
      return userData;
    } else {
      console.log("No such user document found!");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// Main Dashboard Component
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const db = getFirestore(); // Initialize Firestore
  const navigate = useNavigate(); // To redirect the user

  useEffect(() => {
    const getUserData = async () => {
      // Retrieve userUid from sessionStorage
      const userUid = sessionStorage.getItem("userUid");

      if (!userUid) {
        // Redirect to login page if no userUid is found
        navigate("/athlete-login");
        return;
      }

      const data = await fetchUserData(userUid, db);
      setUserData(data);
    };

    getUserData();
  }, [db, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    // Redirect to login page
    navigate("/athlete-login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Navbar
          userName={userData?.name || "User"} // Display the actual name coming from userData
          userImage={userData?.imageUrl} // Update this if the user data contains an image URL
          handleLogout={handleLogout} // Pass the logout handler to Navbar
        />
        <Outlet />
      </div>
    </div>
  );
}
