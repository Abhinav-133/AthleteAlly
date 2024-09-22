'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, Dumbbell, Award, Edit2, Save, X } from 'lucide-react'

const athleteData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  dob: "1990-01-01",
  address: "123 Sports St, Athleteville, AT 12345",
  sport: "Swimming",
  experience: 10,
  achievements: "Olympic Gold Medalist 2020, World Champion 2019",
  bio: "Passionate swimmer with a decade of competitive experience. Dedicated to pushing the boundaries of human potential in aquatics.",
}

export default function AthleteProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(athleteData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setIsEditing(false)
    // Here you would typically send the updated data to your backend
  }

  const MotionCard = motion.div

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
                {Object.keys(athleteData).map((key) => (
                  <div key={key} className={`form-group`}>
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
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </button>
                <button type="button" className="border border-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={() => setIsEditing(false)}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <span className={`mr-3 h-4 w-4 text-blue-400`}>
                    {key === 'name' && <User />}
                    {key === 'email' && <Mail />}
                    {key === 'phone' && <Phone />}
                    {key === 'address' && <MapPin />}
                    {key === 'dob' && <Calendar />}
                    {key === 'sport' && <Dumbbell />}
                    {key === 'achievements' && <Award />}
                  </span>
                  <span className="ml-2">{value}</span>
                </div>
              ))}
            </div>
          )}
          {!isEditing && (
            <button type="button" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={() => setIsEditing(true)}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
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
              <span className="text-3xl">{athleteData.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(athleteData).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <span className={`mr-3 h-4 w-4 text-blue-400`}>
                  {key === 'name' && <User />}
                  {key === 'email' && <Mail />}
                  {key === 'phone' && <Phone />}
                  {key === 'address' && <MapPin />}
                  {key === 'dob' && <Calendar />}
                  {key === 'sport' && <Dumbbell />}
                  {key === 'achievements' && <Award />}
                </span>
                <span className="ml-2">{value}</span>
              </div>
            ))}
          </div>
        </MotionCard>
      </div>
    </div>
  )
}
