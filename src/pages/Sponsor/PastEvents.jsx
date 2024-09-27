import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Users,
  Star,
  ExternalLink,
} from "lucide-react";

import Sidebar from "./Sidebar";
// Mock data for past events
const pastEvents = [
  {
    id: 1,
    name: "Spring Championship",
    date: "2023-04-20",
    location: "Sunshine Arena, Miami",
    description:
      "Annual spring sports championship featuring various athletic competitions.",
    attendees: 4800,
    sponsors: ["SportGear Pro", "AthleteBoost"],
    rating: 4.8,
  },
  {
    id: 2,
    name: "Winter Games",
    date: "2023-02-15",
    location: "Mountain Resort, Aspen",
    description:
      "Winter sports competition showcasing skiing, snowboarding, and ice skating.",
    attendees: 3200,
    sponsors: ["FitFuel", "SpeedTech"],
    rating: 4.6,
  },
  {
    id: 3,
    name: "Youth Sports Day",
    date: "2023-05-01",
    location: "Community Park, Boston",
    description:
      "A day dedicated to promoting youth sports and physical activity.",
    attendees: 2000,
    sponsors: ["EnduranceElite", "SportGear Pro"],
    rating: 4.9,
  },
  {
    id: 4,
    name: "Marathon Madness",
    date: "2023-03-12",
    location: "City Center, Chicago",
    description:
      "Annual marathon event attracting runners from around the country.",
    attendees: 5500,
    sponsors: ["AthleteBoost", "FitFuel"],
    rating: 4.7,
  },
];

export default function PastEventsPage() {
  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Past Events</h1>
        <div className="space-y-6">
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
    </div>
  );
}

function EventCard({ event }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
          <p className="text-blue-400 flex items-center">
            <Calendar size={16} className="mr-2" />
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-300 transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      <p className="text-gray-300 mb-4 flex items-center">
        <MapPin size={16} className="mr-2" />
        {event.location}
      </p>
      <div className="flex items-center text-yellow-400 mb-4">
        <Star size={16} className="mr-2" />
        <span>{event.rating.toFixed(1)} / 5.0</span>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-300">{event.description}</p>
          <div className="flex items-center text-gray-300">
            <Users size={16} className="mr-2" />
            <span>Attendees: {event.attendees.toLocaleString()}</span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Sponsors:</h3>
            <ul className="list-disc list-inside text-gray-300">
              {event.sponsors.map((sponsor, index) => (
                <li key={index}>{sponsor}</li>
              ))}
            </ul>
          </div>
          <a
            href="#"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            Event Recap
            <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      )}
    </div>
  );
}
