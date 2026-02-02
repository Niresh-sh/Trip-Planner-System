import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthModal from "../page/auth/AuthModal";

function TripSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const tripData = state?.tripData;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleConfirm = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.warning("You must be logged in to confirm a booking.");
    setShowAuthModal(true);
    return;
  }

  setSubmitting(true);
  setError("");

  try {
   
    const savedTrip = await axios.post(
      "http://localhost:3000/api/trip/createtrip",
      tripData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Trip created:", savedTrip.data);

    
    const completeBookingPayload = {
      tripId: savedTrip.data._id,
      destinationId: tripData.selectedDestination._id,
      persons: tripData.persons,
      startDate: tripData.startDate,
      totalCost: tripData.totalCost,
      contact: tripData.contactInfo,
      guideIncluded: tripData.guideIncluded,
      guideFee: tripData.guideFee,
    };

    localStorage.setItem(
      "PENDING_BOOKING_DATA",
      JSON.stringify(completeBookingPayload)
    );

   
    const paymentResponse = await axios.post(
      "http://localhost:3000/api/payment/process",
      {
        destinationId: tripData.selectedDestination._id,
        firstName: tripData.contactInfo.name.split(" ")[0],
        lastName: tripData.contactInfo.name.split(" ")[1] || "",
        email: tripData.contactInfo.email,
        phone: tripData.contactInfo.phone,
        totalCost: tripData.totalCost,
        guideCost: tripData.guideFee || 0,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { payment_url } = paymentResponse.data;

    if (!payment_url) {
      toast.error("Failed to initialize payment.");
      return;
    }

   
    window.location.href = payment_url;

    
  } catch (err) {
    console.error("Booking error:", err);
    const message = err?.response?.data?.message || "Booking failed.";
    setError(message);
    toast.error(message);
  } finally {
    setSubmitting(false);
  }
};

  if (!tripData)
    return <p className="text-center mt-10">No trip data available.</p>;

  const cover =
    tripData?.selectedDestination?.image ||
    "/public/placeholder-destination.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-emerald-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Trip Summary
          </h1>
          <p className="text-white/90 text-sm mt-1">
            Review your trip details and confirm your booking.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          {/* Destination Card */}
          <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-center mb-6">
            <div className="md:w-56">
              <img
                src={cover}
                alt={tripData.selectedDestination.title}
                className="w-full h-40 md:h-36 object-cover rounded-xl shadow-sm"
              />
            </div>
            <div className="flex-1 bg-gray-50 border rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold text-gray-800">
                {tripData.selectedDestination.title}
              </h2>
              <p className="text-sm text-gray-600">
                {tripData.selectedDestination.location}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {tripData.duration}
              </p>
            </div>
            <div className="md:w-40">
              <div className="h-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-center">
                <p className="text-emerald-700 font-semibold">
                  ₹{tripData.selectedDestination.cost}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trip Details */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">
                Trip Details
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Start Date:</span>{" "}
                  <span className="font-medium">{tripData.startDate}</span>
                </p>
                <p>
                  <span className="text-gray-500">Persons:</span>{" "}
                  <span className="font-medium">{tripData.persons}</span>
                </p>
                <p>
                  <span className="text-gray-500">Guide Included:</span>{" "}
                  <span className="font-medium">
                    {tripData.guideIncluded ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Guide Fee:</span>{" "}
                  <span className="font-medium">
                    ₹{tripData.guideIncluded ? tripData.guideFee : 0}
                  </span>
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">
                Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Name:</span>{" "}
                  <span className="font-medium">
                    {tripData.contactInfo.name}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  <span className="font-medium">
                    {tripData.contactInfo.email}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  <span className="font-medium">
                    {tripData.contactInfo.phone}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Total Summary */}
          <div className="mt-6 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl px-4 py-3">
            <span className="text-gray-700 font-semibold">
              Estimated Total Cost:
            </span>
            <span className="text-emerald-700 font-bold text-lg">
              ₹{tripData.totalCost}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm"
            >
              Edit Trip
            </button>
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className={`px-4 py-2 rounded-xl text-white font-semibold shadow ${
                submitting
                  ? "bg-emerald-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
              }`}
            >
              {submitting ? "Confirming..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default TripSummary;
