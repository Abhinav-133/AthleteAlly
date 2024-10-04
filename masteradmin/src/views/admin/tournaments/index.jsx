import React, { useState } from "react";
import { ChevronRight, MapPin, Calendar, Users, Plus } from "lucide-react";
import AddTournament from "./AddTournament";

const initialTournaments = [
  {
    id: 1,
    name: "Summer Soccer Championship",
    date: "2024-07-15",
    venue: "Central Stadium",
    sports: "Soccer",
    organiser: "City Sports Association",
  },
  {
    id: 2,
    name: "Annual Tennis Open",
    date: "2024-08-20",
    venue: "Grand Tennis Club",
    sports: "Tennis",
    organiser: "National Tennis Federation",
  },
  {
    id: 3,
    name: "Winter Basketball League",
    date: "2023-12-10",
    venue: "Indoor Sports Complex",
    sports: "Basketball",
    organiser: "Regional Basketball Association",
  },
  {
    id: 4,
    name: "Spring Athletics Meet",
    date: "2023-04-05",
    venue: "University Track",
    sports: "Athletics",
    organiser: "University Sports Department",
  },
  {
    id: 5,
    name: "Autumn Volleyball Tournament",
    date: "2024-09-30",
    venue: "Beach Arena",
    sports: "Volleyball",
    organiser: "National Volleyball League",
  },
  {
    id: 6,
    name: "City Marathon",
    date: "2024-10-15",
    venue: "Downtown City",
    sports: "Running",
    organiser: "City Athletics Club",
  },
];

export default function Tournaments() {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const currentDate = new Date();

  const filteredTournaments = tournaments.filter((tournament) => {
    const tournamentDate = new Date(tournament.date);
    return showUpcoming
      ? tournamentDate > currentDate
      : tournamentDate <= currentDate;
  });

  const addNewTournament = () => {
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="bg-rgb(255 255 255 / 0.1) min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-blue-600">
          Tournaments
        </h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                className={`rounded-full px-6 py-2 text-lg font-semibold transition-all duration-300 ${
                  showUpcoming
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setShowUpcoming(true)}
              >
                Upcoming
              </button>
              <button
                className={`rounded-full px-6 py-2 text-lg font-semibold transition-all duration-300 ${
                  !showUpcoming
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setShowUpcoming(false)}
              >
                Past
              </button>
            </div>
            <button
              onClick={addNewTournament}
              className="flex items-center space-x-2 rounded-full bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
            >
              <Plus size={20} />
              <span>Add Tournament</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-blue-500 p-4">
                <h2 className="mb-2 text-xl font-semibold text-white">
                  {tournament.name}
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center text-gray-600">
                  <Calendar className="mr-3 h-5 w-5 text-blue-500" />
                  <span>{new Date(tournament.date).toLocaleDateString()}</span>
                </div>
                <div className="mb-3 flex items-center text-gray-600">
                  <MapPin className="mr-3 h-5 w-5 text-blue-500" />
                  <span>{tournament.venue}</span>
                </div>
                <div className="mb-3 flex items-center text-gray-600">
                  <ChevronRight className="mr-3 h-5 w-5 text-blue-500" />
                  <span>{tournament.sports}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-3 h-5 w-5 text-blue-500" />
                  <span>{tournament.organiser}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for AddTournament */}
        {isModalOpen && (
          <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
            <AddTournament closeModal={closeModal} />
          </div>
        )}
      </div>
    </div>
  );
}
