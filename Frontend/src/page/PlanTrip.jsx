import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PlanTrip() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [persons, setPersons] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [includeGuide, setIncludeGuide] = useState(false);
  const [errors, setErrors] = useState({});

  const GUIDE_FEE = 1000;

  // Prefill name/email from localStorage when the form loads
  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const email = localStorage.getItem("email") || "";
    const phone = localStorage.getItem("phone") || "";

    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
    setContactInfo((prev) => ({
      ...prev,
      name: fullName || prev.name,
      email: email || prev.email,
      phone: phone || prev.phone,
    }));
  }, []);

  // Fetch destinations
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/trip/getdest")
      .then((res) =>
        setDestinations(
          Array.isArray(res.data) ? res.data : res.data?.destinations || []
        )
      )
      .catch((err) => console.error(err));
  }, []);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const calculateTotalCost = () => {
    const baseCost = selectedDestination?.cost || 0;
    const total = baseCost * persons + (includeGuide ? GUIDE_FEE : 0);
    return total;
  };

  const calculateDuration = () => {
    return selectedDestination?.duration || "N/A";
  };

  const isValidDate = useMemo(() => {
    if (!startDate) return false;
    try {
      const d = new Date(startDate);
      return d.toISOString().split("T")[0] >= getTomorrowDate();
    } catch {
      return false;
    }
  }, [startDate]);

  // Recommendations now depend only on budget, date, and persons
  const readyToRecommend = useMemo(() => {
    return Number(budget) > 0 && persons > 0 && isValidDate;
  }, [budget, persons, isValidDate]);

  // Filter destinations by budget only (category removed)
  const recommendedDestinations = useMemo(() => {
    if (!readyToRecommend) return [];
    const fee = includeGuide ? GUIDE_FEE : 0;

    return destinations.filter((d) => {
      const total = (Number(d.cost) || 0) * persons + fee;
      return total <= Number(budget);
    });
  }, [readyToRecommend, destinations, includeGuide, persons, budget]);

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    if (!budget || budget <= 0) {
      formErrors.budget = "Budget should be a positive number.";
      isValid = false;
    }

    if (!isValidDate) {
      formErrors.startDate = "Start date must be from tomorrow onwards.";
      isValid = false;
    }

    if (persons <= 0) {
      formErrors.persons = "Number of persons must be greater than 0.";
      isValid = false;
    }

    if (!contactInfo.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
      formErrors.email = "Valid email is required.";
      isValid = false;
    }

    if (!/^\d{10}$/.test(contactInfo.phone)) {
      formErrors.phone = "Phone number must be 10 digits.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleTripSummary = () => {
    if (!validateForm()) return;

    const totalCost = calculateTotalCost();
    const duration = calculateDuration();

    const tripData = {
      budget: Number(budget),
      startDate,
      persons: Number(persons),
      contactInfo,
      selectedDestination,
      guideIncluded: includeGuide,
      guideFee: includeGuide ? GUIDE_FEE : 0,
      totalCost,
      duration,
    };

    navigate(`/tripsummary/${selectedDestination._id}`, {
      state: { tripData },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-100 min-h-screen">
      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-cyan-700 mb-4">
          Plan Your Dream Trip
        </h2>

        {/* Budget */}
        <label className="block text-sm font-medium text-gray-700">Estimated Budget (₹)</label>
        <input
          type="number"
          placeholder="Enter your budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-4 py-2"
          min={1}
        />
        {errors.budget && (
          <p className="text-red-500 text-sm">{errors.budget}</p>
        )}

        {/* Date */}
        <label className="block text-sm font-medium text-gray-700 mt-4">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={getTomorrowDate()}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate}</p>
        )}

        {/* Persons */}
        <label className="block text-sm font-medium text-gray-700 mt-4">Number of Persons</label>
        <input
          type="number"
          placeholder="Number of Persons"
          value={persons}
          onChange={(e) => setPersons(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-4 py-2"
          min={1}
        />
        {errors.persons && (
          <p className="text-red-500 text-sm">{errors.persons}</p>
        )}

        {/* Guide Option */}
        <label className="block mt-4">
          <input
            type="checkbox"
            checked={includeGuide}
            onChange={(e) => setIncludeGuide(e.target.checked)}
            className="mr-2"
          />
          I want a guide (₹{GUIDE_FEE})
        </label>

        {/* Contact Information */}
        <h3 className="text-sm font-semibold pt-6">Contact Information</h3>

        <input
          type="text"
          placeholder="Full Name"
          value={contactInfo.name}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, name: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-4 py-2 mt-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email Address"
          value={contactInfo.email}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, email: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-4 py-2 mt-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="tel"
          placeholder="Phone Number"
          value={contactInfo.phone}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, phone: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-4 py-2 mt-2"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Destination Section */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-green-600 mb-2">
          Recommended Destinations
        </h2>

        {!readyToRecommend ? (
          <p className="text-gray-500">
            Fill budget, start date, and persons to see recommendations.
          </p>
        ) : recommendedDestinations.length === 0 ? (
          <p className="text-gray-500">
            No destinations match your budget. Try adjusting budget or persons.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedDestinations.map((dest) => {
              const total = (Number(dest.cost) || 0) * persons + (includeGuide ? GUIDE_FEE : 0);
              return (
                <div
                  key={dest._id}
                  onClick={() => setSelectedDestination(dest)}
                  className={`border p-2 rounded cursor-pointer ${
                    selectedDestination?._id === dest._id
                      ? "border-blue-500 shadow"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-24 object-cover rounded"
                  />
                  <h3 className="font-semibold mt-2">{dest.title}</h3>
                  <p className="text-sm text-gray-600">Base: ₹{dest.cost}</p>
                  <p className="text-sm text-gray-600">
                    Estimated Total: ₹{total}
                  </p>
                  <p className="text-xs text-gray-400">
                    Duration: {dest.duration || "N/A"}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-lg font-semibold mt-6">
          Total Cost: ₹{calculateTotalCost()}
        </p>
        <button
          onClick={handleTripSummary}
          disabled={!selectedDestination}
          className={`mt-4 py-2 w-full ${
            selectedDestination ? "bg-green-500 hover:bg-gray-600" : "bg-gray-300 cursor-not-allowed"
          } text-white font-semibold rounded`}
        >
          {selectedDestination ? "Show Trip Summary" : "Select a Destination"}
        </button>
      </div>
    </div>
  );
}
