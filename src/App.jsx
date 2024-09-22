import "./App.css";
import RegistrationOptions from "./components/auth/RegisterOptions";
import AthleteSignIn from "./components/auth/athlete/AthleteSignin";
import AthleteSignUp from "./components/auth/athlete/AthleteSignup";
import TrainersSignIn from "./components/auth/trainers/TrainersSignIn";
import TrainersSignUp from "./components/auth/trainers/TrainersSignUp";

import HomePage from "./Homepage";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/Athlete Dashboard/Dashboard";
import Index from "./components/Athlete Dashboard";
import AthleteProfile from "./components/Athlete Dashboard/Profile";
import SportsGear from "./components/Athlete Dashboard/SportsGear";
import Tournaments from "./components/Athlete Dashboard/Tournaments";
import JobPortal from "./components/Athlete Dashboard/JobPortal";
import LatestNews from "./components/Athlete Dashboard/LatestNews";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/home"/>}/>
      <Route path="/home" element={<HomePage />} />
      <Route path="/register-options" element={<RegistrationOptions />} />
      <Route path="/athlete-login" element={<AthleteSignIn />} />
      <Route path="/athlete-signup" element={<AthleteSignUp />} />
      <Route path="/athlete-dashboard" element={<Dashboard />} >
      <Route path="/athlete-dashboard" element={<Index/>}/>
      <Route path="/athlete-dashboard/profile" element={<AthleteProfile/>}/>
      <Route path="/athlete-dashboard/sportsgear" element={<SportsGear/>}/>
      <Route path="/athlete-dashboard/tournaments" element={<Tournaments/>}/>
      <Route path="/athlete-dashboard/jobs" element={<JobPortal/>}/>
      <Route path="/athlete-dashboard/news" element={<LatestNews/>}/>
      </Route>
      <Route path="/trainer-login" element={<TrainersSignIn />} />
      <Route path="/trainer-signup" element={<TrainersSignUp />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
