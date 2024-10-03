'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Dumbbell, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'


const OptionCard = ({ icon: Icon, title, description, buttonText,link }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-full"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 h-full flex flex-col shadow-lg rounded-lg">
        <div className="pb-4 px-4 pt-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-4 mx-auto">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center">{title}</h2>
          <p className="text-gray-300 text-center">{description}</p>
        </div>
        <div className="flex-grow flex items-end px-4 pb-6 pt-4">
        <Link to={link} className="w-full">
            <div className="text-center bg-blue-500 hover:bg-blue-600 text-white text-lg py-6 rounded-full transition-all duration-300 transform hover:-translate-y-1">
              {buttonText}
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function RegistrationOptions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col justify-center items-center p-4 sm:p-8">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Join AthleteAlly
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <OptionCard
            icon={User}
            title="Athlete"
            description="Showcase your skills, connect with teams, and advance your sports career."
            buttonText="Register as athlete"
            link="/athlete-login"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <OptionCard
            icon={Dumbbell}
            title="Trainer"
            description="Share your expertise, coach athletes, and build your professional network."
            buttonText="Register as trainer"
            link={"/trainer-login"}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <OptionCard
            icon={Briefcase}
            title="Sponsor"
            description="Support talented athletes, increase brand visibility, and contribute to sports development."
            buttonText="Register as sponsor"
            link={"/sponsors-login"}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
