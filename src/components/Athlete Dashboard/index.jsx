import React from "react";
import {
    Search,
    Bell,
    ChevronDown,
    Menu,
    User,
    ShoppingBag,
    Trophy,
    Users,
    Dumbbell,
    Apple,
    X,
    LogOut,
    Quote,
  } from "lucide-react";

function Index() {
  const MotivationalQuote = () => {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-md text-white mb-6">
        <Quote className="w-8 h-8 mb-4" />
        <p className="text-xl font-semibold mb-2">
          "The only way to prove that you're a good sport is to lose."
        </p>
        <p className="text-right">- Ernie Banks</p>
      </div>
    );
  };

  return (
    <div>
      <main className="p-8">
        <MotivationalQuote />

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome, John!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Upcoming Tournament
            </h2>
            <p className="text-gray-600">City Championships</p>
            <p className="text-gray-600">Date: August 15, 2023</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Training Progress
            </h2>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <span className="text-gray-600">75%</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Next Training Session
            </h2>
            <p className="text-gray-600">High Intensity Interval Training</p>
            <p className="text-gray-600">Time: 2:00 PM</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Index;
