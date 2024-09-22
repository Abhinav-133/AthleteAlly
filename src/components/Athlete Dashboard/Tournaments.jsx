'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, MapPin, Users, Trophy } from 'lucide-react'

const tournaments = [
  { id: 1, name: "National Swimming Championship", sport: "Swimming", date: "2023-09-15", location: "Los Angeles, CA", participants: 200, prizePool: "$50,000" },
  { id: 2, name: "Marathon City Run", sport: "Running", date: "2023-10-01", location: "New York, NY", participants: 5000, prizePool: "$100,000" },
  { id: 3, name: "Grand Slam Tennis Open", sport: "Tennis", date: "2023-08-20", location: "Miami, FL", participants: 128, prizePool: "$2,000,000" },
  { id: 4, name: "3x3 Basketball Tournament", sport: "Basketball", date: "2023-09-05", location: "Chicago, IL", participants: 64, prizePool: "$25,000" },
  { id: 5, name: "CrossFit Games", sport: "CrossFit", date: "2023-07-25", location: "Madison, WI", participants: 400, prizePool: "$300,000" },
  { id: 6, name: "World Judo Championship", sport: "Judo", date: "2023-11-10", location: "Tokyo, Japan", participants: 700, prizePool: "$200,000" },
]

const sports = ["All", "Swimming", "Running", "Tennis", "Basketball", "CrossFit", "Judo"]

export default function Tournaments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSport, setSelectedSport] = useState("All")
  const [selectedDate, setSelectedDate] = useState("")

  const filteredTournaments = tournaments.filter(tournament => 
    (selectedSport === "All" || tournament.sport === selectedSport) &&
    (selectedDate === "" || tournament.date >= selectedDate) &&
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Tournaments</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white border-gray-700 pl-10 p-2 rounded"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex gap-4">
          <select onChange={(e) => setSelectedSport(e.target.value)} className="bg-gray-800 text-white border-gray-700 p-2 rounded">
            <option value="All">Select Sport</option>
            {sports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-gray-800 text-white border-gray-700 p-2 rounded"
          />
        </div>
      </div>

      {filteredTournaments.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">No tournaments found matching your criteria.</p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredTournaments.map((tournament) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-800 rounded overflow-hidden shadow-lg">
                <div className="p-4">
                  <h2 className="text-xl mb-2">{tournament.name}</h2>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded">{tournament.sport}</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{new Date(tournament.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{tournament.participants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-gray-400" />
                    <span>Prize Pool: {tournament.prizePool}</span>
                  </div>
                </div>
                <div className="p-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Register</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
