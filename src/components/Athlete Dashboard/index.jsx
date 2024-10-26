import React from "react";
import { Quote, Trophy, Dumbbell } from "lucide-react";

function Index() {
  const MotivationalQuote = () => {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg text-white mb-6 flex items-center">
        <Quote className="w-10 h-10 mr-4" />
        <div>
          <p className="text-2xl font-bold mb-2">
            "The only way to prove that you're a good sport is to lose."
          </p>
          <p className="text-right italic">- Ernie Banks</p>
        </div>
      </div>
    );
  };

  const CommonForAthletes = () => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800 mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-500 pb-2">Consistency is Key</h2>
        <p className="text-gray-700 text-lg mb-4">
          No matter your sport, every athlete knows that consistency in training and mindset is crucial for success.
        </p>
        <div className="mt-4 text-blue-600 font-semibold">
          <p>Keep pushing your limits!</p>
        </div>
      </div>
    );
  };

  const QuickTips = () => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800 mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Quick Tips for Athletes</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">Stay hydrated before, during, and after your training.</li>
          <li className="mb-2">Set realistic goals and track your progress.</li>
          <li className="mb-2">Incorporate rest days into your training schedule.</li>
          <li className="mb-2">Maintain a balanced diet rich in nutrients.</li>
          <li className="mb-2">Focus on mental strength as much as physical strength.</li>
        </ul>
      </div>
    );
  };

  const IconsSection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
          <Trophy className="w-16 h-16 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold">Achievements</h3>
          <p className="text-center text-gray-600">Celebrate your wins, big or small.</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
          <Dumbbell className="w-16 h-16 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold">Strength Training</h3>
          <p className="text-center text-gray-600">Incorporate strength training into your routine.</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
          <Quote className="w-16 h-16 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold">Motivation</h3>
          <p className="text-center text-gray-600">Stay inspired to reach your goals.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-5xl w-full">
        <MotivationalQuote />
        <CommonForAthletes />
        <QuickTips />
        <IconsSection />
      </main>
    </div>
  );
}

export default Index;
