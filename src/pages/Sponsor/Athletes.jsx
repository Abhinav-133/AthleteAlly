import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
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

  const handleSponsorButton = async (id) => {
    console.log(id);
    const db = getFirestore();
    const sponsorName = sessionStorage.getItem("sponsorName");
    const sponsorUid = sessionStorage.getItem("sponsorUid"); // Fetch sponsor UID from session storage
    if (!sponsorName) {
      console.error("sponsor Name is not available in session storage.");
      return;
    }

    try {
      const athletesRef = doc(db, "athletes", id);

      await updateDoc(athletesRef, {
        sponsors: arrayUnion(sponsorName),
      });

      const sponsorRef = doc(db, "sponsors", sponsorUid);
      await updateDoc(sponsorRef, {
        athletes: arrayUnion(id),
      });
      console.log(
        `Sponsor ${sponsorName} successfully added to tournament ${id}.`
      );
    } catch (error) {
      console.error("Error adding sponsor to Atheltes:", error);
    }
  };
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
                <button
                  className="w-[97%] bg-blue-500 text-white m-2 p-2 rounded-lg text-lg font-bold absolute bottom-2 left-0"
                  onClick={() => {
                    handleSponsorButton(athlete.id);
                  }}
                >
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
