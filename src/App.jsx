import "./App.css";
import RegistrationOptions from "./components/auth/RegisterOptions";
import AthleteSignIn from "./components/auth/athlete/AthleteSignin";
import AthleteSignUp from "./components/auth/athlete/AthleteSignup";
import TrainersSignIn from "./components/auth/trainers/TrainersSignIn";
import TrainersSignUp from "./components/auth/trainers/TrainersSignUp";
import SponsorSignIn from "./components/auth/sponsors/SponsorSignIn";

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
import Sponsor from "./pages/Sponsor/Sponsor";
import SponsorUpcomingEvents from "./pages/Sponsor/UpcomingEvents";
import SponsorAthletes from "./pages/Sponsor/Athletes";
import SponsorTeams from "./pages/Sponsor/Teams";
import SponsorEngagement from "./pages/Sponsor/Engagement";
import TrainersPage from "./Trainer/Dashboard";
import TrainerProfilePage from "./Trainer/TrainerProfile";
import AthletesListPage from "./Trainer/atheletesl";
import CommunityPage from "./Trainer/communitytrainer";
import SponsorSignup from "./components/auth/sponsors/SponsorSignUp";
import { UserProvider } from "./UserContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register-options" element={<RegistrationOptions />} />
      <Route path="/athlete-login" element={<AthleteSignIn />} />
      <Route path="/athlete-signup" element={<AthleteSignUp />} />
      <Route path="/athlete-dashboard" element={<Dashboard />}>
        <Route path="/athlete-dashboard" element={<Index />} />
        <Route path="/athlete-dashboard/profile" element={<AthleteProfile />} />
        <Route path="/athlete-dashboard/sportsgear" element={<SportsGear />} />
        <Route
          path="/athlete-dashboard/tournaments"
          element={<Tournaments />}
        />
        <Route path="/athlete-dashboard/jobs" element={<JobPortal />} />
        <Route path="/athlete-dashboard/news" element={<LatestNews />} />
      </Route>
      <Route path="/trainer-login" element={<TrainersSignIn />} />
      <Route path="/trainer-signup" element={<TrainersSignUp />} />
      <Route path="/sponsor" element={<Sponsor />} />
      <Route
        path="/sponsor/upcoming-events"
        element={<SponsorUpcomingEvents />}
      />
      <Route path="/sponsor/athletes" element={<SponsorAthletes />} />
      <Route path="/sponsor/teams" element={<SponsorTeams />} />
      <Route path="/sponsor/engagement" element={<SponsorEngagement />} />
      <Route path="/trainers-dashboard" element={<TrainersPage />} />
      <Route path="/trainers/athletes" element={<AthletesListPage />} />
      <Route path="/trainers/sportsgear" element={<SportsGear />} />
      <Route path="/trainers/tournaments" element={<Tournaments />} />
      <Route path="/trainers/jobportal" element={<JobPortal />} />
      <Route path="/trainers/latestnews" element={<LatestNews />} />
      <Route path="/trainers/community" element={<CommunityPage />} />
      <Route path="/trainers/profile" element={<TrainerProfilePage />} />
      <Route path="/sponsors-login" element={<SponsorSignIn />} />
      <Route path="/sponsors-signup" element={<SponsorSignup />} />
    </>
  )
);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
