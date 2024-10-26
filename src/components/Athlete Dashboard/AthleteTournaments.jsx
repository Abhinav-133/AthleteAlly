"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Users, Trophy } from "lucide-react";

const hardCodedTournaments = [
  {
    id: "1",
    name: "City Swimming Championship",
    sport: "Swimming",
    date: new Date("2024-11-05"),
    location: "City Pool",
    participants: 50,
    prizePool: "$1000",
    winners: ["Alice Smith", "Bob Johnson", "Charlie Brown"], // Top 3 winners
  },
  {
    id: "2",
    name: "Annual Marathon 2024",
    sport: "Running",
    date: new Date("2024-10-25"),
    winners: ["David Wilson", "Emma Davis", "Fiona Garcia"], // Top 3 winners
  },
  {
    id: "3",
    name: "National Tennis Open",
    sport: "Tennis",
    date: new Date("2024-09-15"),
    winners: ["George Martinez", "Hannah Lee", "Isabella Hernandez"], // Top 3 winners
  },
  {
    id: "4",
    name: "Basketball League Finals",
    sport: "Basketball",
    date: new Date("2024-08-20"),
    winners: ["Jack Wilson", "Kate Thomas", "Leo Clark"], // Top 3 winners
  },
  {
    id: "5",
    name: "CrossFit Games 2024",
    sport: "CrossFit",
    date: new Date("2024-07-10"),
    winners: ["Mia Taylor", "Noah White", "Olivia Harris"], // Top 3 winners
  },
];

export default function AthleteTournaments({ athleteId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [tournaments, setTournaments] = useState(hardCodedTournaments);
  const [activeTab, setActiveTab] = useState("registered");

  // Current date for filtering
  const today = new Date();

  // Filter tournaments based on search and sport selection
  const filteredTournaments = tournaments.filter(
    (tournament) =>
      (selectedSport === "All" || tournament.sport === selectedSport) &&
      tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Segregate tournaments into registered and past based on current date
  const registeredTournaments = filteredTournaments.filter(
    (tournament) => tournament.date >= today
  );
  const pastTournaments = filteredTournaments.filter(
    (tournament) => tournament.date < today
  );

  return (
    <div className="min-h-screen bg-gray-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Your Tournaments</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white border-gray-700 pl-10 p-2 rounded"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Tabs for Registered and Past Tournaments */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "registered" ? "bg-blue-600" : "bg-gray-800"
          } text-white rounded`}
          onClick={() => setActiveTab("registered")}
        >
          Registered Tournaments
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "past" ? "bg-blue-600" : "bg-gray-800"
          } text-white rounded`}
          onClick={() => setActiveTab("past")}
        >
          Past Tournaments
        </button>
      </div>

      {/* Registered Tournaments Section */}
      {activeTab === "registered" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Registered Tournaments
          </h2>
          {registeredTournaments.length === 0 ? (
            <p className="text-center text-gray-400 mt-8">
              No registered tournaments found.
            </p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {registeredTournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-800 rounded overflow-hidden shadow-lg">
                    <div className="p-4">
                      <h2 className="text-xl mb-2">{tournament.name}</h2>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded">
                        {tournament.sport}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        <span>{tournament.date.toLocaleDateString()}</span>
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
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Past Tournaments Section */}
      {activeTab === "past" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Past Tournaments</h2>
          {pastTournaments.length === 0 ? (
            <p className="text-center text-gray-400 mt-8">
              No past tournaments found.
            </p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {pastTournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-800 rounded overflow-hidden shadow-lg">
                    <div className="p-4">
                      <h2 className="text-xl mb-2">{tournament.name}</h2>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded">
                        {tournament.sport}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        <span>{tournament.date.toLocaleDateString()}</span>
                      </div>
                      <div className="mt-2">
                        <h3 className="font-semibold">Top 3 Winners:</h3>
                        <ul className="list-disc list-inside">
                          {tournament.winners.map((winner, index) => (
                            <li key={index}>{winner}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
