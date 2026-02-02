import axios from "axios";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();
    const hasRun = useRef(false);
    const backendURL = import.meta.env.VITE_API_URL;  

  useEffect(() => {
       if (hasRun.current) return;
        hasRun.current = true;
    const verifyAndBook = async () => {
      try {
        const pidx = new URLSearchParams(window.location.search).get("pidx");
        const token = localStorage.getItem("token");
        const tripData = JSON.parse(localStorage.getItem("PENDING_BOOKING_DATA"));

        if (!pidx || !tripData) {
          toast.error("Invalid payment callback or missing booking data.");
          return;
        }

        // Verify payment
        const verifyRes = await axios.post(
          `${backendURL}/api/payment/verify`,
          { pidx },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!verifyRes.data.success) {
          toast.error("Payment verification failed.");
          return;
        }

        //  Payment successful → create booking
        const bookingRes = await axios.post(
          `${backendURL}/api/booking/create-booking`, // match backend route
          {
            tripId: tripData.tripId,
            destinationId: tripData.destinationId,
            persons: tripData.persons,
            startDate: tripData.startDate,
            totalCost: tripData.totalCost,
            contact: tripData.contact,
            guideIncluded: tripData.guideIncluded,
            guideFee: tripData.guideFee || 0,
            paymentId: pidx, 
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (bookingRes.status === 201) {
          toast.success("Booking created successfully!");
          localStorage.removeItem("PENDING_BOOKING_DATA");

          // Redirect to confirmed booking page
           const bookingId = bookingRes.data.booking._id; 
         navigate(`/booking-success/${bookingId}`);
        } else {
          toast.error("Booking creation failed.");
        }
      } catch (error) {
        console.error("Payment verification/booking error:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred during payment processing."
        );
      }
    };

    verifyAndBook();
  }, []);

  return (
    <p className="text-center mt-10 text-gray-700 font-medium">
      Verifying payment...
    </p>
  );
}

export default PaymentSuccess;
