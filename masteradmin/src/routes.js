import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import Tournaments from "views/admin/tournaments";
import AddTournament from "views/admin/addTournament";
import Athletes from "views/admin/athletes";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdBarChart,
  MdLock,
  MdGroup,
  MdEvent,
  MdPersonAdd,
  MdBusinessCenter,
} from "react-icons/md";

import { TbTournament } from "react-icons/tb";
import Trainers from "views/admin/trainers";
import Sponsors from "views/admin/sponsors";
import SignUp from "views/auth/SignUp";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  {
    name: "Tournaments",
    layout: "/admin",
    icon: <TbTournament className="h-6 w-6" />,
    path: "tournaments",
    component: <Tournaments />,
  },
  {
    name: "Add Tournament",
    layout: "/admin",
    icon: <MdEvent className="h-6 w-6" />,
    path: "add-tournament",
    component: <AddTournament />,
  },
  {
    name: "Athletes",
    layout: "/admin",
    icon: <MdGroup className="h-6 w-6" />,
    path: "athletes",
    component: <Athletes />,
  },
  {
    name: "Trainers",
    layout: "/admin",
    icon: <MdPersonAdd className="h-6 w-6" />,
    path: "trainers",
    component: <Trainers/>,
  },
  {
    name: "Sponsors",
    layout: "/admin",
    icon: <MdBusinessCenter className="h-6 w-6" />,
    path: "sponsors",
    component: <Sponsors/>,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];

export default routes;
