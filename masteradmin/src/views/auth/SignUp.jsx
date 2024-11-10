import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import InputField from "components/fields/InputField";
import { auth, db } from "../../firebaseConfig";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      console.log(email);
      console.log(password);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "masteradmin", userId), {
        email,
      });

      setSuccessMessage("Admin account created successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setError("Error during sign-up: " + err.message);
    }
  };

  return (
    <div className="flex h-screen items-center px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h4 className="text-4xl font-bold text-center text-navy-700 dark:text-white mb-6">
          Sign Up
        </h4>
        <p className="text-gray-600 text-center mb-8">
          Create an admin account!
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email*
          </label>
          <input
            variant="auth"
            id="email"
            type="email"
            placeholder="mail@simmmple.com"
            value={email}
            onChange={(e) => {
              console.log("Email input changed:", e.target.value);
              setEmail(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password*
          </label>
          <input
            variant="auth"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              console.log("Password input changed:", e.target.value);
              setPassword(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Date of Birth Input */}
        <div className="mb-6">
          <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
            Date of Birth*
          </label>
          <InputField
            variant="auth"
            extra="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            label="Date of Birth*"
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        {/* Success Message */}
        {successMessage && (
          <p className="text-sm text-green-500 mb-4">{successMessage}</p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSignUp}
          className="w-full py-2 bg-brand-500 text-white font-semibold rounded-md shadow-sm hover:bg-brand-600 active:bg-brand-700 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
