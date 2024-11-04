"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import { Mail, Lock } from "lucide-react";
import { auth, db } from "../../../firebaseConfig"; // Ensure correct import of your Firebase config
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function SponsorSignIn() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setAuthError(null); // Clear authentication error on input change
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formValues.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+$/.test(formValues.email))
      newErrors.email = "Invalid email address";
    if (!formValues.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Sign in with Firebase Auth
        const sponsorCredentials = await signInWithEmailAndPassword(
          auth,
          formValues.email,
          formValues.password
        );
        const sponsor = sponsorCredentials.user;
        const sponsorDoc = await getDoc(doc(db, "sponsors", sponsor.uid));

        if (sponsorDoc.exists()) {
          console.log("User exists in athletes collection:", sponsorDoc.data());
          sessionStorage.setItem("sponsorUid", sponsor.uid);
          navigate("/sponsor");
        } else {
          setError("Sponsor not found in sponsors collection.");
          console.log("Sponsor not found in sponsors collection.");
        }
      } catch (err) {
        setAuthError(err.message); // Set authentication error message
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col justify-center items-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 p-8 rounded-lg shadow-xl backdrop-blur-sm"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-6 text-center"
        >
          Sponsor Sign In
        </motion.h1>
        {authError && (
          <Alert severity="error" className="mb-4">
            {authError}
          </Alert>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
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
                startAdornment: <Mail className="mr-2 text-white" size={18} />,
              }}
              InputLabelProps={{
                className: "text-white",
              }}
              className="text-white"
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
                startAdornment: <Lock className="mr-2 text-white" size={18} />,
              }}
              InputLabelProps={{
                className: "text-white",
              }}
              className="text-white"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            className="text-lg py-6 font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={24} className="mr-2 text-white" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-white/80"
        >
          Don’t have an account?{" "}
          <a
            href="/sponsors-signup"
            className="text-orange-300 hover:underline"
          >
            Sign Up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
