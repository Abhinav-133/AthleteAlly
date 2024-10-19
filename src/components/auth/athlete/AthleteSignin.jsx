import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock } from 'lucide-react'
import { Button, TextField, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { auth, db } from '../../../firebaseConfig'; // Make sure to import your Firebase configuration
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'


const AthleteSignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Check if user exists in the athletes collection
      const userDoc = await getDoc(doc(db, 'athletes', user.uid))

      if (userDoc.exists()) {
        console.log('User exists in athletes collection:', userDoc.data())
        
        // Store the user UID in sessionStorage
        sessionStorage.setItem('userUid', user.uid)
        navigate('/athlete-dashboard') // Navigate to the dashboard
      } else {
        setError('User not found in athletes collection.')
        console.log('User not found in athletes collection.')
      }
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.')
      console.error('Sign-in error:', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col justify-center items-center p-4 sm:p-8">
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
          Sign In as Athlete
        </motion.h1>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Alert severity="error" className="text-white bg-red-600 border-red-700">
              {error}
            </Alert>
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Mail className="text-gray-400" size={20} style={{ marginRight: 10 }} />
                ),
              }}
              className="bg-gray-700 text-white rounded-lg"
              InputLabelProps={{ className: "text-white" }}
            />
          </div>
          <div className="relative">
            <TextField
              variant="outlined"
              type="password"
              placeholder="Enter your password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Lock className="text-gray-400" size={20} style={{ marginRight: 10 }} />
                ),
              }}
              className="bg-gray-700 text-white rounded-lg"
              InputLabelProps={{ className: "text-white" }}
            />
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
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-gray-400 space-y-2"
        >
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link to="/athlete-signup">
              <a href="/athlete-signup" className="text-blue-400 hover:underline">
                Sign Up
              </a>
            </Link>
          </Typography>

        </motion.div>
      </motion.div>
    </div>
  )
}

export default AthleteSignIn
