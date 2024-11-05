
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";

export default function AllTrainers() {
  const [athletes, setathletes] = useState([]);
  const userUid = sessionStorage.getItem("userUid");


  useEffect(() => {
    const fetchathletes = async () => {
      try {
        // Create a query to fetch athletes whose trainerId equals userUid
        const athletesQuery = query(
          collection(db, "athletes"),
          where("trainerId", "==", userUid)
        );
        const querySnapshot = await getDocs(athletesQuery);
        const athletesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setathletes(athletesData);
      } catch (error) {
        console.error("Error fetching trainers: ", error);
      }
    };

    fetchathletes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        athletes
      </h1>

      {athletes.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No athletes found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {athletes.map((athlete) => (
            <motion.div
              key={athlete.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-1 text-gray-800">
                {athlete.name}
              </h3>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-2 inline-block">
                {athlete.sport}
              </span>
              <div className="mt-4 text-gray-700 space-y-1">
                <p><strong>Experience:</strong> {athlete.experience} years</p>
                <p><strong>Location:</strong> {`${athlete.district}`}</p>
                <p><strong>Email:</strong> {athlete.email}</p>
                <p><strong>State:</strong> {athlete.state}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
