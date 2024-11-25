import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const engagementTypes = [
  "Guest Appearance",
  "Commercial Shoot",
  "Social Media Promotion",
  "Charity Event",
  "Product Launch",
];

const SponsorEngagementPage = () => {
  const [selectedEntity, setSelectedEntity] = useState("");
  const [engagementType, setEngagementType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [sponsoredEntities, setSponsoredEntities] = useState([]);

  const fetchTeamsData = async () => {
    try {
      const teamsCollection = collection(db, "teams");
      const teamsSnapshot = await getDocs(teamsCollection);
      const teamsList = teamsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTeams(teamsList);
      // console.log("Fetched Teams data:", teamsList);
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

      setAthletes(athletesList);
      // console.log("Fetched athletes data:", athletesList);
    } catch (error) {
      console.error("Error fetching athletes data:", error);
    }
  };

  const setRightData = () => {
    teams.map((team) => {
      const obj1 = {
        name: team.teamName,
        type: "Team",
        logo: team.image,
        email: team.email,
      };
      setSponsoredEntities((prev) => [...prev, obj1]);
    });

    athletes.map((athlete) => {
      const obj2 = {
        name: athlete.name,
        type: "Athlete",
        logo: athlete.image,
        email: athlete.email,
      };
      setSponsoredEntities((prev) => [...prev, obj2]);
    });
  };

  useEffect(() => {
    fetchTeamsData();
    fetchAthletesData();
  }, []);

  useEffect(() => {
    setRightData();
    // console.log(sponsoredEntities);
  }, [athletes, teams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailAddress = "";
    for (let i = 0; i < athletes.length; i++) {
      if (athletes[i].name === selectedEntity) {
        emailAddress = athletes[i].email;
      }
    }
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].teamName === selectedEntity) {
        emailAddress = teams[i].email;
      }
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log({ selectedEntity, engagementType, message, emailAddress });

      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const renderEntityImage = () => {
    const entity = sponsoredEntities.find((e) => e.name === selectedEntity);
    if (!entity) return null;
    return (
      <div className="mt-4 flex justify-center">
        <img
          src={entity.type === "Team" ? entity.logo : entity.image}
          alt={entity.name}
          className={`h-32 w-32 object-cover ${
            entity.type === "Team" ? "object-contain" : "rounded-full"
          }`}
        />
      </div>
    );
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-64 bg-blue-900">
        <Sidebar />
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all hover:scale-105">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
              Sponsor Engagement Form
            </h1>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label
                    htmlFor="entity"
                    className="block text-sm font-medium text-blue-700"
                  >
                    Select Team/Athlete
                  </label>
                  <select
                    id="entity"
                    value={selectedEntity}
                    onChange={(e) => setSelectedEntity(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select a team or athlete</option>
                    {sponsoredEntities.map((entity) => (
                      <option key={entity.id} value={entity.name}>
                        {entity.name} ({entity.type})
                      </option>
                    ))}
                  </select>
                  {renderEntityImage()}
                </div>

                <div>
                  <label
                    htmlFor="engagementType"
                    className="block text-sm font-medium text-blue-700"
                  >
                    Engagement Type
                  </label>
                  <select
                    id="engagementType"
                    value={engagementType}
                    onChange={(e) => setEngagementType(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select engagement type</option>
                    {engagementTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-blue-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    placeholder="Provide details about your engagement..."
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {loading ? "Submitting..." : "Submit Engagement"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Engagement Submitted!
                </h2>
                <p className="text-blue-700 mb-4">
                  Your engagement for {engagementType.toLowerCase()} has been
                  sent to {selectedEntity}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedEntity("");
                    setEngagementType("");
                    setMessage("");
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Submit Another Engagement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorEngagementPage;
