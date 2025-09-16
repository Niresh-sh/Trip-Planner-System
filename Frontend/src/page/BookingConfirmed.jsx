import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingConfirmed() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:3000/api/booking/userbooking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBooking(res.data);
      })
      .catch(() => {
        setError('Failed to load booking details.');
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) return <p>Loading booking details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!booking) return <p>No booking found.</p>;

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
    : 'Pending';

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-md p-6 mt-8 border">
      <h1 className="text-2xl font-bold text-green-600 text-center mb-6">Trip Summary</h1>

      {/* Trip Details */}
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="font-semibold">Trip Details</h2>
          <p><strong>Start Date:</strong> {startDate ? new Date(startDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Persons:</strong> {persons}</p>
          <p><strong>Guide Included:</strong> {guideIncluded ? 'Yes' : 'No'}</p>
          {guideIncluded && guide?.fee && (
            <p><strong>Guide Fee:</strong> ₹{guide.fee}</p>
          )}
        </div>

        <div>
          <h2 className="font-semibold">Contact Information</h2>
          <p><strong>Name:</strong> {contact?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {contact?.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {contact?.phone || 'N/A'}</p>
        </div>
      </div>

      {/* Destination Section */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-semibold text-lg mb-2">{destinationId?.title || 'N/A'}</h2>
        <p className="text-gray-700">{destinationId?.location || 'N/A'}</p>
        <p className="text-sm text-gray-500 mt-1">Duration: 3–4 hours</p>
        <p className="text-green-600 font-semibold text-right mt-2">₹{totalCost - (guide?.fee || 0)}</p>
      </div>

      {/* Guide Details */}
      {guideIncluded && guide && (
        <div className="mb-4">
          <h2 className="font-semibold mt-2">Guide Details</h2>
          <p><strong>Name:</strong> {guide.name}</p>
          <p><strong>Phone:</strong> {guide.phone}</p>
          <p><strong>Languages:</strong> {guide.languages?.join(', ') || 'N/A'}</p>
        </div>
      )}

      {/* Total Cost */}
      <div className="bg-gray-100 p-4 rounded mt-4">
        <h2 className="text-lg font-semibold">Estimated Total Cost:</h2>
        <p className="text-green-600 text-xl font-bold">₹{totalCost}</p>
      </div>

      {/* Status */}
      <div className="mt-4">
        <p>
          <strong>Status:</strong>{' '}
          <span
            className={`font-semibold ${
              statusFormatted === 'Approved'
                ? 'text-green-600'
                : statusFormatted === 'Declined'
                ? 'text-red-600'
                : 'text-yellow-600'
            }`}
          >
            {statusFormatted}
          </span>
        </p>
      </div>

      {/* Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmed;
