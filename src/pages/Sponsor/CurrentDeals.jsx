import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
  BarChart,
  AlertCircle,
} from "lucide-react";

import Sidebar from "./Sidebar";
// Mock data for current deals
const currentDeals = [
  {
    id: 1,
    eventName: "Summer Championship",
    startDate: "2023-07-01",
    endDate: "2023-07-31",
    sponsorshipTier: "Platinum",
    amount: 50000,
    benefits: [
      "Logo on all event materials",
      "VIP booth at the event",
      "Sponsored athlete meet-and-greet",
      "Social media promotion package",
    ],
    performanceMetrics: {
      impressions: 1000000,
      engagements: 50000,
      conversionRate: 2.5,
    },
  },
  {
    id: 2,
    eventName: "Fall Tournament",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    sponsorshipTier: "Gold",
    amount: 30000,
    benefits: [
      "Logo on event banners",
      "Product showcase area",
      "Sponsored halftime show",
      "Email marketing campaign",
    ],
    performanceMetrics: {
      impressions: 750000,
      engagements: 35000,
      conversionRate: 2.1,
    },
  },
  {
    id: 3,
    eventName: "Winter Games",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    sponsorshipTier: "Silver",
    amount: 20000,
    benefits: [
      "Logo on athlete uniforms",
      "Branded merchandise giveaway",
      "On-site activation space",
      "Live stream ad spots",
    ],
    performanceMetrics: {
      impressions: 500000,
      engagements: 25000,
      conversionRate: 1.8,
    },
  },
];

export default function CurrentDealsPage() {
  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Current Sponsorship Deals</h1>
        <div className="space-y-6">
          {currentDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </main>
    </div>
  );
}

function DealCard({ deal }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">{deal.eventName}</h2>
          <p className="text-blue-400 flex items-center">
            <Calendar size={16} className="mr-2" />
            {new Date(deal.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            -
            {new Date(deal.endDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getTierColor(
              deal.sponsorshipTier
            )}`}
          >
            {deal.sponsorshipTier}
          </span>
          <p className="text-green-400 font-semibold mt-2">
            <DollarSign size={16} className="inline mr-1" />
            {deal.amount.toLocaleString()}
          </p>
        </div>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:text-blue-300 transition-colors w-full text-left mt-2"
        aria-expanded={isExpanded}
      >
        {isExpanded ? "Hide Details" : "Show Details"}
        {isExpanded ? (
          <ChevronUp size={20} className="inline ml-2" />
        ) : (
          <ChevronDown size={20} className="inline ml-2" />
        )}
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Sponsorship Benefits:</h3>
            <ul className="list-disc list-inside text-gray-300">
              {deal.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Performance Metrics:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Impressions</p>
                <p className="text-xl font-bold">
                  {deal.performanceMetrics.impressions.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Engagements</p>
                <p className="text-xl font-bold">
                  {deal.performanceMetrics.engagements.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Conversion Rate</p>
                <p className="text-xl font-bold">
                  {deal.performanceMetrics.conversionRate}%
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center text-yellow-400">
            <AlertCircle size={16} className="mr-2" />
            <span>
              Performance report will be available after the event concludes.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function getTierColor(tier) {
  switch (tier) {
    case "Platinum":
      return "bg-gray-300 text-gray-800";
    case "Gold":
      return "bg-yellow-400 text-gray-800";
    case "Silver":
      return "bg-gray-400 text-gray-800";
    default:
      return "bg-blue-400 text-gray-800";
  }
}
