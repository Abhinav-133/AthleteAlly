'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Bell, ChevronDown, Menu,
  User, ShoppingBag, Trophy, Users, Dumbbell, Apple,
  X, LogOut,Quote
} from 'lucide-react'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: User, label: 'My Profile' },
    { icon: ShoppingBag, label: 'Sports Gear' },
    { icon: Trophy, label: 'Tournaments' },
    { icon: Users, label: 'Trainers' },
    { icon: Dumbbell, label: 'Training' },
    { icon: Apple, label: 'Diet' },
  ]

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white p-5 ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out z-20`}
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>athleteally</h2>
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <item.icon size={24} className="mr-4" />
                <span className={isOpen ? 'block' : 'hidden'}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  )
}

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
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
        </button>
        <div className="flex items-center">
          <img src="/placeholder.svg?height=32&width=32" alt="User" className="w-8 h-8 rounded-full mr-2" />
          <span className="mr-2">John Doe</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  )
}
const MotivationalQuote = () => {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-md text-white mb-6">
        <Quote className="w-8 h-8 mb-4" />
        <p className="text-xl font-semibold mb-2">"The only way to prove that you're a good sport is to lose."</p>
        <p className="text-right">- Ernie Banks</p>
      </div>
    )
  }

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Navbar />
        
        <main className="p-8">
        <MotivationalQuote />
            
            
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, John!</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Tournament</h2>
              <p className="text-gray-600">City Championships</p>
              <p className="text-gray-600">Date: August 15, 2023</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Training Progress</h2>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                </div>
                <span className="text-gray-600">75%</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Next Training Session</h2>
              <p className="text-gray-600">High Intensity Interval Training</p>
              <p className="text-gray-600">Time: 2:00 PM</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}