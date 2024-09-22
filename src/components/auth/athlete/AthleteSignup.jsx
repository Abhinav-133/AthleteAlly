"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, Phone, User, Calendar, Link } from "lucide-react";
import { Button, TextField, Typography, Alert, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig"; // Ensure db is initialized in firebaseConfig

const AthleteSignUp = () => {
  const [step, setStep] = useState(1); // To track the form step
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    district: "",
    state: "",
    email: "",
    password: "",
    gender: "",
    sport: "",
    experience: "",
    contactNo: "",
    adharCard: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const navigate = useNavigate();

  const handleNext = (event) => {
    event.preventDefault();
    setError(null);
    // Add validation if necessary for step 1 before proceeding to step 2
    if (
      formData.name &&
      formData.age &&
      formData.dob &&
      formData.district &&
      formData.state &&
      formData.email &&
      formData.password
    ) {
      setStep(2);
    } else {
      setError("Please fill in all the required fields.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Save user details to Firestore using the user's UID as the document ID
      await setDoc(doc(db, "athletes", user.uid), {
        name: formData.name,
        age: formData.age,
        dob: formData.dob,
        district: formData.district,
        state: formData.state,
        email: formData.email,
        gender: formData.gender,
        sport: formData.sport,
        experience: formData.experience,
        contactNo: formData.contactNo,
        adharCard: formData.adharCard,
        createdAt: new Date().toISOString(),
      });

      console.log("User signed up and details saved:", user);

      navigate("/athlete-dashboard");
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError('Failed to sign up. Please check your details.');
      }
      console.error("Sign-up or Firestore error:", err.message);
    }
     finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 flex flex-col justify-center items-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          {step === 1 ? "Sign Up: Basic Info" : "Sign Up: Additional Info"}
        </motion.h1>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Alert
              severity="error"
              className="text-white bg-red-600 border-red-700"
            >
              {error}
            </Alert>
          </motion.div>
        )}

        {/* Form Step 1: Basic Info */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6">
            <TextField
              // label="Name"
              name="name"
              variant="outlined"
              placeholder="Enter your name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <User
                    className="text-gray-400"
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                ),
              }}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              // label="Age"
              name="age"
              variant="outlined"
              placeholder="Enter your age"
              fullWidth
              value={formData.age}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              // label="Date of Birth"
              name="dob"
              variant="outlined"
              type="date"
              fullWidth
              value={formData.dob}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="district"
              variant="outlined"
              placeholder="Enter your district"
              fullWidth
              value={formData.district}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              name="state"
              variant="outlined"
              placeholder="Enter your state"
              fullWidth
              value={formData.state}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              // label="Email"
              name="email"
              variant="outlined"
              placeholder="Enter your email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Mail
                    className="text-gray-400"
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                ),
              }}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              // label="Password"
              name="password"
              variant="outlined"
              type="password"
              placeholder="Enter your password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Lock
                    className="text-gray-400"
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                ),
              }}
              className="bg-gray-700 text-white rounded-lg"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out rounded-lg"
            >
              Next
            </Button>
          </form>
        )}

        {/* Form Step 2: Additional Info */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              value={formData.gender}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              label="Sport"
              name="sport"
              variant="outlined"
              placeholder="Enter your sport"
              fullWidth
              value={formData.sport}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              label="Experience (years)"
              name="experience"
              variant="outlined"
              placeholder="Years of experience"
              fullWidth
              value={formData.experience}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              name="contactNo"
              variant="outlined"
              placeholder="Enter your contact number"
              fullWidth
              value={formData.contactNo}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Phone
                    className="text-gray-400"
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                ),
              }}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              name="adharCard"
              variant="outlined"
              placeholder="Enter your Aadhar Card number"
              fullWidth
              value={formData.adharCard}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
            />
            {/* Add Photo Upload */}
            <div className="flex flex-col items-center space-y-4">
              <Button
                variant="outlined"
                component="label"
                className="w-full py-3 text-lg font-semibold border-dashed border-gray-500 text-gray-400"
              >
                {formData.photo ? "Change Photo" : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  hidden
                  accept="image/*"
                  onChange={handleChange}
                />
              </Button>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              className="py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out rounded-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AthleteSignUp;