import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);

  const fetchTeamsData = async () => {
    try {
      const teamsCollection = collection(db, "teams");
      const teamsSnapshot = await getDocs(teamsCollection); // Fetch the documents
      const teamsList = teamsSnapshot.docs.map((doc) => ({
        id: doc.id, // Optionally include the document ID
        ...doc.data(), // Spread the document data
      }));

      setTeams(teamsList); // Set the athletes data in state
      console.log("Fetched Teams data:", teamsList);
    } catch (error) {
      console.error("Error fetching Tournaments data:", error);
    }
  };

  useEffect(() => {
    fetchTeamsData();
  }, []);

  useEffect(() => {
    console.log(teams);
  }, [teams]);
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-64 fixed">
        <Sidebar />
      </div>

      <div className="flex-1 p-8 ml-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Featured Teams
          </h1>

          {/* Grid for team cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 relative h-[525px]"
              >
                <div className="md:flex">
                  {/* <div className="md:flex-shrink-0 flex items-center justify-center p-6 bg-blue-50">
                    <img
                      className="h-32 w-32 object-contain"
                      src={team.image}
                      alt="Error"
                    />
                  </div> */}
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                      {team.sport}
                    </div>
                    <h2 className="mt-1 text-3xl font-bold text-blue-900">
                      {team.teamName}
                    </h2>
                    <p className="mt-2 text-blue-700">{team.tournamentName}</p>
                  </div>
                </div>

                <div className="px-8 py-6">
                  <h1 className="text-2xl font-bold text-blue-900 mb-4">
                    Team Members
                  </h1>
                  <div className="grid grid-cols-3 gap-4">
                    {team.members.map((member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className="bg-blue-50 p-4 rounded-lg flex items-center justify-center shadow"
                      >
                        {member.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-8 py-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    Sponsors
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {team.sponsors.map((sponsor, sponsorIndex) => (
                      <div
                        key={sponsorIndex}
                        className="bg-blue-50 p-4 rounded-lg flex items-center justify-center shadow"
                      >
                        {sponsor.name}
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-[97%] bg-blue-500 text-white m-2 p-2 rounded-lg text-lg font-bold absolute bottom-1 left-0">
                  Sponsor
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
