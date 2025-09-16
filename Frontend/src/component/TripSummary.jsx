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
  const token = localStorage.getItem('token');

  if (!token) {
    toast.warning('You must be logged in to confirm a booking.');
    setShowAuthModal(true);
    return;
  }

  setSubmitting(true);
  setError('');

  try {
    // 1. Create trip first
    const savedTrip = await axios.post(
      'http://localhost:3000/api/trip/createtrip',
      tripData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Trip created:', savedTrip.data);

    // 2. Create booking using trip ID and booking info
    const booking = await axios.post(
      'http://localhost:3000/api/booking/create-booking',
      {
        tripId: savedTrip.data._id,
        destinationId: tripData.selectedDestination._id,
        persons: tripData.persons,
        startDate: tripData.startDate,
        totalCost: tripData.totalCost,
        contact: tripData.contactInfo,
        guideIncluded: tripData.guideIncluded,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Booking created:', booking.data);

    // Only navigate if booking creation succeeded
    navigate(`/booking-success/${booking.data.booking._id}`, {
      state: { booking: booking.data.booking, trip: savedTrip.data },
    });
  } catch (err) {
    console.error('Booking error:', err);
    // Show error from backend or generic fallback
    const message = err?.response?.data?.message || 'Booking failed.';
    setError(message);
    toast.error(message);
  } finally {
    setSubmitting(false);
  }
};


  if (!tripData)
    return <p className="text-center mt-10">No trip data available.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
        Trip Summary
      </h1>

      {error && (
        <div className="mb-4 text-red-700 bg-red-100 p-3 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-2">Trip Details</h2>
          <p>
            <strong>Start Date:</strong> {tripData.startDate}
          </p>
          <p>
            <strong>Persons:</strong> {tripData.persons}
          </p>
          <p>
            <strong>Guide Included:</strong>{" "}
            {tripData.guideIncluded ? "Yes" : "No"}
          </p>
          <p>
            <strong>Guide Fee:</strong> ₹
            {tripData.guideIncluded ? tripData.guideFee : 0}
          </p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Contact Information</h2>
          <p>
            <strong>Name:</strong> {tripData.contactInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {tripData.contactInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {tripData.contactInfo.phone}
          </p>
        </div>
      </div>

      <h2 className="font-semibold mt-6 mb-2">Destination</h2>
      <div className="p-4 bg-gray-50 rounded shadow-sm flex justify-between">
        <div>
          <p className="font-semibold">{tripData.selectedDestination.title}</p>
          <p className="text-sm text-gray-600">
            {tripData.selectedDestination.location}
          </p>
          <p className="text-sm text-gray-600">Duration: {tripData.duration}</p>
        </div>
        <p className="text-green-600 font-semibold">
          ₹{tripData.selectedDestination.cost}
        </p>
      </div>

      <div className="mt-6 p-4 bg-gray-100 flex justify-between font-semibold text-lg">
        <span>Estimated Total Cost:</span>
        <span className="text-green-500">₹{tripData.totalCost}</span>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        >
          Edit Trip
        </button>
        <button
          onClick={handleConfirm}
          disabled={submitting}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-60"
        >
          {submitting ? "Confirming..." : "Confirm Booking"}
        </button>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default TripSummary;
