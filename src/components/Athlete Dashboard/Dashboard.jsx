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
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: User, label: "My Profile", link: "/athlete-dashboard/profile" },
    {
      icon: Trophy,
      label: "Tournaments",
      link: "/athlete-dashboard/tournaments",
    },
    { icon: Dumbbell, label: "Latest News", link: "/athlete-dashboard/news" },
    {
      icon: Trophy,
      label: "Your Tournaments",
      link: "/athlete-dashboard/mytournaments",
    },
    {
      icon: Dumbbell,
      label: "Trainers",
      link: "/athlete-dashboard/alltrainers",
    },
    {
      icon: Apple, 
      label: "Injury Prediction",
      link: "https://injury-predictor-analysis-mcu3wkmffarbdwwwt239gf.streamlit.app/",
    },
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
        <h1 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>
          AthleteAlly
        </h1>
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
const Navbar = ({ userName, userImage, handleLogout, notifications }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={24} />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-10">
              <ul className="py-2 text-sm text-white">
                {notifications.length > 0 ? (
                  notifications.map((tournament, index) => (
                    <li key={index} className="hover:bg-gray-700 px-4 py-2">
                      Upcoming Tournament: {tournament.name} -{" "}
                      {new Date(tournament.date.seconds * 1000).toDateString()}
                    </li>
                  ))
                ) : (
                  <li className="hover:bg-gray-700 px-4 py-2">
                    No upcoming tournaments.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <span>{userName || "User"}</span>
            <ChevronDown size={16} />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
              <ul className="py-2 text-sm text-white">
                <li className="hover:bg-gray-700 px-4 py-2">
                  <Link to="/athlete-dashboard/profile">Edit Profile</Link>
                </li>
                <li
                  className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const fetchUpcomingTournaments = async (db) => {
  const tournamentsRef = collection(db, "tournaments");
  const today = new Date();

  const q = query(tournamentsRef, where("date", ">", today));
  const querySnapshot = await getDocs(q);

  const upcomingTournaments = [];
  querySnapshot.forEach((doc) => {
    upcomingTournaments.push({ id: doc.id, ...doc.data() });
  });

  return upcomingTournaments;
};

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const db = getFirestore(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const getUserData = async () => {
      const userUid = sessionStorage.getItem("userUid");

      if (!userUid) {
        navigate("/athlete-login");
        return;
      }

      const data = await fetchUserData(userUid, db);
      setUserData(data);

      const upcomingTournaments = await fetchUpcomingTournaments(db);
      setNotifications(upcomingTournaments);
    };

    getUserData();
  }, [db, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
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
          userName={userData?.name || "User"} 
          notifications={notifications}
          handleLogout={handleLogout} 
        />
        <Outlet />
      </div>
    </div>
  );
}

const fetchUserData = async (userId, db) => {
  if (!userId) return; 
  try {
    const userDocRef = doc(db, "athletes", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
};
