import React from "react";
import { CalendarDays, MapPin, Trophy, Users } from "lucide-react";

export default function SingleTournament() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
        {/* Tournament Title */}
        <h1 className="text-5xl font-bold text-blue-800 mb-4">Cyber Champions League 2024</h1>
        <p className="text-blue-600 text-lg mb-6">The Ultimate Esports Showdown</p>

        {/* Tournament Info */}
        <div className="flex flex-wrap justify-between gap-6 text-sm text-gray-600 mb-8">
          {[
            { icon: CalendarDays, label: "Date", text: "August 15-20, 2024" },
            { icon: MapPin, label: "Location", text: "Los Angeles, CA" },
            { icon: Trophy, label: "Prize Pool", text: "$1,000,000" },
            { icon: Users, label: "Teams", text: "32 Teams" },
          ].map((item, index) => (
            <div key={index} className="flex items-center bg-blue-50 px-4 py-2 rounded-full transition-all hover:bg-blue-100 hover:shadow-md">
              <item.icon className="w-5 h-5 mr-2 text-blue-500" />
              <span>{item.label}: {item.text}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">
          Join us for an electrifying esports experience! The Cyber Champions League unites top global teams in an exciting showdown, featuring one of the largest prize pools in esports.
        </p>

        {/* Organized By Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 hover:shadow-md transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Organized By</h2>
          <p className="text-gray-700">
            The tournament is organized by the leading esports organization, Cyber Events Inc., known for hosting world-class competitions and providing a platform for gamers to showcase their skills.
          </p>
        </div>

        {/* Tournament Rules */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 hover:shadow-md transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Tournament Rules</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>All teams must consist of 5 players.</li>
            <li>No third-party software is permitted during gameplay.</li>
            <li>Each team will play a best-of-three series in the knockout rounds.</li>
            <li>Rules for conduct, including bans on abusive language, will be strictly enforced.</li>
            <li>Teams are expected to check in one hour before their scheduled match.</li>
          </ul>
        </div>

        {/* Sport Category */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 hover:shadow-md transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Sport Category</h2>
          <p className="text-gray-700">Esports - Multiplayer Online Battle Arena (MOBA)</p>
        </div>

        {/* Additional Information Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 hover:shadow-md transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Additional Information</h2>
          <p className="text-gray-700 mb-2">This tournament is open to players of all skill levels, and we encourage participation from both amateur and professional teams. Our aim is to create a competitive yet friendly atmosphere where gamers can connect and showcase their talents.</p>
          <p className="text-gray-700 mb-2">Participants will have access to exclusive workshops and seminars led by industry professionals, covering topics like game strategies, teamwork, and mental preparation.</p>
          <p className="text-gray-700">Join us for an unforgettable experience filled with thrilling matches, networking opportunities, and a chance to win amazing prizes!</p>
        </div>

        {/* Register Now Button */}
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 hover:shadow-lg">
            Register Now
          </button>
        </div>

        {/* Footer Section */}
        <div className="bg-blue-700 text-white py-4 flex justify-center items-center mt-8">
          <span>Get ready for a groundbreaking esports event!</span>
        </div>
      </div>
    </div>
  );
}
