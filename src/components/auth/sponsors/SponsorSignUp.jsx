"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, CircularProgress } from "@mui/material";
import { User, Building, Mail, Phone, Globe, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export default function SponsorSignup() {
  const [formValues, setFormValues] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formValues.companyName) newErrors.companyName = "Company name is required";
    if (!formValues.contactPerson) newErrors.contactPerson = "Contact person is required";
    if (!formValues.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) newErrors.email = "Invalid email format";
    if (!formValues.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formValues.phone)) newErrors.phone = "Phone number must be 10 digits";
    if (!formValues.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({}); // Reset errors

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );

      const user = userCredential.user;

      // Save user details to Firestore using the user's UID as the document ID
      await setDoc(doc(db, "sponsors", user.uid), {
        companyName: formValues.companyName,
        contactPerson: formValues.contactPerson,
        email: formValues.email,
        phone: formValues.phone,
        website: formValues.website,
        createdAt: new Date().toISOString(),
      });

      console.log("User signed up and details saved:", user);
      navigate("/sponsor");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrors((prevErrors) => ({ ...prevErrors, email: "This email is already registered." }));
      } else if (err.code === "auth/weak-password") {
        setErrors((prevErrors) => ({ ...prevErrors, password: "Password is too weak. Please use a stronger password." }));
      } else if (err.code === "auth/invalid-email") {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email format." }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, general: "Failed to sign up. Please check your details." }));
      }
      console.error("Sign-up or Firestore error:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col justify-center items-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/10 p-8 rounded-lg shadow-xl backdrop-blur-sm"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-6 text-center"
        >
          Sponsor Sign Up
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TextField
                placeholder="Company Name"
                name="companyName"
                value={formValues.companyName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.companyName}
                helperText={errors.companyName}
                InputProps={{
                  startAdornment: <Building className="mr-2" size={18} />,
                }}
              />
            </div>
            <div>
              <TextField
                placeholder="Contact Person"
                name="contactPerson"
                value={formValues.contactPerson}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.contactPerson}
                helperText={errors.contactPerson}
                InputProps={{
                  startAdornment: <User className="mr-2" size={18} />,
                }}
              />
            </div>
            <div>
              <TextField
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: <Mail className="mr-2" size={18} />,
                }}
              />
            </div>
            <div>
              <TextField
                placeholder="Phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: <Phone className="mr-2" size={18} />,
                }}
              />
            </div>
            <div>
              <TextField
                placeholder="Website"
                name="website"
                value={formValues.website}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <Globe className="mr-2" size={18} />,
                }}
              />
            </div>
            <div>
              <TextField
                placeholder="Password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: <Lock className="mr-2" size={18} />,
                }}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            className="text-lg py-6 font-semibold rounded-lg"
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={24} className="mr-2" />
                Submitting...
              </>
            ) : (
              "Sign Up as Sponsor"
            )}
          </Button>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-white/80"
        >
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-orange-300 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-orange-300 hover:underline">
            Privacy Policy
          </a>
        </motion.p>
        {errors.general && (
          <p className="text-red-500 text-center mt-4">{errors.general}</p>
        )}
      </motion.div>
    </div>
  );
}
