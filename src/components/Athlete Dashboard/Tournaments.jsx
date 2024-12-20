"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Users, Trophy } from "lucide-react";
import { collection, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const sports = [
  "All",
  "Swimming",
  "Running",
  "Tennis",
  "Basketball",
  "CrossFit",
  "Judo",
  "Hockey",
];

export default function Tournaments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchTournaments = async () => {
      const querySnapshot = await getDocs(collection(db, "tournaments"));
      const tournamentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const formattedTournaments = tournamentsData.map((tournament) => ({
        ...tournament,
        date:
          tournament.date instanceof Timestamp
            ? tournament.date.toDate()
            : new Date(tournament.date),
      }));
      setTournaments(formattedTournaments);
    };
    fetchTournaments();
  }, []);

  const today = new Date();
  const filteredTournaments = tournaments.filter(
    (tournament) =>
      (selectedSport === "All" || tournament.sport === selectedSport) &&
      (selectedDate === "" || tournament.date >= new Date(selectedDate)) &&
      tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingTournaments = filteredTournaments.filter(
    (tournament) => tournament.date >= today
  );
  const pastTournaments = filteredTournaments.filter(
    (tournament) => tournament.date < today
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-semibold mb-6 text-center">Tournaments</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 bg-white p-4 rounded shadow-lg">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-200 text-gray-800 border-gray-300 pl-10 p-2 rounded w-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select
            onChange={(e) => setSelectedSport(e.target.value)}
            className="bg-gray-200 text-gray-800 border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-full md:w-48"
          >
            <option value="All">All Sports</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        {["upcoming", "past"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-lg rounded transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } mx-2`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Tournaments
          </button>
        ))}
      </div>

      {/* Tournaments Section */}
      <div>
        {activeTab === "upcoming" ? (
          <TournamentsGrid
            title="Upcoming Tournaments"
            tournaments={upcomingTournaments}
            showRegisterButton={true}
            emptyMessage="No upcoming tournaments found."
          />
        ) : (
          <TournamentsGrid
            title="Past Tournaments"
            tournaments={pastTournaments}
            showRegisterButton={false}
            emptyMessage="No past tournaments found."
          />
        )}
      </div>
    </div>
  );
}

function TournamentsGrid({
  title,
  tournaments,
  showRegisterButton,
  emptyMessage,
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      {tournaments.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">{emptyMessage}</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {tournaments.map((tournament) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TournamentCard
                tournament={tournament}
                showRegisterButton={showRegisterButton}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function TournamentCard({ tournament, showRegisterButton }) {
  const navigate = useNavigate();
  const [user, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userUid = sessionStorage.getItem("userUid");
      if (!userUid) {
        navigate("/athlete-login");
        return;
      }

      const userDoc = await getDoc(doc(db, "athletes", userUid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
        console.log("Fetched User Data:", userData); // Debugging log
      } else {
        console.log("No such user document!");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleAboutClick = () => {
    sessionStorage.setItem("tournamentID", tournament.id);
    navigate("/tournament");
  };

  const handleAboutClick1 = () => {
    sessionStorage.setItem("tournamentID", tournament.id);
    navigate("/team-register");
  };

  return (
    <div className="bg-white rounded shadow-lg hover:shadow-xl transition transform hover:scale-105 p-6">
      <h3 className="text-xl font-medium mb-2">{tournament.name}</h3>
      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
        {tournament.sport}
      </span>
      <div className="mt-4 space-y-2 text-gray-600">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          <span>{tournament.date.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-blue-500" />
          <span>{tournament.location}</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-blue-500" />
          <span>{tournament.participants} participants</span>
        </div>
        <div className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-blue-500" />
          <span>Prize Pool: {tournament.prizePool}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between gap-2">
        {showRegisterButton && user && (
          <button
            className={`w-full ${
              user.canParticipate
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white py-2 rounded`}
            onClick={handleAboutClick1}
            disabled={!user.canParticipate}
          >
            Register
          </button>
        )}
        <button
          onClick={handleAboutClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
