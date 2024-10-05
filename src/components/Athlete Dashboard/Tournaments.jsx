"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Users, Trophy } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Timestamp } from "firebase/firestore";

const sports = [
  "All",
  "Swimming",
  "Running",
  "Tennis",
  "Basketball",
  "CrossFit",
  "Judo",
];

export default function Tournaments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming"); // Add state for tab management

  // Fetch tournaments from Firestore
  useEffect(() => {
    const fetchTournaments = async () => {
      const querySnapshot = await getDocs(collection(db, "tournaments"));
      const tournamentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Convert Firestore Timestamp to Date if necessary
      const formattedTournaments = tournamentsData.map((tournament) => {
        const formattedDate =
          tournament.date instanceof Timestamp
            ? tournament.date.toDate()
            : new Date(tournament.date); // For string dates
        return { ...tournament, date: formattedDate };
      });

      setTournaments(formattedTournaments);
    };
    fetchTournaments();
  }, []);

  // Current date for filtering
  const today = new Date();

  // Filter tournaments based on search and sport selection
  const filteredTournaments = tournaments.filter(
    (tournament) =>
      (selectedSport === "All" || tournament.sport === selectedSport) &&
      (selectedDate === "" || tournament.date >= new Date(selectedDate)) &&
      tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Segregate tournaments into upcoming and past based on current date
  const upcomingTournaments = filteredTournaments.filter(
    (tournament) => tournament.date >= today
  );
  const pastTournaments = filteredTournaments.filter(
    (tournament) => tournament.date < today
  );

  return (
    <div className="min-h-screen bg-gray-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Tournaments</h1>

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

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Sport Selector */}
          <div className="flex flex-col w-full md:w-auto">
            <div className="relative">
              <select
                id="sport-select"
                onChange={(e) => setSelectedSport(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 p-4 text-med rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-full md:w-64 appearance-none cursor-pointer hover:bg-gray-700"
              >
                <option value="All">All Sports</option>
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
              {/* Dropdown Arrow */}
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-xl">
                ▼
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Upcoming and Past Tournaments */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "upcoming" ? "bg-blue-600" : "bg-gray-800"
          } text-white rounded`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Tournaments
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

      {/* Upcoming Tournaments Section */}
      {activeTab === "upcoming" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Tournaments</h2>
          {upcomingTournaments.length === 0 ? (
            <p className="text-center text-gray-400 mt-8">
              No upcoming tournaments found.
            </p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {upcomingTournaments.map((tournament) => (
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
                    <div className="p-4">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                        Register
                      </button>
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
    </div>
  );
}
