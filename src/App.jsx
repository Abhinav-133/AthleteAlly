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

// import Tournament from "./Trainer/Tournaments";
import SingleTournament from "./components/SingleTournament";
import AthleteTournaments from "./components/Athlete Dashboard/AthleteTournaments";
import TeamRegisterPage from "./components/Athlete Dashboard/TeamRegisterPage";
import AllTrainers from "./components/Athlete Dashboard/TrainersPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register-options" element={<RegistrationOptions />} />
      {/* Athletes */}
      <Route path="/athlete-login" element={<AthleteSignIn />} />
      <Route path="/athlete-signup" element={<AthleteSignUp />} />
      <Route path="/athlete-dashboard" element={<Dashboard />}>
        <Route path="/athlete-dashboard" element={<Index />} />
        <Route path="/athlete-dashboard/profile" element={<AthleteProfile />} />
        <Route path="/athlete-dashboard/sportsgear" element={<SportsGear />} />
        <Route
          path="/athlete-dashboard/mytournaments"
          element={<AthleteTournaments />}
        />
        <Route
          path="/athlete-dashboard/tournaments"
          element={<Tournaments />}
        />
        <Route path="/athlete-dashboard/jobs" element={<JobPortal />} />
        <Route path="/athlete-dashboard/news" element={<LatestNews />} />
        <Route
          path="/athlete-dashboard/alltrainers"
          element={<AllTrainers />}
        />
      </Route>
      <Route path="/tournament" element={<SingleTournament />} />
      <Route path="/team-register" element={<TeamRegisterPage />} />

      {/* Trainers */}
      <Route path="/trainer-login" element={<TrainersSignIn />} />
      <Route path="/trainer-signup" element={<TrainersSignUp />} />
      <Route path="/trainers-dashboard" element={<TrainersPage />}>
        <Route
          path="/trainers-dashboard/athletes"
          element={<AthletesListPage />}
        />
        <Route
          path="/trainers-dashboard/tournaments"
          element={<Tournaments />}
        />
        <Route
          path="/trainers-dashboard/community"
          element={<CommunityPage />}
        />
        <Route
          path="/trainers-dashboard/profile"
          element={<TrainerProfilePage />}
        />
      </Route>

      {/* Sponsors */}
      <Route path="/sponsor" element={<Sponsor />} />
      <Route
        path="/sponsor/upcoming-events"
        element={<SponsorUpcomingEvents />}
      />
      <Route path="/sponsor/athletes" element={<SponsorAthletes />} />
      <Route path="/sponsor/teams" element={<SponsorTeams />} />
      <Route path="/sponsor/engagement" element={<SponsorEngagement />} />
      <Route path="/sponsors-login" element={<SponsorSignIn />} />
      <Route path="/sponsors-signup" element={<SponsorSignup />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
