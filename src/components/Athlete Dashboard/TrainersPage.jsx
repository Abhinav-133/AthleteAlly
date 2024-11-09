"use client";

import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

export default function AllTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null); // To manage the selected trainer for the modal
  const [openModal, setOpenModal] = useState(false); // To control the modal visibility

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

  const userUid = sessionStorage.getItem("userUid");

  const handleEnroll = async (trainerId) => {
    try {
      const athleteRef = doc(db, "athletes", userUid); // Reference to the athlete's document

      // Update athlete's document with trainerId
      await updateDoc(athleteRef, {
        trainerId: trainerId,
      });

      alert("Successfully enrolled with trainer!");
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll. Please try again.");
    }
  };

  // Function to open the modal with trainer details
  const handleAboutClick = (trainer) => {
    setSelectedTrainer(trainer); // Set the selected trainer
    setOpenModal(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedTrainer(null); // Clear the selected trainer
  };

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
                <p>
                  <strong>Experience:</strong> {trainer.experience} years
                </p>
                <p>
                  <strong>Location:</strong> {trainer.district}
                </p>
                <p>
                  <strong>Email:</strong> {trainer.email}
                </p>
                <p>
                  <strong>State:</strong> {trainer.state}
                </p>
              </div>
              <button
                onClick={() => handleEnroll(trainer.id)}
                className="mt-4 w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Enroll
              </button>

              {/* About button */}
              <button
                onClick={() => handleAboutClick(trainer)}
                className="mt-2 w-1/2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                About
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal for trainer details */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>About {selectedTrainer?.name}</DialogTitle>
        <DialogContent>
          <p>
            <strong>Experience:</strong> {selectedTrainer?.experience} years
          </p>
          <p>
            <strong>Location:</strong> {selectedTrainer?.district}
          </p>
          <p>
            <strong>Email:</strong> {selectedTrainer?.email}
          </p>
          <p>
            <strong>State:</strong> {selectedTrainer?.state}
          </p>
          <p>
            <strong>About:</strong>{" "}
            {selectedTrainer?.bio || "No additional information available."}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
