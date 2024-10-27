import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// const athletes2 = [
//   {
//     name: "John Doe",
//     sport: "Basketball",
//     team: "New York Knicks",
//     image:
//       "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player1-2wQXCDm1yQEvTHds0fYgxnIgLqQZPm.jpg",
//     stats: {
//       points: 25.3,
//       rebounds: 10.1,
//       assists: 5.7,
//     },
//     sponsors: [
//       {
//         name: "Nike",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/nike-logo-JBPcFGxcWvHwfbVUGi9LS4xSdDwJVt.png",
//       },
//       {
//         name: "Gatorade",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/gatorade-logo-wCqSGQxw9SRYYWy2OKoXhHlpTxtHRa.png",
//       },
//       {
//         name: "Beats by Dre",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/beats-logo-ZBPcOuZKbQ1cj8nZYIQxXVXgLHOeNk.png",
//       },
//     ],
//   },
//   {
//     name: "Jane Smith",
//     sport: "Soccer",
//     team: "Manchester United",
//     image:
//       "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player2-5Vn8Qd3OBNTFHUe1POWVqIZmRxpDbg.jpg",
//     stats: {
//       goals: 18,
//       assists: 12,
//       cleanSheets: 5,
//     },
//     sponsors: [
//       {
//         name: "Adidas",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/adidas-logo-kxTHJwpTzEOtCGrbYBxTNnR4LS3Dve.png",
//       },
//       {
//         name: "Pepsi",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/pepsi-logo-zBocFe3Y1oHWMLdMZ5XgKgfzYBCpxn.png",
//       },
//       {
//         name: "Samsung",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/samsung-logo-6VxQCrvzh9LDg8VtNGfgAjfwLSDKPa.png",
//       },
//     ],
//   },
//   {
//     name: "Mike Johnson",
//     sport: "Tennis",
//     team: "ATP Tour",
//     image:
//       "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player3-5TP8hB3OBNTFHUe1POWVqIZmRxpDbg.jpg",
//     stats: {
//       grandSlams: 3,
//       winPercentage: 78.5,
//       ranking: 4,
//     },
//     sponsors: [
//       {
//         name: "Wilson",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/wilson-logo-zBocFe3Y1oHWMLdMZ5XgKgfzYBCpxn.png",
//       },
//       {
//         name: "Rolex",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/rolex-logo-kxTHJwpTzEOtCGrbYBxTNnR4LS3Dve.png",
//       },
//       {
//         name: "Emirates",
//         logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/emirates-logo-JBPcFGxcWvHwfbVUGi9LS4xSdDwJVt.png",
//       },
//     ],
//   },
// ];
const AthletesPage = () => {
  const [athletes, setAthletes] = useState([]);

  const fetchAthletesData = async () => {
    try {
      const athletesCollection = collection(db, "athletes"); // Reference the 'athletes' collection
      const athleteSnapshot = await getDocs(athletesCollection); // Fetch the documents
      const athletesList = athleteSnapshot.docs.map((doc) => ({
        id: doc.id, // Optionally include the document ID
        ...doc.data(), // Spread the document data
      }));

      setAthletes(athletesList); // Set the athletes data in state
      console.log("Fetched athletes data:", athletesList);
    } catch (error) {
      console.error("Error fetching athletes data:", error);
    }
  };

  useEffect(() => {
    fetchAthletesData();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar space */}
      <div className="w-64 fixed">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Featured Athletes
          </h1>
          {/* Grid for athlete cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {athletes.map((athlete, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg relative h-[520px]"
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={"#"}
                      alt={athlete.name}
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                      {athlete.sport}
                    </div>
                    <h2 className="mt-1 text-3xl font-bold text-blue-900">
                      {athlete.name}
                    </h2>
                    <p className="mt-2 text-blue-700">{athlete.bio}</p>
                    <div className="text-blue-900 font-bold absolute bottom-48">
                      <p className="mt-2 ">Gender: {athlete.gender}</p>
                      <p className="mt-2 ">DOB: {athlete.dob}</p>
                      <p className="mt-2 ">
                        Experience - {athlete.experience} yrs
                      </p>
                      <p className="mt-2 ">Current Team - {athlete.team}</p>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-6 absolute bottom-14">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    Sponsors
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {athlete.sponsors &&
                      athlete.sponsors.map((sponsor, sponsorIndex) => (
                        <div
                          key={sponsorIndex}
                          className="bg-blue-50 p-4 rounded-lg flex items-center justify-center shadow text-blue-600 font-semibold"
                        >
                          {sponsor}
                        </div>
                      ))}
                  </div>
                </div>
                <button className="w-[97%] bg-blue-500 text-white m-2 p-2 rounded-lg text-lg font-bold absolute bottom-2 left-0">
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

export default AthletesPage;
