import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
} from "lucide-react";

import Sidebar from "./Sidebar";

const upcomingEvents = [
  {
    id: 1,
    name: "Summer Championship",
    date: "2023-07-15",
    location: "Central Stadium, New York",
    description:
      "Annual summer sports championship featuring various athletic competitions.",
    attendees: 5000,
    sponsors: ["SportGear Pro", "AthleteBoost"],
  },
  {
    id: 2,
    name: "Athlete Meet and Greet",
    date: "2023-08-02",
    location: "Sports Complex, Los Angeles",
    description:
      "Fan event where supporters can meet their favorite athletes and get autographs.",
    attendees: 2000,
    sponsors: ["FitFuel", "SpeedTech"],
  },
  {
    id: 3,
    name: "Fall Tournament",
    date: "2023-09-10",
    location: "Riverside Arena, Chicago",
    description:
      "Competitive tournament marking the beginning of the fall sports season.",
    attendees: 3500,
    sponsors: ["EnduranceElite", "SportGear Pro"],
  },
  {
    id: 4,
    name: "Charity Sports Gala",
    date: "2023-10-05",
    location: "Grand Hall, Miami",
    description:
      "Annual charity event combining sports demonstrations with fundraising activities.",
    attendees: 1000,
    sponsors: ["AthleteBoost", "FitFuel"],
  },
];

export default function UpcomingEventsPage() {
  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
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
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-300">{event.description}</p>
          <div className="flex items-center text-gray-300">
            <Users size={16} className="mr-2" />
            <span>Expected Attendees: {event.attendees.toLocaleString()}</span>
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
            More Details
            <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      )}
    </div>
  );
}
