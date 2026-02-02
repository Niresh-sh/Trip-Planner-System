import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:3000/api/booking/userbooking', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirm = window.confirm(
      'If the trip is cancelled, the cost is not refundable. Do you want to continue?'
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/booking/delete-booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Booking cancelled successfully.');
      fetchBookings(); 
    } catch (error) {
      alert('Failed to cancel booking.');
    }
  };

   const isCancelable = (booking) => {
    const today = new Date();
    const startDate = new Date(booking.startDate);
    return booking.status.toLowerCase() === 'pending' && startDate > today;
  };

  const getStatusLabel = (status) => {
  switch (status) {
    case 'pending':
      return <span className="text-yellow-500 font-semibold">Pending</span>;
    case 'approved':
      return <span className="text-blue-600 font-semibold">Approved</span>;
    case 'success':
      return <span className="text-green-600 font-semibold">Completed</span>;
    case 'cancelled':
      return <span className="text-green-600 font-semibold">Cancelled</span>;
    default:
      return <span>{status}</span>;
  }
};


  if (loading) return <p className="text-center">Loading booking history...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Your Booking History</h1>

      {loading ? (
        <p className="text-center">Loading booking history...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-green-400 rounded p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="space-y-1">
                <h2
                  className="text-lg font-semibold text-cyan-700 cursor-pointer hover:underline"
                  onClick={() => navigate(`/booking-success/${booking._id}`)}
                >
                  {booking.destinationId ? booking.destinationId.title : 'Unknown destination'}
                </h2>
                <p><strong>Start:</strong> {format(new Date(booking.startDate), 'PPP')}</p>
                <p><strong>Persons:</strong> {booking.persons}</p>
                <p><strong>Total Cost:</strong> ₹{booking.totalCost}</p>
                <p><strong>Status:</strong> {getStatusLabel(booking.status)}</p>
              </div>

              {isCancelable(booking) && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="mt-4 md:mt-0 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
