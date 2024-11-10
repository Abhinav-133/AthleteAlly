"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Mail,
  Lock,
  Phone,
  User,
  Calendar,
  MapPin,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { Button, TextField, Typography, Alert, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TrainersSignUp = () => {
  const [step, setStep] = useState(1);
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
    bio: "",
    valid: false,
    id: "",
    certification: null,
    trainerID:""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 5 * 1024 * 1024
    ) {
      // 5MB limit
      setFormData({ ...formData, certification: file });
    } else {
      setError("Please upload a valid PDF file under 5MB.");
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    setError(null);

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      let certificationURL = "";
      if (formData.certification) {
        const certificationRef = ref(
          storage,
          `trainers/${user.uid}/certification.pdf`
        );
        await uploadBytes(certificationRef, formData.certification);
        certificationURL = await getDownloadURL(certificationRef);
      }

      const generateFixedLengthId = () => {
        const namePart = formData.name.slice(0, 3).padEnd(3, "X").toUpperCase();
        const dobPart = formData.dob.replace(/-/g, "").slice(2, 8);
        const randomPart = Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase();
        return `${namePart}${dobPart}${randomPart}`;
      };

      await setDoc(doc(db, "trainers", user.uid), {
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
        bio: formData.bio,
        resume: formData.resume ? formData.resume.name : "",
        valid: formData.valid,
        createdAt: new Date().toISOString(),
        id: generateFixedLengthId(),
        certificationURL: certificationURL,
        trainerID:generateFixedLengthId()
      });

      navigate("/trainer-login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Failed to sign up. Please check your details.");
      }
    } finally {
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
        className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700"
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

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <TextField
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
                name="age"
                variant="outlined"
                placeholder="Enter your age"
                fullWidth
                value={formData.age}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <BadgeCheck
                      className="text-gray-400"
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                  ),
                }}
                className="bg-gray-700 text-white rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <TextField
                name="dob"
                variant="outlined"
                type="date"
                fullWidth
                value={formData.dob}
                onChange={handleChange}
                className="bg-gray-700 text-white rounded-lg"
                InputProps={{
                  startAdornment: (
                    <Calendar
                      className="text-gray-400"
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                  ),
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="district"
                variant="outlined"
                placeholder="Enter your district"
                fullWidth
                value={formData.district}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <MapPin
                      className="text-gray-400"
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                  ),
                }}
                className="bg-gray-700 text-white rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <TextField
                name="state"
                variant="outlined"
                placeholder="Enter your state"
                fullWidth
                value={formData.state}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <MapPin
                      className="text-gray-400"
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                  ),
                }}
                className="bg-gray-700 text-white rounded-lg"
              />
              <TextField
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
            </div>
            <div className="grid grid-cols-2 gap-6">
              <TextField
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
            </div>
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

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <TextField
                select
                label="Gender"
                name="gender"
                fullWidth
                value={formData.gender}
                onChange={handleChange}
                className="bg-gray-700 text-white rounded-lg"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <TextField
                name="sport"
                variant="outlined"
                placeholder="Enter your sport"
                fullWidth
                value={formData.sport}
                onChange={handleChange}
                className="bg-gray-700 text-white rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <TextField
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
                placeholder="Enter contact number"
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
            </div>
            <TextField
              name="adharCard"
              variant="outlined"
              placeholder="Enter Aadhar card number"
              fullWidth
              value={formData.adharCard}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <FileText
                    className="text-gray-400"
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                ),
              }}
              className="bg-gray-700 text-white rounded-lg"
            />
            <TextField
              name="bio"
              variant="outlined"
              placeholder="Tell us something about yourself"
              fullWidth
              value={formData.bio}
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg"
            />
            <div>
              <Typography variant="body1" className="text-white mb-2">
                Upload Certification (PDF only)
              </Typography>
              <TextField
                type="file"
                fullWidth
                onChange={handleFileChange}
                inputProps={{ accept: "application/pdf" }}
                className="bg-gray-700 text-white rounded-lg"
              />
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={() => setStep(1)}
                variant="contained"
                color="secondary"
                className="py-2 px-6 bg-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out rounded-lg"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                className="py-2 px-6 bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out rounded-lg"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default TrainersSignUp;
