import React from "react";
import {
  Trophy,
  Medal,
  Calendar,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
          <div className="relative h-80 sm:h-96">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Athlete in action"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Athlete headshot"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div className="ml-4">
                <h1 className="text-4xl font-bold text-white mb-1 animate-fade-in-up">
                  John Doe
                </h1>
                <p className="text-blue-200 text-xl animate-fade-in-up animation-delay-150">
                  Professional Swimmer
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { icon: Trophy, text: "3x Olympic Gold Medalist" },
                { icon: Medal, text: "World Record Holder" },
                { icon: Calendar, text: "Born: May 15, 1995" },
                { icon: MapPin, text: "Los Angeles, CA" },
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
              John Doe is a world-renowned swimmer with multiple Olympic gold
              medals and world records. Known for his powerful freestyle, John
              has dominated the sport for over a decade.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                Career Highlights
              </h2>
              <ul className="space-y-2">
                {[
                  "2016 Olympic Games: 2 Gold Medals (100m Freestyle, 4x100m Relay)",
                  "2020 Olympic Games: 1 Gold Medal (100m Freestyle)",
                  "2019 World Championships: 3 Gold Medals",
                  "Current World Record Holder: 100m Freestyle",
                ].map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <Trophy className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-1" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                Personal Best Times
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { event: "50m Freestyle", time: "21.32s" },
                  { event: "100m Freestyle", time: "46.91s" },
                  { event: "200m Freestyle", time: "1:42.96" },
                  { event: "100m Butterfly", time: "50.58s" },
                  { event: "200m Individual Medley", time: "1:54.68" },
                  { event: "4x100m Freestyle Relay", time: "3:08.24" },
                ].map((record, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  >
                    <h3 className="font-semibold text-blue-700">
                      {record.event}
                    </h3>
                    <p className="text-2xl font-bold text-gray-800">
                      {record.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                Follow John
              </h2>
              <div className="flex flex-col items-center space-y-4">
                {[
                  {
                    icon: Instagram,
                    handle: "@johndoe_swim",
                    href: "https://instagram.com/johndoe_swim",
                  },
                  {
                    icon: Twitter,
                    handle: "@JohnDoeSwimmer",
                    href: "https://twitter.com/JohnDoeSwimmer",
                  },
                  {
                    icon: Facebook,
                    handle: "John Doe",
                    href: "https://facebook.com/johndoeswimmer",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="font-medium">{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
