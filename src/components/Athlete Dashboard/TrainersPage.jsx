"use client";

import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDocs, getDoc, collection } from "firebase/firestore";
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
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [athleteSport, setAthleteSport] = useState(null); // Store athlete's sport

  const userUid = sessionStorage.getItem("userUid");

  useEffect(() => {
    const fetchAthleteSport = async () => {
      try {
        const athleteRef = doc(db, "athletes", userUid);
        const athleteSnap = await getDoc(athleteRef);
        if (athleteSnap.exists()) {
          setAthleteSport(athleteSnap.data().sport);
        }
      } catch (error) {
        console.error("Error fetching athlete data:", error);
      }
    };

    const fetchTrainers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trainers"));
        const trainersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainers(trainersData);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchAthleteSport();
    fetchTrainers();
  }, [userUid]);

  const handleEnroll = async () => {
    try {
      const athleteRef = doc(db, "athletes", userUid);
      await updateDoc(athleteRef, {
        trainerId: selectedTrainer.id,
      });
      alert("Successfully enrolled with trainer!");
      setConfirmModalOpen(false);
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll. Please try again.");
    }
  };

  const handleEnrollClick = (trainer) => {
    setSelectedTrainer(trainer);
    setConfirmModalOpen(true);
  };

  const handleAboutClick = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTrainer(null);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setSelectedTrainer(null);
  };

  const filteredTrainers = trainers.filter((trainer) => trainer.sport === athleteSport);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Meet Our Professional Trainers
      </h1>

      {filteredTrainers.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No trainers found for your sport.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredTrainers.map((trainer) => (
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
                onClick={() => handleEnrollClick(trainer)}
                className="mt-4 w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Enroll
              </button>

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

      {/* About Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
          About {selectedTrainer?.name}
        </DialogTitle>
        <DialogContent style={{ padding: "20px 40px", color: "#4a4a4a" }}>
          <p><strong>Experience:</strong> {selectedTrainer?.experience} years</p>
          <p><strong>Location:</strong> {selectedTrainer?.district}</p>
          <p><strong>Email:</strong> {selectedTrainer?.email}</p>
          <p><strong>State:</strong> {selectedTrainer?.state}</p>
          <p><strong>About:</strong> {selectedTrainer?.bio || "No additional information available."}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmModalOpen} onClose={handleCloseConfirmModal} maxWidth="md" fullWidth>
        <DialogTitle style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
          Are you sure you want to enroll with {selectedTrainer?.name}?
        </DialogTitle>
        <DialogContent style={{ padding: "20px 40px", color: "#4a4a4a" }}>
          <p><strong>Experience:</strong> {selectedTrainer?.experience} years</p>
          <p><strong>Location:</strong> {selectedTrainer?.district}</p>
          <p><strong>Email:</strong> {selectedTrainer?.email}</p>
          <p><strong>State:</strong> {selectedTrainer?.state}</p>
          <p><strong>About:</strong> {selectedTrainer?.bio || "No additional information available."}</p>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleEnroll} variant="contained" color="primary">
            Confirm
          </Button>
          <Button onClick={handleCloseConfirmModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
