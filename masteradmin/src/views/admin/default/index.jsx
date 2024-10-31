import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig"; // Import your Firebase config
import { collection, getDocs, where, Timestamp } from "firebase/firestore"; // Import Firestore functions
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { columnsDataComplex } from "./variables/columnsData";
import Widget from "components/widget/Widget";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  const [athleteCount, setAthleteCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [activeTournamentCount, setActiveTournamentCount] = useState(0);
  const [pastTournamentCount, setPastTournamentCount] = useState(0);
  const [sponsorCount, setSponsorCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0); // New state for registrations

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch athletes count
        const athletesSnapshot = await getDocs(collection(db, "athletes"));
        setAthleteCount(athletesSnapshot.size);

        // Fetch trainers count
        const trainersSnapshot = await getDocs(collection(db, "trainers"));
        setTrainerCount(trainersSnapshot.size);

        // Get the current date
        const currentDate = new Date();

        // Fetch active tournaments count
        const activeTournamentsSnapshot = await getDocs(collection(db, "tournaments"), where("date", ">=", Timestamp.fromDate(currentDate)));
        setActiveTournamentCount(activeTournamentsSnapshot.size);

        // Fetch past tournaments count
        const pastTournamentsSnapshot = await getDocs(collection(db, "tournaments"), where("date", "<", Timestamp.fromDate(currentDate)));
        setPastTournamentCount(pastTournamentsSnapshot.size);

        // Fetch sponsors count
        const sponsorsSnapshot = await getDocs(collection(db, "sponsors"));
        setSponsorCount(sponsorsSnapshot.size);

        const registrationsSnapshot = await getDocs(collection(db, "registrations")); // Assuming you have a "registrations" collection
        setRegistrationCount(registrationsSnapshot.size);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Athletes"}
          subtitle={athleteCount}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Trainers"}
          subtitle={trainerCount}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Active Tournaments"}
          subtitle={activeTournamentCount}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Past Tournaments"}
          subtitle={pastTournamentCount}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sponsors"}
          subtitle={sponsorCount}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Registrations"} // Updated title
          subtitle={athleteCount+trainerCount} // Updated subtitle
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Traffic chart & Pie Chart */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div>
    </div>
  );
};

export default Dashboard;
