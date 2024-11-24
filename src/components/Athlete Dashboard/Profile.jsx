"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Dumbbell,
  Award,
  Edit3,
} from "lucide-react";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export default function AthleteProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    dob: "",
    state: "",
    sport: "",
    achievements: "",
    bio: "",
    experience: "",
    gender: "",
    enroll: "",
    trainerName: "",
    sponsorNames: [],
    tournamentNames: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const userUid = sessionStorage.getItem("userUid");
      if (userUid) {
        const data = await fetchUserData(userUid, db);
        if (data) {
          const trainerName = await fetchTrainerNameById(data.trainerId, db);
          const sponsors = await fetchNamesByIds(data.sponsors, "sponsors", db);
          const tournaments = await fetchNamesByIds(
            data.registeredTournaments,
            "tournaments",
            db
          );

          setFormData({
            ...data,
            trainerName,
            sponsorNames: sponsors,
            tournamentNames: tournaments,
          });
        }
      }
    };
    fetchData();
  }, [db]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-700">
          Athlete Profile
        </h1>
        <button
          onClick={handleEditToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Edit3 className="mr-2" /> {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileSection formData={formData} isEditing={isEditing} />
        <div>
          <SingleItemSection title="Trainer" item={formData.trainerName} />
          <Section title="Sponsors" items={formData.sponsorNames} />
          <Section
            title="Registered Tournaments"
            items={formData.tournamentNames}
          />
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ formData, isEditing }) {
  const MotionCard = motion.div;
  const displayOrder = [
    "name",
    "email",
    "contactNo",
    "dob",
    "sport",
    "experience",
    "gender",
    "state",
    "bio",
  ];

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-xl border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">
        Personal Information
      </h2>
      <div className="space-y-4">
        {displayOrder.map((key) => (
          <div key={key} className="flex items-center py-1">
            <IconSelector key={key} />
            {isEditing ? (
              <input
                type="text"
                value={formData[key]}
                onChange={(e) => handleInputChange(e, key)}
                className="ml-4 p-2 bg-gray-100 border rounded-md w-full text-gray-600"
              />
            ) : (
              <span className="ml-4 text-gray-600">
                <strong className="text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </strong>{" "}
                {formData[key]}
              </span>
            )}
          </div>
        ))}
      </div>
    </MotionCard>
  );
}

function SingleItemSection({ title, item }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-4">
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-600">{item || "Not Assigned"}</p>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-4">
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-1">
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index} className="text-gray-600">
              {item}
            </li>
          ))
        ) : (
          <li className="text-gray-600">No {title}</li>
        )}
      </ul>
    </div>
  );
}

async function fetchTrainerNameById(trainerId, db) {
  try {
    const trainersCollectionRef = collection(db, "trainers");
    const querySnapshot = await getDocs(trainersCollectionRef);
    let matchedTrainer = "No Trainer Assigned";
    querySnapshot.forEach((doc) => {
      const trainerData = doc.data();
      if (trainerData.id === trainerId) {
        matchedTrainer = trainerData.name;
      }
    });

    return matchedTrainer;
  } catch (error) {
    console.error(`Error fetching trainer by ID:`, error);
    return "Error Fetching Trainer";
  }
}

async function fetchNamesByIds(ids, collectionName, db) {
  try {
    const names = await Promise.all(
      ids.map(async (id) => {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().name : "Unknown";
      })
    );
    return names;
  } catch (error) {
    console.error(`Error fetching names from ${collectionName}:`, error);
    return [];
  }
}

async function fetchUserData(userUid, db) {
  try {
    const userDocRef = doc(db, "athletes", userUid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

function handleInputChange(event, key) {
  const { value } = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [key]: value,
  }));
}

function IconSelector({ key }) {
  switch (key) {
    case "name":
      return <User className="text-gray-400" />;
    case "email":
      return <Mail className="text-gray-400" />;
    case "contactNo":
      return <Phone className="text-gray-400" />;
    case "state":
      return <MapPin className="text-gray-400" />;
    case "dob":
      return <Calendar className="text-gray-400" />;
    case "sport":
      return <Dumbbell className="text-gray-400" />;
    case "achievements":
      return <Award className="text-gray-400" />;
    default:
      return <User className="text-gray-400" />;
  }
}
