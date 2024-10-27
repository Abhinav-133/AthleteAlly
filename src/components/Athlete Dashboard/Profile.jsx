'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Dumbbell, Award } from 'lucide-react';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default function AthleteProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    state: "",
    sport: "",
    achievements: "",
    bio: "",
    experience: "",
    gender: "",
    id:""
  });
  const db = getFirestore();

  useEffect(() => {
    const getUserData = async () => {
      const userUid = sessionStorage.getItem("userUid");
      if (userUid) {
        const data = await fetchUserData(userUid, db);
        setFormData(data);
      }
    };
    getUserData();
  }, [db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      const userUid = sessionStorage.getItem("userUid");
      const userDocRef = doc(db, "athletes", userUid);
      await updateDoc(userDocRef, formData);
      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }

  const fetchUserData = async (userId, db) => {
    try {
      const userDocRef = doc(db, "athletes", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log("No such user document found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const displayOrder = ['name', 'email', 'phone', 'dob', 'sport', 'experience', 'gender', 'state', 'bio'];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-10">
      <h1 className="text-5xl font-semibold mb-8 text-center text-gray-700">Athlete Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProfileSection 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          formData={formData} 
          handleChange={handleChange} 
          onSubmit={onSubmit} 
          displayOrder={displayOrder} 
        />
        <SummarySection formData={formData} displayOrder={displayOrder} />
        <AdditionalSections />
      </div>
    </div>
  );
}

// Profile information form component
function ProfileSection({ isEditing, setIsEditing, formData, handleChange, onSubmit, displayOrder }) {
  const MotionCard = motion.div;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:col-span-2 bg-white p-8 rounded-lg shadow-xl border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">Personal Information</h2>
      <p className="text-gray-500 mb-6">Manage your personal details</p>
      {isEditing ? (
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayOrder.map((key) => (
              <div key={key} className="form-group">
                <label className="block text-sm font-medium mb-2 text-gray-500">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  type={key === 'dob' ? 'date' : 'text'}
                  className="block w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md">
              Save Changes
            </button>
            <button type="button" className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-6 rounded-md" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {displayOrder.map((key) => (
            <div key={key} className="flex items-center py-2">
              <IconSelector key={key} />
              <span className="ml-4 text-gray-600">
                <strong className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {formData[key]}
              </span>
            </div>
          ))}
        </div>
      )}
      {!isEditing && (
        <button
          type="button"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      )}
    </MotionCard>
  );
}

// Summary section of profile
function SummarySection({ formData, displayOrder }) {
  const MotionCard = motion.div;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white p-8 rounded-lg shadow-xl border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">Profile Summary</h2>
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-3xl text-blue-600 font-semibold">
          {formData.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <p className="text-gray-500 mb-6 text-center">Athlete ID: <span className="font-semibold text-gray-700">{formData.id}</span></p>
      <div className="space-y-4">
        {displayOrder.map((key) => (
          <div key={key} className="flex items-center py-2">
            <IconSelector key={key} />
            <span className="ml-4 text-gray-600">
              <strong className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {formData[key]}
            </span>
          </div>
        ))}
      </div>
    </MotionCard>
  );
}

// Component for contact info, trainers, and tournaments
function AdditionalSections() {
  return (
    <div className="space-y-8 lg:row-span-1">
      {/* <ContactInfo />
      <Tournaments /> */}
    </div>
  );
}

// Component for Tournaments
function Tournaments() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-600">Your Tournaments</h3>
      <p>Tournament 1 - Date</p>
      <p>Tournament 2 - Date</p>
    </div>
  );
}

// Select icon based on field type
function IconSelector({ key }) {
  switch (key) {
    case 'name': return <User className="text-gray-400" />;
    case 'email': return <Mail className="text-gray-400" />;
    case 'phone': return <Phone className="text-gray-400" />;
    case 'state': return <MapPin className="text-gray-400" />;
    case 'dob': return <Calendar className="text-gray-400" />;
    case 'sport': return <Dumbbell className="text-gray-400" />;
    case 'achievements': return <Award className="text-gray-400" />;
    default: return <User className="text-gray-400" />;
  }
}

