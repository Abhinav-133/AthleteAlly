import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Globe,
  User,
  Users,
  Trophy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-blue-50 rounded-lg shadow-md p-4 flex items-center space-x-4">
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-blue-600">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const ExpandableCard = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        className="w-full px-4 py-3 flex justify-between items-center bg-blue-50 hover:bg-blue-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function EnhancedSponsorOverview() {
  const [activeTab, setActiveTab] = useState("teams");
  const [sponsor, setSponsor] = useState([]);
  const [teams, setTeams] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const fetchSponsorData = async () => {
    try {
      const sponsorUid = sessionStorage.getItem("sponsorUid");
      const sponsorCollection = collection(db, "sponsors");
      const sponsorSnapshot = await getDocs(sponsorCollection);
      const sponsorList = sponsorSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      for (let i = 0; i < sponsorList.length; i++) {
        if (sponsorList[i].id === sponsorUid) {
          setSponsor(sponsorList[i]);
        }
      }
    } catch (error) {
      console.error("Error fetching Sponsor data:", error);
    }
  };

  const fetchTeamsData = async () => {
    try {
      const teamsCollection = collection(db, "teams");
      const teamsSnapshot = await getDocs(teamsCollection);
      const teamsList = teamsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      for (let i in teamsList) {
        if (teamsList[i].sponsors.includes(sponsor.companyName)) {
          setTeams((prev) => [teamsList[i], ...prev]);
        }
      }
    } catch (error) {
      console.error("Error fetching Tournaments data:", error);
    }
  };
  const fetchAthletesData = async () => {
    try {
      const athletesCollection = collection(db, "athletes");
      const athleteSnapshot = await getDocs(athletesCollection);
      const athletesList = athleteSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      for (let i in athletesList) {
        if (athletesList[i].sponsors.includes(sponsor.companyName)) {
          setAthletes((prev) => [athletesList[i], ...prev]);
        }
      }
    } catch (error) {
      console.error("Error fetching athletes data:", error);
    }
  };

  const fetchTournamentsData = async () => {
    try {
      const tournamentsCollection = collection(db, "tournaments");
      const tournamentsSnapshot = await getDocs(tournamentsCollection);
      const tournamentsList = tournamentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      for (let i in tournamentsList) {
        if (tournamentsList[i].sponsors.includes(sponsor.companyName)) {
          setTournaments((prev) => [tournamentsList[i], ...prev]);
        }
      }
    } catch (error) {
      console.error("Error fetching Tournaments data:", error);
    }
  };

  useEffect(() => {
    fetchSponsorData();
  }, []);

  useEffect(() => {
    fetchTeamsData();
    fetchAthletesData();
    fetchTournamentsData();
  }, [sponsor]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="min-h-screen w-full bg-blue-50 text-blue-900 overflow-scroll">
        <motion.header
          className="bg-blue-600 text-white py-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sponsor && (
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-2">{sponsor.companyName}</h1>
              <p className="text-xl text-blue-100">{sponsor.contactPerson}</p>
              <div className="mt-4 flex space-x-4">
                <a
                  href={`mailto:${sponsor.email}`}
                  className="flex items-center text-blue-100 hover:text-white"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {sponsor.email}
                </a>
                <a
                  href={`tel:${sponsor.phone}`}
                  className="flex items-center text-blue-100 hover:text-white"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {sponsor.phone}
                </a>
                <a
                  href={`https://${sponsor.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-100 hover:text-white"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  {sponsor.website}
                </a>
              </div>
            </div>
          )}
        </motion.header>

        <main className="container mx-auto px-4 py-8">
          <motion.section
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl font-semibold mb-4">Sponsor Information</h2>

            {sponsor && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="mb-2">
                    <strong>Bio:</strong> {sponsor.bio}
                  </p>
                  <p className="mb-2">
                    <strong>Founded:</strong> {sponsor.createdAt}
                  </p>
                </div>
                <div>
                  <p className="mb-2 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      <strong>Contact Person:</strong> {sponsor.contactPerson}
                    </span>
                  </p>
                  <p className="mb-2 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      <strong>Email:</strong> {sponsor.email}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      <strong>Phone:</strong> {sponsor.phone}
                    </span>
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={<Users className="w-6 h-6 text-blue-600" />}
                title="Teams Sponsored"
                value={teams.length}
              />
              <StatCard
                icon={<User className="w-6 h-6 text-blue-600" />}
                title="Athletes Sponsored"
                value={athletes.length}
              />
              <StatCard
                icon={<Calendar className="w-6 h-6 text-blue-600" />}
                title="Events Sponsored"
                value={tournaments.length}
              />
            </div>
          </motion.section>

          <motion.div
            className="mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex justify-center space-x-4 mb-6">
              {["teams", "athletes", "events"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-6 py-2 rounded-full text-lg font-semibold ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "teams" && (
                  <div className="space-y-6">
                    {teams.map((team, index) => (
                      <ExpandableCard key={index} title={team.teamName}>
                        <div className="flex flex-col md:flex-row md:items-center">
                          <img
                            src={team.img}
                            alt={team.teamName}
                            className="w-24 h-24 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
                          />
                          <div className="flex-grow">
                            <p>
                              <strong>Sport:</strong> {team.sport}
                            </p>
                            <p>
                              <strong>League:</strong> {team.league}
                            </p>
                            <p>
                              <strong>Team Leader:</strong> {team.teamLeader}
                            </p>
                            <p>
                              <strong>Members:</strong> {team.members.name}
                            </p>
                            <p>
                              <strong>Tournament:</strong> {team.tournamentName}
                            </p>
                            <p>
                              <strong>Sponsors:</strong>{" "}
                              {team.sponsors.join(", ")}
                            </p>
                          </div>
                        </div>
                      </ExpandableCard>
                    ))}
                  </div>
                )}

                {activeTab === "athletes" && (
                  <div className="space-y-6">
                    {athletes.map((athlete, index) => (
                      <ExpandableCard key={index} title={athlete.name}>
                        <div className="flex flex-col md:flex-row md:items-center">
                          <img
                            src={athlete.image}
                            alt={athlete.name}
                            className="w-24 h-24 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
                          />
                          <div className="flex-grow">
                            <p>
                              <strong>Sport:</strong> {athlete.sport}
                            </p>
                            <p>
                              <strong>Gender:</strong> {athlete.gender}
                            </p>
                            <p>
                              <strong>Date of Birth:</strong> {athlete.dob}
                            </p>
                            <p>
                              <strong>Experience:</strong> {athlete.experience}
                            </p>
                            <p>
                              <strong>State:</strong> {athlete.state}
                            </p>
                            <p>
                              <strong>District:</strong> {athlete.district}
                            </p>
                            <p className="mt-2">
                              <em>{athlete.bio}</em>
                            </p>
                          </div>
                        </div>
                      </ExpandableCard>
                    ))}
                  </div>
                )}

                {activeTab === "events" && (
                  <div className="space-y-6">
                    {tournaments.map((event, index) => (
                      <ExpandableCard key={index} title={event.name}>
                        <div className="flex flex-col md:flex-row md:items-center">
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-full md:w-48 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                          />
                          <div className="flex-grow">
                            <p>
                              <strong>Location:</strong> {event.location}
                            </p>
                            <p>
                              <strong>Sport:</strong> {event.sport}
                            </p>
                            <p>
                              <strong>Organizer:</strong> {event.organizer}
                            </p>
                            <p>
                              <strong>Participants:</strong>{" "}
                              {event.participants}
                            </p>
                            <p>
                              <strong>Team Size:</strong> {event.teamSize}
                            </p>
                            <p>
                              <strong>Prize Pool:</strong> {event.prizePool}
                            </p>
                          </div>
                        </div>
                      </ExpandableCard>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
