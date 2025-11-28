import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Register from "../page/auth/Register";
import App from "../App";
import Auth from "../page/auth/Auth";
import ForgetPassword from "../page/auth/ForgetPassword";
import Destinations from "../page/Destinations";
import PlanTrip from "../page/PlanTrip";
import About from "../page/About";
import SingleDestination from "../page/SingleDestination";
import TripSummaryPage from "../component/TripSummary";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../page/UserDashboard/Dashboard";
import UserDetails from "../page/UserDashboard/UserDetails";
import UserProfile from "../page/UserDashboard/UserProfile";
import ChangeProfile from "../page/UserDashboard/ChangeProfile";
import AdminDestination from "../page/AdminsDashboard/AdminDestination";
import AdminDash from "../page/AdminsDashboard/AdminDash";
import AddCategory from "../page/AdminsDashboard/AddCategory";
import AuthModal from "../page/auth/AuthModal";
import AdminLogin from "../page/auth/AdminLogin";
import AdminDashboard from "../page/AdminsDashboard/AdminDashboard";
import AdminGuide from "../page/AdminsDashboard/AdminGuide";
import AdminLayout from "../component/AdminLayout";
import AdminUsers from "../page/AdminsDashboard/AdminUsers";
import { useNavigate } from "react-router-dom";
import BookingHistory from "../page/UserDashboard/BookingHistory";
import BookingConfirmed from "../page/BookingConfirmed";
import PaymentSuccess from "../page/UserDashboard/PaymentSuccess";

function MyRoutes() {
  const Navigate = useNavigate();

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="/tripsummary/:tripId" element={<TripSummaryPage />} />
          <Route path="plantrip" element={<PlanTrip />} />
          <Route path="/destination/:id" element={<SingleDestination />} />
          <Route
            path="/booking-success/:bookingId"
            element={<BookingConfirmed />}
          />
          <Route path="payment-success" element={<PaymentSuccess />} />

          {/* User Dashboard Routes (protected) */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="userdetails" element={<UserDetails />} />
              <Route path="changepassword" element={<UserProfile />} />
              <Route path="updateprofile" element={<ChangeProfile />} />
              <Route path="bookinghistory" element={<BookingHistory />} />
              
            </Route>
          </Route>

          {/* Auth Routes */}
          <Route element={<Auth />}>
            <Route path="authmodal" element={<AuthModal />} />
            <Route path="register" element={<Register />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
          </Route>
        </Route>
        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/admindashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="admindash" element={<AdminDash />} />
            <Route path="admindestination" element={<AdminDestination />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="adminguide" element={<AdminGuide />} />
            <Route path="adminusers" element={<AdminUsers />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default MyRoutes;
