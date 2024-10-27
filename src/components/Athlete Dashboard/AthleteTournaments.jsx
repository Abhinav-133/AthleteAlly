"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy } from "lucide-react";
import { collection, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function AthleteTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournamentIds, setRegisteredTournamentIds] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [athleteId, setAthleteId] = useState(null);
  const navigate = useNavigate();

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

    const fetchRegisteredTournaments = async (userId) => {
      if (!userId) return;

      const athleteDoc = await getDoc(doc(db, "athletes", userId));
      if (athleteDoc.exists()) {
        setRegisteredTournamentIds(athleteDoc.data().registeredTournaments || []);
      }
    };

    const getUserData = async () => {
      const userUid = sessionStorage.getItem("userUid");
      if (!userUid) {
        navigate("/athlete-login");
        return;
      }
      setAthleteId(userUid);
      fetchRegisteredTournaments(userUid); // Call fetchRegisteredTournaments here
    };

    getUserData();
    fetchTournaments();
  }, [navigate]);

  const today = new Date();

  // Filter tournaments based on whether they're registered and if they're upcoming or past
  const registeredTournaments = tournaments.filter((tournament) =>
    registeredTournamentIds.includes(tournament.id)
  );
  const upcomingTournaments = registeredTournaments.filter(
    (tournament) => tournament.date >= today
  );
  const pastTournaments = registeredTournaments.filter(
    (tournament) => tournament.date < today
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-4xl font-semibold mb-6 text-center">
        Your Tournaments
      </h1>

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
            title="Upcoming Registered Tournaments"
            tournaments={upcomingTournaments}
            emptyMessage="No upcoming registered tournaments found."
          />
        ) : (
          <TournamentsGrid
            title="Past Registered Tournaments"
            tournaments={pastTournaments}
            emptyMessage="No past registered tournaments found."
          />
        )}
      </div>
    </div>
  );
}

function TournamentsGrid({ title, tournaments, emptyMessage }) {
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
              <TournamentCard tournament={tournament} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function TournamentCard({ tournament }) {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    sessionStorage.setItem("tournamentID", tournament.id);
    navigate("/tournament");
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
      <div className="mt-4">
        <button
          className="w-full bg-gray-300 text-gray-800 py-2 rounded transition hover:bg-gray-400"
          onClick={handleAboutClick}
        >
          About
        </button>
      </div>
    </div>
  );
}
