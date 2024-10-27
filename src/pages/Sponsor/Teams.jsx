import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const teams2 = [
  {
    name: "New York Knicks",
    sport: "Basketball",
    league: "NBA",
    image:
      "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/knicks-logo-JBPcFGxcWvHwfbVUGi9LS4xSdDwJVt.png",
    stats: {
      wins: 41,
      losses: 31,
      pointsPerGame: 116.3,
    },
    sponsors: [
      {
        name: "Chase",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/chase-logo-kxTHJwpTzEOtCGrbYBxTNnR4LS3Dve.png",
      },
      {
        name: "Squarespace",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/squarespace-logo-ZBPcOuZKbQ1cj8nZYIQxXVXgLHOeNk.png",
      },
      {
        name: "MSG",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/msg-logo-wCqSGQxw9SRYYWy2OKoXhHlpTxtHRa.png",
      },
    ],
  },
  {
    name: "Manchester United",
    sport: "Soccer",
    league: "Premier League",
    image:
      "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/man-utd-logo-5Vn8Qd3OBNTFHUe1POWVqIZmRxpDbg.png",
    stats: {
      wins: 23,
      draws: 6,
      losses: 9,
      goalsScored: 58,
    },
    sponsors: [
      {
        name: "TeamViewer",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/teamviewer-logo-zBocFe3Y1oHWMLdMZ5XgKgfzYBCpxn.png",
      },
      {
        name: "Adidas",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/adidas-logo-kxTHJwpTzEOtCGrbYBxTNnR4LS3Dve.png",
      },
      {
        name: "DXC Technology",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/dxc-logo-JBPcFGxcWvHwfbVUGi9LS4xSdDwJVt.png",
      },
    ],
  },
  {
    name: "Los Angeles Dodgers",
    sport: "Baseball",
    league: "MLB",
    image:
      "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/dodgers-logo-5TP8hB3OBNTFHUe1POWVqIZmRxpDbg.png",
    stats: {
      wins: 111,
      losses: 51,
      runScored: 847,
    },
    sponsors: [
      {
        name: "Nike",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/nike-logo-JBPcFGxcWvHwfbVUGi9LS4xSdDwJVt.png",
      },
      {
        name: "Budweiser",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/budweiser-logo-zBocFe3Y1oHWMLdMZ5XgKgfzYBCpxn.png",
      },
      {
        name: "Bank of America",
        logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/boa-logo-kxTHJwpTzEOtCGrbYBxTNnR4LS3Dve.png",
      },
    ],
  },
];
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
                  <div className="md:flex-shrink-0 flex items-center justify-center p-6 bg-blue-50">
                    <img
                      className="h-32 w-32 object-contain"
                      src={team.image}
                      alt="Error"
                    />
                  </div>
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
                        {member}
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
                        {sponsor}
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
