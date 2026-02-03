import axios from "axios";
import BookingModel from "../Models/BookingModel.js";
import Destination from "../Models/DestinationModel.js";
import UserToken from "../Models/UserTokenModel.js";
import jwt from "jsonwebtoken";
//import { logActivity } from "../utils/logActivity.js";


export const refundKhaltiPayment = async (pidx) => {
  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/refund/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

   if (response.data.status === "Completed") {

      return { success: true };
    }

    return { success: false, message: "Refund failed" };
  } catch (err) {
    console.error("Refund error:", err.response?.data || err);
    return { success: false };
  }
};


export const initializePayment = async (req, res) => {
  try {
    const { destinationId, firstName, lastName, email, phone, totalCost, guideCost } = req.body;

    const destination = await Destination.findById(destinationId);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    let totalAmount =  (totalCost || 0)  * 100;

    const payload = {
      return_url: "https://trip-planner-system-1.onrender.com/payment-success",
      website_url: "https://trip-planner-system.onrender.com",
      amount: totalAmount,
      purchase_order_id: `ORD-${Date.now()}`,
      purchase_order_name: `Trip Booking`,
      customer_info: { name: `${firstName} ${lastName}`, email, phone },
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      pidx: response.data.pidx,
      payment_url: response.data.payment_url,
    });
  } catch (err) {
    console.error("Payment init error:", err.message);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { pidx } = req.body;

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "Completed") {
      return res.json({ success: true });
    }

    return res.json({ success: false });
  } catch (err) {
    console.error("Verify error:", err.message);
    res.status(500).json({ success: false });
  }
};




// export const userCancelBooking = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const booking = await BookingModel.findById(bookingId);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.paymentStatus = "cancelled"; // no refund
//     await booking.save();

//     res.json({ success: true, message: "Booking cancelled", booking });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: "Failed to cancel booking" });
//   }
// };
