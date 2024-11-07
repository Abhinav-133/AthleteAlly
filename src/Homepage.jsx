import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { db } from "./firebaseConfig";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import {
  Calendar,
  Dumbbell,
  Medal,
  ShoppingBag,
  Newspaper,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(200)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-blue-500 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          transition: {
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
        style={{ opacity: Math.random() * 0.5 + 0.1 }}
      />
    ))}
  </div>
);

const NewsMarquee = ({ news }) => {
  return (
    <div className="overflow-hidden bg-gray-900 py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {news.concat(news).map((item, index) => (
          <span key={index} className="mx-4 text-gray-300">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();
  const [newsUrl, setNewsUrl] = useState("");
  const [top7News, setTop7news] = useState([]);
  const [top3Articles, setTop3Articles] = useState();
  const [tournaments, setTournaments] = useState([]);

  const getLast7DaysNews = () => {
    const today = new Date();
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);

    const formattedFromDate = last7Days.toISOString().split("T")[0];
    const url = `https://newsapi.org/v2/everything?q=Sports&from=${formattedFromDate}&sortBy=popularity&sources=the-times-of-india,ndtv,the-hindu&apiKey=${
      import.meta.env.VITE_NEWSAPI_KEY
    }`;
    setNewsUrl(url);
  };

  const fetchNews = async () => {
    console.log(newsUrl);
    let response = await fetch(newsUrl);
    response = await response.json();

    setTop3Articles(response.articles.slice(0, 3));

    const articles = response.articles.slice(0, 7);
    setTop7news((prevArticles) => [
      ...prevArticles,
      ...articles.map((item) => item.title),
    ]);
  };

  useEffect(() => {
    fetchNews();
  }, [newsUrl]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const querySnapshot = await getDocs(collection(db, "tournaments"));
      const tournamentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const formattedTournaments = tournamentsData.map((tournament) => {
        const formattedDate =
          tournament.date instanceof Timestamp
            ? tournament.date.toDate()
            : new Date(tournament.date);
        return { ...tournament, date: formattedDate };
      });

      setTournaments(formattedTournaments.slice(0, 3));
      console.log(tournaments);
    };
    fetchTournaments();
  }, []);
  useEffect(() => {
    getLast7DaysNews();
    controls.start({ opacity: 1, y: 0 });

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const navbarBackground =
    scrollPosition > 50 ? "bg-gray-900/60 backdrop-blur-xl" : "bg-transparent";

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <ParticleBackground />
      {/* Header */}
      <motion.header
        className={`py-4 fixed w-full z-50 transition-all duration-300 ${navbarBackground}`}
        initial={{ opacity: 0, y: -50 }}
        animate={controls}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-100">AthleteAlly</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#about"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  News
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Events
                </a>
              </li>
            </ul>
          </nav>
          <button
            className="md:hidden text-gray-200 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="space-y-6 text-center">
              <li>
                <a
                  href="#about"
                  className="text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#athletes"
                  className="text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Athletes
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#gear"
                  className="text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gear
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-2xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
      {/* News Marquee */}
      <div className="pt-16">
        <NewsMarquee news={top7News} />
      </div>
      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-20 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <ParticleBackground />
          <h2 className="text-5xl font-bold mb-4 text-gray-100">
            Empowering Athletes Worldwide
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Your ultimate destination for sports news, gear, and community
          </p>
          <Link to="/register-options">
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-3 px-6 rounded-full transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Join Now
            </button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </motion.section>{" "}
      <motion.section id="about" className="py-16 bg-gray-900" {...fadeIn}>
        {" "}
        <div className="container mx-auto px-4">
          {" "}
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
            About Us{" "}
          </h2>{" "}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {" "}
            <div className="md:w-100">
              {" "}
              <p className="text-lg mb-4 text-gray-300">
                Welcome to our platform, a dedicated space for aspiring athletes
                and sports enthusiasts. We believe in empowering every
                sportsperson, especially those who lack the resources or
                recognition they deserve. Our mission is to connect athletes
                with valuable opportunities through innovative technology,
                ensuring that talent is nurtured and showcased. Our platform
                offers unique features, including skill assessments through
                video analysis, enabling athletes to receive personalized
                feedback and track their progress over time. We strive to create
                a supportive community where athletes can connect, share
                experiences, and inspire one another. By leveraging AI and
                machine learning, we provide insights that help athletes enhance
                their performance, regardless of their background. Join us on
                this journey to redefine sports training and create equal
                opportunities for all athletes!
              </p>
            </div>
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
            {top3Articles &&
              top3Articles.map((article) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-gray-800 rounded-lg shadow-lg p-6 relative overflow-hidden h-80">
                    <h3 className="text-xl font-semibold mb-2 text-gray-100">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{article.description}</p>
                    <Link
                      to={article.url}
                      target="_blank"
                      className="text-gray-400 hover:text-gray-200 inline-flex items-center transition-colors"
                    >
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gray-700 rounded-bl-lg flex items-center justify-center">
                      <Newspaper className="w-8 h-8 text-gray-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-700 rounded-tr-full opacity-10"></div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.section>
      {/* Connected Athletes, Trainers, and Sponsors */}
      <motion.section
        id="community"
        className="py-16 bg-gray-900 relative overflow-hidden"
        {...fadeIn}
      >
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
            Our Community
          </h2>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6 text-center"
          >
            <h3 className="text-5xl font-bold text-gray-100">500+</h3>
            <p className="text-gray-300 text-xl mt-2">Athletes Connected</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6 text-center"
          >
            <h3 className="text-5xl font-bold text-gray-100">200+</h3>
            <p className="text-gray-300 text-xl mt-2">Trainers Available</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6 text-center"
          >
            <h3 className="text-5xl font-bold text-gray-100">100+</h3>
            <p className="text-gray-300 text-xl mt-2">Sponsors Engaged</p>
          </motion.div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full -mr-32 -mt-32 opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-800 rounded-full -ml-24 -mb-24 opacity-10"></div>
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
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center relative overflow-hidden">
                  <service.icon className="h-16 w-16 mx-auto mb-4 text-gray-300 relative z-10" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-100 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 relative z-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-700 rounded-full -mr-12 -mb-12 opacity-25"></div>
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
            {tournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 relative overflow-hidden">
                  <Calendar className="h-12 w-12 mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">
                    {tournament.name}{" "}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Date: June 1{index + 1}, 2023{" "}
                  </p>
                  <p className="text-gray-300 mb-4">
                    {tournament.location}{" "}
                  </p>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gray-700 rounded-full -mr-12 -mt-12 opacity-25"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gray-700 rounded-tr-full opacity-10"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        id="cta"
        className="py-16 bg-gradient-to-r from-gray-900 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join athleteally today and take your athletic journey to new
            heights!
          </p>
          <a href="/register-options">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Get Started Now
            </button>
          </a>
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
              <p className="text-gray-300">Empowering Athletes Worldwide</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 AthleteAlly. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
