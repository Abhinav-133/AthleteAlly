import React from "react";
import { DollarSignIcon, UsersIcon } from "lucide-react";
import Sidebar from "./Sidebar";

const sponsoredEvents = [
  {
    name: "World Cup 2023",
    date: "Dec 1-15, 2023",
    invested: 5000000,
    headcount: 100000,
  },
  {
    name: "Olympics 2024",
    date: "Jul 26 - Aug 11, 2024",
    invested: 10000000,
    headcount: 500000,
  },
  {
    name: "Super Bowl LVIII",
    date: "Feb 11, 2024",
    invested: 8000000,
    headcount: 80000,
  },
  {
    name: "Wimbledon 2024",
    date: "Jul 1-14, 2024",
    invested: 3000000,
    headcount: 50000,
  },
];

const sponsoredAthletes = [
  { name: "John Doe", sport: "Soccer", invested: 2000000, followers: 5000000 },
  {
    name: "Jane Smith",
    sport: "Swimming",
    invested: 1500000,
    followers: 3000000,
  },
  {
    name: "Mike Johnson",
    sport: "Basketball",
    invested: 3000000,
    followers: 7000000,
  },
  {
    name: "Emily Brown",
    sport: "Tennis",
    invested: 1800000,
    followers: 4000000,
  },
];

const sponsoredTeams = [
  {
    name: "Red Dragons",
    sport: "Soccer",
    invested: 10000000,
    fanbase: 2000000,
  },
  {
    name: "Blue Sharks",
    sport: "Basketball",
    invested: 8000000,
    fanbase: 1500000,
  },
  {
    name: "Green Eagles",
    sport: "American Football",
    invested: 12000000,
    fanbase: 3000000,
  },
  {
    name: "Purple Lions",
    sport: "Hockey",
    invested: 6000000,
    fanbase: 1000000,
  },
];

function SponsoredSection({ title, items, type }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 border border-blue-200">
      <h3 className="text-xl font-semibold mb-4 text-blue-800">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="border-b border-blue-100 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-900">{item.name}</span>
              <span className="text-sm text-blue-600">
                {item.date || item.sport}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-blue-700">
                <DollarSignIcon className="w-4 h-4 mr-1" />
                <span>{`$${(item.invested / 1000000).toFixed(1)}M`}</span>
              </div>
              <div className="flex items-center text-blue-700">
                <UsersIcon className="w-4 h-4 mr-1" />
                <span>
                  {type === "event" && `${(item.headcount / 1000).toFixed(0)}K`}
                  {type === "athlete" &&
                    `${(item.followers / 1000000).toFixed(1)}M followers`}
                  {type === "team" &&
                    `${(item.fanbase / 1000000).toFixed(1)}M fans`}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sponsor() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SponsoredSection
              title="Sponsored Events"
              items={sponsoredEvents}
              type="event"
            />
            <SponsoredSection
              title="Sponsored Athletes"
              items={sponsoredAthletes}
              type="athlete"
            />
            <SponsoredSection
              title="Sponsored Teams"
              items={sponsoredTeams}
              type="team"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
