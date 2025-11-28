// src/components/Emails/BookingDeclinedEmail.jsx
import React from "react";

const BookingDeclinedEmail = ({ user, booking }) => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-orange-500 text-white text-center py-6">
          <h1 className="text-2xl font-bold">Booking Declined</h1>
        </div>
        <div className="p-6 text-gray-800">
          <p>Hi {user.firstName},</p>
          <p className="mt-2">
            Unfortunately, your booking for <strong>{booking.destinationId?.title}</strong> 
            has been declined.
          </p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>Start Date:</strong>{" "}
              {new Date(booking.startDate).toLocaleDateString()}
            </li>
            <li>
              <strong>Number of Persons:</strong> {booking.persons}
            </li>
            <li>
              <strong>Total Cost:</strong> ₹{booking.totalCost}
            </li>
            <li>
              <strong>Status:</strong> {booking.status}
            </li>
          </ul>
          <div className="mt-6 text-center">
            <a
              href="#"
              className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
            >
              View Booking
            </a>
          </div>
        </div>
        <div className="bg-gray-200 text-gray-600 text-center py-4 text-sm">
          &copy; {new Date().getFullYear()} Travel Booking. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default BookingDeclinedEmail;
