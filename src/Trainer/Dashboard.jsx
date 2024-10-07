"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, User, ShoppingBag, Trophy, Users, Dumbbell, Apple, LogOut, UserCircle } from "lucide-react"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: User, label: "My Profile",link:"/trainers/profile" },
    { icon: UserCircle, label: "Athlete Profile",link:"/trainers/athletes" },
    // { icon: ShoppingBag, label: "Sports Gear",link:"/trainers/sportsgear" },
    { icon: Trophy, label: "Tournaments",link:"/trainers/tournaments" },
    // { icon: Users, label: "Job Portals",link:"/trainers/jobportal" },
    { icon: Dumbbell, label: "Latest News",link:"/trainers/latestnews" },
    { icon: Apple, label: "Community",link:"/trainers/community" },
  ]

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white p-5 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out z-20`}
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>SportsHub</h2>
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
        <button className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors w-full">
          <LogOut size={24} className="mr-4" />
          <span className={isOpen ? "block" : "hidden"}>Logout</span>
        </button>
      </div>
    </motion.div>
  )
}

const TrainerCard = ({ name, image, specialty, experience }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
    <img src={image} alt={name} className="w-32 h-32 object-cover rounded-full mb-4" />
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-blue-600 font-medium mb-2">{specialty}</p>
    <p className="text-gray-600 text-center">{experience} years of experience</p>
  </div>
)

export default function TrainersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const trainers = [
    {
      name: "John Smith",
      image: "/placeholder.svg?height=128&width=128",
      specialty: "Strength & Conditioning",
      experience: 10,
    },
    {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=128&width=128",
      specialty: "Nutrition & Diet",
      experience: 8,
    },
    {
      name: "Mike Williams",
      image: "/placeholder.svg?height=128&width=128",
      specialty: "Speed & Agility",
      experience: 12,
    },
    {
      name: "Emily Brown",
      image: "/placeholder.svg?height=128&width=128",
      specialty: "Yoga & Flexibility",
      experience: 7,
    },
    {
      name: "David Lee",
      image: "/placeholder.svg?height=128&width=128",
      specialty: "Sports Psychology",
      experience: 15,
    },
    {
      name: "Lisa Chen",
      image: "/placeholder.svg?height=128&width=128",
      specialty: "Injury Rehabilitation",
      experience: 9,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <main className="p-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Our Trainers</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <TrainerCard key={index} {...trainer} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}