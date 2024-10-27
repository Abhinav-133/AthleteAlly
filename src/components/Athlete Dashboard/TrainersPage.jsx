"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust path as needed
import { motion } from "framer-motion";

export default function AllTrainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trainers"));
        const trainersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainers(trainersData);
      } catch (error) {
        console.error("Error fetching trainers: ", error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Meet Our Professional Trainers
      </h1>

      {trainers.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No trainers found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-1 text-gray-800">
                {trainer.name}
              </h3>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-2 inline-block">
                {trainer.sport}
              </span>
              <div className="mt-4 text-gray-700 space-y-1">
                <p><strong>Experience:</strong> {trainer.experience} years</p>
                <p><strong>Location:</strong> {trainer.location}</p>
                <p><strong>Email:</strong> {trainer.email}</p>
                <p><strong>State:</strong> {trainer.state}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
