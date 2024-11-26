import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CalendarIcon,
  MapPinIcon,
  DollarSignIcon,
  UsersIcon,
  ClockIcon,
  Flag,
} from "lucide-react";

import Sidebar from "./Sidebar";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export default function UpcomingEvents() {
  const [tournaments, setTournaments] = useState([]);

  const fetchTournamentsData = async () => {
    try {
      const tournamentsCollection = collection(db, "tournaments"); // Reference the 'athletes' collection
      const tournamentsSnapshot = await getDocs(tournamentsCollection); // Fetch the documents
      const tournamentsList = tournamentsSnapshot.docs.map((doc) => ({
        id: doc.id, // Optionally include the document ID
        ...doc.data(), // Spread the document data
      }));

      setTournaments(tournamentsList); // Set the athletes data in state
      console.log("Fetched Tournaments data:", tournamentsList);
    } catch (error) {
      console.error("Error fetching Tournaments data:", error);
    }
  };

  useEffect(() => {
    fetchTournamentsData();
  }, []);

  const handleSponsorButton = async (id) => {
    console.log(id);
    const db = getFirestore();
    const sponsorName = sessionStorage.getItem("sponsorName");
    const sponsorUid = sessionStorage.getItem("sponsorUid"); // Fetch sponsor UID from session storage

    if (!sponsorName || !sponsorUid) {
      console.error("Sponsor Name or UID is not available in session storage.");
      return;
    }

    try {
      // Update the sponsors array in the tournament document
      const tournamentRef = doc(db, "tournaments", id);
      await updateDoc(tournamentRef, {
        sponsors: arrayUnion(sponsorName),
      });
      console.log(
        `Sponsor ${sponsorName} successfully added to tournament ${id}.`
      );

      // Update the events array in the sponsor document
      const sponsorRef = doc(db, "sponsors", sponsorUid);
      await updateDoc(sponsorRef, {
        events: arrayUnion(id),
      });
      console.log(
        `Tournament ID ${id} successfully added to sponsor ${sponsorName}.`
      );

      toast.success("🎉 Sponsor added successfully!", {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error updating sponsor or tournament:", error);
      toast.error("⚠️ Failed to add sponsor. Try again!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <div className="flex">
          {/* Sidebar Section */}
          <div className="fixed w-64 h-screen">
            <Sidebar />
          </div>

          {/* Main Content Section */}
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-2 text-center">
              Upcoming Sponsored Events
            </h1>
            <p className="text-xl text-blue-600 mb-8 text-center">
              Join us at these exciting sports events!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments &&
                tournaments.map((event) => (
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-blue-200 transition-all duration-300 hover:shadow-xl hover:scale-105 relative h-[410px]">
                    <div className="relative">
                      <img
                        src={"#"}
                        alt={event.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-600 to-blue-600/70 text-white px-4 py-2">
                        <h3 className="text-xl font-semibold">{event.name}</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      {/* <div className="flex items-center text-blue-800">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      <span>{event.date}</span>
                    </div> */}
                      <div className="flex items-center text-blue-800">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        <span>{event.location}</span>
                      </div>

                      <div className="flex items-center text-blue-800">
                        <Flag className="w-5 h-5 mr-2" />
                        <span>{event.sport}</span>
                      </div>

                      <div className="flex items-center text-blue-800">
                        <DollarSignIcon className="w-5 h-5 mr-2" />
                        <span>{event.prizePool}</span>
                      </div>

                      <div className="flex items-center text-blue-800">
                        <UsersIcon className="w-5 h-5 mr-2" />
                        <span>{event.participants}</span>
                      </div>
                    </div>

                    <button
                      className="w-[97%] bg-blue-500 text-white m-2 p-2 rounded-lg text-lg font-bold absolute bottom-1 left-0"
                      onClick={() => {
                        handleSponsorButton(event.id);
                      }}
                    >
                      Sponsor
                    </button>
                  </div>
                ))}
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
