import React from "react";
import {
  CalendarIcon,
  MapPinIcon,
  DollarSignIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react";

import Sidebar from "./Sidebar";

const upcomingEvents = [
  {
    name: "World Cup 2023",
    date: "Dec 1-15, 2023",
    location: "Qatar",
    invested: 5000000,
    expectedAttendance: 100000,
    duration: "15 days",
    image:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Olympics 2024",
    date: "Jul 26 - Aug 11, 2024",
    location: "Paris, France",
    invested: 10000000,
    expectedAttendance: 500000,
    duration: "17 days",
    image:
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Super Bowl LVIII",
    date: "Feb 11, 2024",
    location: "Las Vegas, Nevada",
    invested: 8000000,
    expectedAttendance: 80000,
    duration: "1 day",
    image:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Wimbledon 2024",
    date: "Jul 1-14, 2024",
    location: "London, UK",
    invested: 3000000,
    expectedAttendance: 50000,
    duration: "14 days",
    image:
      "https://images.unsplash.com/photo-1529926706528-db9e5010cd3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "UEFA Euro 2024",
    date: "Jun 14 - Jul 14, 2024",
    location: "Germany",
    invested: 6000000,
    expectedAttendance: 300000,
    duration: "31 days",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "World Cup 2023",
    date: "Dec 1-15, 2023",
    location: "Qatar",
    invested: 5000000,
    expectedAttendance: 100000,
    duration: "15 days",
    image:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Olympics 2024",
    date: "Jul 26 - Aug 11, 2024",
    location: "Paris, France",
    invested: 10000000,
    expectedAttendance: 500000,
    duration: "17 days",
    image:
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=800&q=80",
  },
];

function EventCard({ event }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-blue-200 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-600 to-blue-600/70 text-white px-4 py-2">
          <h3 className="text-xl font-semibold">{event.name}</h3>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center text-blue-800">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-blue-800">
          <MapPinIcon className="w-5 h-5 mr-2" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-blue-800">
          <ClockIcon className="w-5 h-5 mr-2" />
          <span>{event.duration}</span>
        </div>
        <div className="flex items-center text-blue-800">
          <DollarSignIcon className="w-5 h-5 mr-2" />
          <span>{`$${(event.invested / 1000000).toFixed(1)}M invested`}</span>
        </div>
        <div className="flex items-center text-blue-800">
          <UsersIcon className="w-5 h-5 mr-2" />
          <span>{`${(event.expectedAttendance / 1000).toFixed(
            0
          )}K expected attendance`}</span>
        </div>
      </div>
    </div>
  );
}

export default function UpcomingEvents() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="flex">
        {/* Sidebar Section */}
        <div className="fixed w-64 h-screen">
          <Sidebar />
        </div>

        {/* Main Content Section */}
        <div className="flex-1 ml-64 p-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2 text-center">
            Upcoming Sponsored Events
          </h1>
          <p className="text-xl text-blue-600 mb-8 text-center">
            Join us at these exciting sports events!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
