import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Dumbbell,
  Medal,
  ShoppingBag,
  Newspaper,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const FeaturedAthleteSlider = ({ athletes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (athletes.length - itemsPerSlide + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + athletes.length - itemsPerSlide + 1) %
        (athletes.length - itemsPerSlide + 1)
    );
  };

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        {athletes
          .slice(currentIndex, currentIndex + itemsPerSlide)
          .map((athlete, index) => (
            <motion.div
              key={index}
              className="w-1/3 flex-shrink-0 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center bg-gray-800 rounded-lg p-4 shadow-lg">
                <img
                  src={athlete.image}
                  alt={athlete.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-gray-600"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-200">
                  {athlete.name}
                </h3>
                <p className="text-gray-400">{athlete.sport}</p>
              </div>
            </motion.div>
          ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-gray-200 p-2 rounded-full shadow-lg"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-gray-200 p-2 rounded-full shadow-lg"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

const NewsMarquee = ({ news }) => {
  return (
    <div className="overflow-hidden bg-gray-900 py-2">
      <div className="flex whitespace-nowrap animate-marquee">
        {news.concat(news).map((item, index) => (
          <span key={index} className="mx-4 text-gray-300">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};


const AthletesMarquee = ({ featuredAthletes }) => {
  return (
    <div className="overflow-hidden bg-gray-900 py-2">
      <div className="flex whitespace-nowrap animate-marquee">
        {news.concat(featuredAthletes).map((athlete, index) => (
              <div className="text-center bg-gray-800 rounded-lg p-4 shadow-lg">
                <img
                  src={athlete.image}
                  alt={athlete.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-gray-600"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-200">
                  {athlete.name}
                </h3>
                <p className="text-gray-400">{athlete.sport}</p>
              </div>
        ))}
      </div>
    </div>
  );
};

export default function LandingPage() {
  const featuredAthletes = [
    {
      name: "John Doe",
      sport: "Swimming",
      image: "https://imgs.search.brave.com/xQ1k9MGTGpB7FIuPI-JXzM73DTUPIyYXEPlJJKT6zD8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmlyYXQta29o/bGktcGljdHVyZXMt/eWM4ZGZwY2pzc3Az/czRzZS5qcGc",
    },
    {
      name: "Jane Smith",
      sport: "Track and Field",
      image: "https://imgs.search.brave.com/xQ1k9MGTGpB7FIuPI-JXzM73DTUPIyYXEPlJJKT6zD8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmlyYXQta29o/bGktcGljdHVyZXMt/eWM4ZGZwY2pzc3Az/czRzZS5qcGc",
    },
    {
      name: "Mike Johnson",
      sport: "Basketball",
      image: "https://imgs.search.brave.com/xQ1k9MGTGpB7FIuPI-JXzM73DTUPIyYXEPlJJKT6zD8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmlyYXQta29o/bGktcGljdHVyZXMt/eWM4ZGZwY2pzc3Az/czRzZS5qcGc",
    },
    {
      name: "Sarah Williams",
      sport: "Tennis",
      image: "https://imgs.search.brave.com/xQ1k9MGTGpB7FIuPI-JXzM73DTUPIyYXEPlJJKT6zD8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmlyYXQta29o/bGktcGljdHVyZXMt/eWM4ZGZwY2pzc3Az/czRzZS5qcGc",
    },
    {
      name: "Alex Brown",
      sport: "Soccer",
      image: "https://imgs.search.brave.com/xQ1k9MGTGpB7FIuPI-JXzM73DTUPIyYXEPlJJKT6zD8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmlyYXQta29o/bGktcGljdHVyZXMt/eWM4ZGZwY2pzc3Az/czRzZS5qcGc",
    },
    {
      name: "Emily Davis",
      sport: "Gymnastics",
      image: "https://imgs.search.brave.com/xQ1k9MGTGpB7FIuPI-JXzM73DTUPIyYXEPlJJKT6zD8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmlyYXQta29o/bGktcGljdHVyZXMt/eWM4ZGZwY2pzc3Az/czRzZS5qcGc",
    },
  ];

  const latestNews = [
    "Breaking: New world record set in 100m sprint!",
    "Upcoming tournament announced for next month",
    "Athlete of the Year awards ceremony scheduled",
    "New sports facility opens in downtown",
    "Local team wins national championship",
    "Sports science breakthrough promises improved performance",
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Header */}
      <motion.header
        className="bg-gray-900 py-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-100">AthleteAlly</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-gray-100 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="text-gray-300 hover:text-gray-100 transition-colors"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#athletes"
                  className="text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Athletes
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#gear"
                  className="text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Gear
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Events
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* News Marquee */}
      <NewsMarquee news={latestNews} />

      {/* Hero Section */}
      <motion.section
        className="py-20 bg-gradient-to-b from-gray-900 to-black text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-bold mb-4 text-gray-100">
          Empowering Athletes Worldwide
        </h2>
        <p className="text-xl mb-8 text-gray-300">
          Your ultimate destination for sports news, gear, and community
        </p>
        <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded transition-colors">
          Join Now
        </button>
      </motion.section>

      {/* About Us */}
      <motion.section id="about" className="py-16 bg-gray-900" {...fadeIn}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
            About Us
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-100">
              <p className="text-lg mb-4 text-gray-300">
                athleteally is dedicated to supporting athletes at all levels.
                We provide a platform for sports enthusiasts to connect, stay
                informed, and access top-quality gear.
                Our mission is to foster a global community of athletes,
                empowering them to achieve their goals and push their limits.
                athleteally is dedicated to supporting athletes at all levels.
                We provide a platform for sports enthusiasts to connect, stay
                informed, and access top-quality gear.
                Our mission is to foster a global community of athletes,
                empowering them to achieve their goals and push their limits.
                athleteally is dedicated to supporting athletes at all levels.
                We provide a platform for sports enthusiasts to connect, stay
                informed, and access top-quality gear.
                Our mission is to foster a global community of athletes,
                empowering them to achieve their goals and push their limits.
              </p>
            </div>
            {/* <div className="md:w-1/2">
              <img
                src="https://plus.unsplash.com/premium_photo-1671100502325-8870ff9ba5c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXRobGV0ZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="About athleteally"
                className="rounded-lg shadow-lg"
              />
            </div> */}
          </div>
        </div>
      </motion.section>

      {/* Latest News */}
      <motion.section id="news" className="py-16 bg-black" {...fadeIn}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">
                    Breaking Sports News {i}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gray-200 inline-flex items-center transition-colors"
                  >
                    Read more <Newspaper className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Athletes */}
      <motion.section id="athletes" className="py-16 bg-gray-900" {...fadeIn}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
            Featured Athletes
          </h2>
          <FeaturedAthleteSlider athletes={featuredAthletes} />
        </div>
      </motion.section>

      {/* Our Services */}
      <motion.section id="services" className="py-16 bg-black" {...fadeIn}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Training Programs", icon: Dumbbell },
              { title: "Nutrition Advice", icon: ShoppingBag },
              { title: "Performance Analytics", icon: Medal },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                  <service.icon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">
                    {service.title}
                  </h3>
                  <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sports Gear */}
      <motion.section id="gear" className="py-16 bg-gray-900" {...fadeIn}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
            Sports Gear
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                  <img
                    src="https://imgs.search.brave.com/jo2hPZxH4D_srAq5IlRIRjq6nyPxYv4taDuGKDVFeMI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/MzUyNTU2L3Bob3Rv/L3Nwb3J0cy1lcXVp/cG1lbnQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPV96OXRB/MWltMm00MmtCaDhX/VVlMbkZWLVhyNFhr/d2NVUndydHNtQTkw/TkU9"
                    alt={`Sports Gear ${i}`}
                    className="rounded-lg mb-4 w-full"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">
                    Sports Gear {i}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    High-quality gear for top performance
                  </p>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded transition-colors">
                    Shop Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Upcoming Events */}
      <motion.section id="events" className="py-16 bg-black" {...fadeIn}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                  <Calendar className="h-8 w-8 mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">
                    Sports Event {i}
                  </h3>
                  <p className="text-gray-300 mb-2">Date: June 1{i}, 2023</p>
                  <p className="text-gray-300 mb-4">
                    Location: Sports Arena {i}
                  </p>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded transition-colors">
                    Register
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2 text-gray-100">
                AthleteAlly
              </h2>
              <p className="text-gray-300">Empowering athletes worldwide</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-gray-100 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-gray-100 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-gray-100 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2023 AthleteAlly. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
