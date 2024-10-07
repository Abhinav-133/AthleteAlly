import React from "react";
import { CalendarDays, MapPin, Trophy, Users, ChevronDown } from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
        <div className="relative">
          <img
            src="/placeholder.svg?height=400&width=800"
            alt="Tournament banner"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in-up">
              Cyber Champions League 2024
            </h1>
            <p className="text-blue-200 text-xl animate-fade-in-up animation-delay-150">
              The Ultimate Esports Showdown
            </p>
          </div>
        </div>
        <div className="p-6 space-y-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {[
              { icon: CalendarDays, text: "August 15-20, 2024" },
              { icon: MapPin, text: "Los Angeles, CA" },
              { icon: Trophy, text: "$1,000,000 Prize Pool" },
              { icon: Users, text: "32 Teams" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-50 px-4 py-2 rounded-full transition-all hover:bg-blue-100 hover:shadow-md"
              >
                <item.icon className="w-5 h-5 mr-2 text-blue-500" />
                {item.text}
              </div>
            ))}
          </div>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            Join us for the most anticipated esports event of the year! The
            Cyber Champions League brings together the world's top teams to
            compete for glory and an unprecedented prize pool.
          </p>
          <div className="text-center">
            <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 hover:shadow-lg">
              Register Now
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Tournament Schedule
            </h2>
            <div className="space-y-4">
              {[
                "Group Stage",
                "Quarter-Finals",
                "Semi-Finals",
                "Grand Final",
              ].map((stage, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 pb-2 group hover:bg-blue-50 rounded px-2 transition duration-300"
                >
                  <span className="font-medium group-hover:text-blue-700 transition duration-300">
                    {stage}
                  </span>
                  <span className="text-gray-600 group-hover:text-blue-600 transition duration-300">
                    August {15 + index}, 2024
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Participating Teams
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 group"
                >
                  <div className="relative overflow-hidden rounded-full">
                    <img
                      src={`/placeholder.svg?height=80&width=80&text=T${
                        index + 1
                      }`}
                      alt={`Team ${index + 1}`}
                      className="w-20 h-20 transition duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  </div>
                  <span className="font-medium text-gray-800 group-hover:text-blue-600 transition duration-300">
                    Team {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-blue-700 text-white py-4 px-6 flex justify-between items-center">
          <span>Don't miss out on the action!</span>
          <button className="flex items-center space-x-2 bg-white text-blue-700 py-2 px-4 rounded hover:bg-blue-100 transition duration-300">
            <span>Learn More</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
