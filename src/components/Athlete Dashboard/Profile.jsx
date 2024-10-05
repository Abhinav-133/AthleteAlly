'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, Dumbbell, Award } from 'lucide-react'
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"

export default function AthleteProfile() {
  const [isEditing, setIsEditing] = useState(false)
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
    gender: ""
  })
  const db = getFirestore(); // Initialize Firestore here

  // Fetch user data when component mounts
  useEffect(() => {
    const getUserData = async () => {
      // Retrieve userUid from sessionStorage
      const userUid = sessionStorage.getItem("userUid");
      if (userUid) {
        const data = await fetchUserData(userUid, db);
        setFormData(data); // Set fetched data directly into formData
      }
    };
    getUserData();
  }, [db]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsEditing(false)

    // Update the data in Firestore
    try {
      const userUid = sessionStorage.getItem("userUid");
      const userDocRef = doc(db, "athletes", userUid);
      await updateDoc(userDocRef, formData);
      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }

  // Fetch user data from Firestore
  const fetchUserData = async (userId, db) => {
    try {
      const userDocRef = doc(db, "athletes", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData;
      } else {
        console.log("No such user document found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const MotionCard = motion.div
  
  // Define the order of fields to be displayed
  const displayOrder = [
    'name',
    'email',
    'phone',
    'dob',
    'sport',
    'experience',
    'gender',
    'state',
    'bio'
  ];

  return (
    <div className="min-h-screen bg-white text-white p-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <p>Manage your personal details</p>
          <br />
          {isEditing ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayOrder.map((key) => (
                  <div key={key} className="form-group">
                    <label className="block text-sm font-medium mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      type={key === 'dob' ? 'date' : 'text'}
                      className="block w-full bg-gray-700 text-white border-gray-600 rounded-md p-2"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                  Save Changes
                </button>
                <button type="button" className="border border-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {displayOrder.map((key) => (
                <div key={key} className="flex items-center">
                  <span className="mr-3 h-4 w-4 text-blue-400">
                    {key === 'name' && <User />}
                    {key === 'email' && <Mail />}
                    {key === 'phone' && <Phone />}
                    {key === 'dob' && <Calendar />}
                    {key === 'state' && <MapPin />}
                    {key === 'sport' && <Dumbbell />}
                    {key === 'experience' && <Dumbbell />}
                    {key === 'gender' && <User />}
                    {key === 'bio' && <Award />}
                  </span>
                  <span className="ml-2">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {formData[key]}
                  </span>
                </div>
              ))}
            </div>
          )}
          <br />
          {!isEditing && (
            <button type="button" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold">Profile Summary</h2>
          <br />
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">{formData.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          </div>
          <div className="space-y-4">
            {displayOrder.map((key) => (
              <div key={key} className="flex items-center">
                <span className="mr-3 h-4 w-4 text-blue-400">
                  {key === 'name' && <User />}
                  {key === 'email' && <Mail />}
                  {key === 'phone' && <Phone />}
                  {key === 'dob' && <Calendar />}
                  {key === 'state' && <MapPin />}
                  {key === 'sport' && <Dumbbell />}
                  {key === 'experience' && <Dumbbell />}
                  {key === 'gender' && <User />}
                  {key === 'bio' && <Award />}
                </span>
                <span className="ml-2">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {formData[key]}
                </span>
              </div>
            ))}
          </div>
        </MotionCard>
      </div>
    </div>
  )
}
