"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Menu, X, User, Trophy, Apple, LogOut, UserCircle } from "lucide-react"
import { Outlet } from "react-router-dom"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate()

  const menuItems = [
    { icon: User, label: "My Profile", link: "/trainers-dashboard/profile" },
    { icon: UserCircle, label: "Athlete Profile", link: "/trainers-dashboard/athletes" },
    { icon: Trophy, label: "Tournaments", link: "/trainers-dashboard/tournaments" },
    // { icon: Trophy, label: "Tournaments", link: "/trainers-dashboard/tournaments" },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem("userUid")
    navigate("/") 
  }
  

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white p-5 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out z-20`}
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>AthleteAlly</h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
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
                <span className={isOpen ? "block" : "hidden"}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-5 left-0 w-full px-5">
        <button
          onClick={handleLogout}
          className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
        >
          <LogOut size={24} className="mr-4" />
          <span className={isOpen ? "block" : "hidden"}>Logout</span>
        </button>
      </div>
    </motion.div>
  )
}

export default function TrainersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
