import "./App.css";
import RegistrationOptions from "./components/auth/RegisterOptions";
import SignIn from "./components/auth/athlete/Signin";

import HomePage from "./Homepage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/Athelete Dashboard/Dashboard";
import SignUp from "./components/auth/athlete/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<HomePage />} />
      <Route path="/register-options" element={<RegistrationOptions />} />
      <Route path="/athlete-login" element={<SignIn/>}/>
      <Route path="/athlete-signup" element={<SignUp/>}/>
      <Route path="/athlete-dashboard" element={<Dashboard/>}/>
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
