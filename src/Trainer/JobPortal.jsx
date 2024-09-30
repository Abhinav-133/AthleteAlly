'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Briefcase, MapPin, Calendar, IndianRupee } from 'lucide-react'

const jobListings = [
  { id: 1, title: "Cricket Coach", sport: "Cricket", type: "Full-time", location: "Mumbai, Maharashtra", salary: "₹50,000 - ₹80,000 per month", postedDate: "2023-07-01", description: "We are seeking an experienced cricket coach to train our youth team and develop future talent." },
  { id: 2, title: "Fitness Trainer", sport: "Multiple", type: "Part-time", location: "Delhi, Delhi", salary: "₹300 - ₹500 per hour", postedDate: "2023-07-05", description: "Join our gym as a part-time fitness trainer to help athletes achieve their fitness goals." },
  { id: 3, title: "Badminton Player", sport: "Badminton", type: "Full-time", location: "Hyderabad, Telangana", salary: "₹3,00,000 - ₹5,00,000 per annum", postedDate: "2023-07-02", description: "Professional badminton player needed for our club team to compete in national tournaments." },
  { id: 4, title: "Sports Physiotherapist", sport: "Multiple", type: "Full-time", location: "Bengaluru, Karnataka", salary: "₹40,000 - ₹60,000 per month", postedDate: "2023-07-07", description: "Looking for a qualified sports physiotherapist to join our multi-sport facility." },
  { id: 5, title: "Kabaddi Referee", sport: "Kabaddi", type: "Contract", location: "Multiple Cities", salary: "₹5,000 - ₹10,000 per match", postedDate: "2023-07-03", description: "Experienced Kabaddi referees needed for upcoming tournament season." },
  { id: 6, title: "Swimming Instructor", sport: "Swimming", type: "Part-time", location: "Pune, Maharashtra", salary: "₹400 - ₹600 per hour", postedDate: "2023-07-06", description: "Teach swimming to beginners and advanced learners at our state-of-the-art aquatic center." },
]

const sports = ["All", "Cricket", "Badminton", "Kabaddi", "Swimming", "Multiple"]
const jobTypes = ["All", "Full-time", "Part-time", "Contract"]
const locations = ["All", "Mumbai", "Delhi", "Hyderabad", "Bengaluru", "Pune", "Multiple Cities"]

const Badge = ({ children, className }) => {
  return (
    <span className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-full ${className}`}>
      {children}
    </span>
  );
};

export default function JobPortal() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSport, setSelectedSport] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")

  const filteredJobs = jobListings.filter(job => 
    (selectedSport === "All" || job.sport === selectedSport) &&
    (selectedType === "All" || job.type === selectedType) &&
    (selectedLocation === "All" || job.location.includes(selectedLocation)) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-600 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Sports Job Portal</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/10 text-white border-white/20 pl-10 py-2 rounded"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <select onChange={(e) => setSelectedSport(e.target.value)} className="w-[140px] bg-white/10 text-white border-white/20 rounded">
            <option value="All">Sport</option>
            {sports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
          
          <select onChange={(e) => setSelectedType(e.target.value)} className="w-[140px] bg-white/10 text-white border-white/20 rounded">
            <option value="All">Job Type</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select onChange={(e) => setSelectedLocation(e.target.value)} className="w-[140px] bg-white/10 text-white border-white/20 rounded">
            <option value="All">Location</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-center text-white/60 mt-8">No jobs found matching your criteria.</p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-800 text-white border-gray-700 p-6 rounded">
                <div className="mb-2">
                  <h2 className="text-xl">{job.title}</h2>
                  <Badge className="bg-orange-500 text-white">{job.sport}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4 text-white/60" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-white/60" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="mr-2 h-4 w-4 text-white/60" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-white/60" />
                    <span>Posted on: {new Date(job.postedDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <p className="text-sm text-white/80 mt-2">{job.description}</p>
                </div>
                <div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white mt-4">Apply Now</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}