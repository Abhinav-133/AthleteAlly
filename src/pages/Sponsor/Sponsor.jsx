import {
  BarChart,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import Sidebar from "./Sidebar";

// Mock data for the logged-in sponsor
const sponsorData = {
  name: "SportGear Pro",
  tier: "Platinum",
  logo: "/placeholder.svg?height=100&width=200",
  stats: {
    impressions: 1250000,
    clicks: 75000,
    conversions: 3000,
    roi: 250,
  },
  upcomingEvents: [
    { name: "Summer Championship", date: "2023-07-15" },
    { name: "Athlete Meet and Greet", date: "2023-08-02" },
    { name: "Fall Tournament", date: "2023-09-10" },
  ],
};

export default function SponsorDashboard() {
  return (
    <>
      <div className="flex bg-gray-900 text-white min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {sponsorData.name}
              </h1>
              <p className="text-blue-400">{sponsorData.tier} Sponsor</p>
            </div>
            <img
              src={sponsorData.logo}
              alt={`${sponsorData.name} logo`}
              className="w-32 h-16 object-contain"
            />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Impressions"
              value={sponsorData.stats.impressions.toLocaleString()}
              icon={<Users />}
              trend="up"
            />
            <StatCard
              title="Clicks"
              value={sponsorData.stats.clicks.toLocaleString()}
              icon={<BarChart />}
              trend="up"
            />
            <StatCard
              title="Conversions"
              value={sponsorData.stats.conversions.toLocaleString()}
              icon={<ArrowUpRight />}
              trend="down"
            />
            <StatCard
              title="ROI"
              value={`${sponsorData.stats.roi}%`}
              icon={<DollarSign />}
              trend="up"
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Upcoming Sponsored Events
            </h2>
            <ul className="space-y-4">
              {sponsorData.upcomingEvents.map((event, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b border-gray-700 pb-2"
                >
                  <span>{event.name}</span>
                  <span className="text-blue-400">{event.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold mb-2">{value}</p>
      <div
        className={`flex items-center ${
          trend === "up" ? "text-green-400" : "text-red-400"
        }`}
      >
        {trend === "up" ? (
          <ArrowUpRight size={20} />
        ) : (
          <ArrowDownRight size={20} />
        )}
        <span className="ml-1">2.5%</span>
      </div>
    </div>
  );
}
