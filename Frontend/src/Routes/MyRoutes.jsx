import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Register from "../page/auth/Register";
import LoginModal from "../page/auth/LoginModal";
import App from "../App";
import Auth from "../page/auth/Auth";
import ForgetPassword from "../page/auth/ForgetPassword";
import Destinations from "../page/Destinations";
import PlanTrip from "../page/PlanTrip";
import About from "../page/About";
import SingleDestination from "../page/SingleDestination";
import TripSummaryPage from "../component/TripSummary";
import { ToastContainer } from "react-toastify";
import AdminDash from "../page/AdminDash";

function MyRoutes() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Destinations" element={<Destinations />} />
          <Route path="tripsummary" element={<TripSummaryPage />} />
          <Route path="Plantrip" element={<PlanTrip />} />
          <Route path="/Destination/:id" element={<SingleDestination />} />

          <Route element={<Auth />}>
            <Route path="loginModal" element={<LoginModal />} />
            <Route path="register" element={<Register />} />
            <Route path="ForgetPassword" element={<ForgetPassword />} />
          </Route>
        </Route>

        <Route element={<AdminDash />}>
          <Route path="admindash" element={<AdminDash />} />
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
