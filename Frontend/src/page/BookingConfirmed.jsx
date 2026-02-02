import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; 

function BookingConfirmed() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  console.log("bookingId:", bookingId);

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      toast.error("Booking ID is missing from URL.");
      setError("Booking ID is missing.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/api/booking/userbooking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
       
        setBooking(res.data.booking || res.data); 
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load booking details.");
        toast.error("Failed to load booking details.");
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading booking details...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );
  if (!booking)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        No booking found.
      </div>
    );

  const {
    persons,
    startDate,
    totalCost,
    contact,
    destinationId,
    guideIncluded,
    status,
    guide,
  } = booking;

  const statusFormatted = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Pending";

  const cover = destinationId?.image || "/public/placeholder-destination.jpg";

  const handleCancelBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("You must be logged in to cancel a booking.");
      return;
    }

    if (booking.status === "declined") {
      toast.info("This booking is already declined and cannot be canceled.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/booking/cancel/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message || "Booking canceled successfully.");
      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to cancel the booking."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden border border-emerald-100">
        {/* Header Image */}
        <div className="relative">
          <img
            src={cover}
            alt={destinationId?.title || "Destination"}
            className="w-full h-60 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h1 className="text-3xl font-bold text-white">
              {destinationId?.title || "Trip Summary"}
            </h1>
            <p className="text-white/90 text-sm">
              {destinationId?.location || "Unknown Location"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Trip & Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trip Details */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-gray-800 mb-3">Trip Details</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Start Date:</span>{" "}
                  <span className="font-medium">
                    {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Persons:</span>{" "}
                  <span className="font-medium">{persons}</span>
                </p>
                <p>
                  <span className="text-gray-500">Guide Included:</span>{" "}
                  <span className="font-medium">{guideIncluded ? "Yes" : "No"}</span>
                </p>
                {guideIncluded && guide?.fee && (
                  <p>
                    <span className="text-gray-500">Guide Fee:</span>{" "}
                    <span className="font-medium">₹{guide.fee}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-gray-800 mb-3">
                Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Name:</span>{" "}
                  <span className="font-medium">{contact?.name || "N/A"}</span>
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  <span className="font-medium">{contact?.email || "N/A"}</span>
                </p>
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  <span className="font-medium">{contact?.phone || "N/A"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Destination Cost Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">
              Destination Summary
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Duration: {destinationId?.duration || "3–4 hours"}
                </p>
                <p className="text-sm text-gray-600">
                  Base Cost: ₹{destinationId?.cost || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Latitude: {destinationId?.latitude || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Longitude: {destinationId?.longitude || "N/A"}
                </p>
              </div>

              <p className="text-emerald-700 font-bold text-xl">
                ₹{totalCost - (guide?.fee || 0)}
              </p>
            </div>
          </div>

          {/* Guide Details */}
          {guideIncluded && guide && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-gray-800 mb-3">Guide Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="text-gray-500">Name:</span>{" "}
                  <span className="font-medium">{guide.name}</span>
                </p>
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  <span className="font-medium">{guide.phone}</span>
                </p>
                <p>
                  <span className="text-gray-500">Languages:</span>{" "}
                  <span className="font-medium">
                    {guide.languages?.join(", ") || "N/A"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Location:</span>{" "}
                  <span className="font-medium">
                    {guide.assignedDestination?.location || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Total Cost + Status */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white border rounded-xl p-5 shadow-sm">
            <div className="text-gray-700 font-semibold">
              Estimated Total Cost:{" "}
              <span className="text-emerald-700 font-bold text-lg">₹{totalCost}</span>
            </div>
            <div className="mt-3 sm:mt-0">
              <span
                className={`font-semibold ${
                  statusFormatted === "Approved"
                    ? "text-emerald-600"
                    : statusFormatted === "declined"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Status: {statusFormatted}
              </span>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow hover:from-emerald-500 hover:to-teal-500 transition-all duration-200"
            >
              Back to Home
            </button>
          </div>

          {/* Cancel Booking */}
          <div className="text-center mt-4">
            <button
              onClick={handleCancelBooking}
              className="px-6 py-2 bg-red-600 text-white rounded-xl font-semibold shadow hover:bg-red-500 transition-all duration-200"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmed;
