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

  const [errors, setErrors] = useState({});

  const includeGuide = true; 
  const GUIDE_FEE = 1000;

  
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

  const backendURL = import.meta.env.VITE_API_URL;

  // Fetch destinations
  useEffect(() => {
    axios
      .get(`${backendURL}/api/trip/getdest`)
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
    return baseCost * persons + GUIDE_FEE;
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

 
  const readyToRecommend = useMemo(() => {
    return Number(budget) > 0 && persons > 0 && isValidDate;
  }, [budget, persons, isValidDate]);

 
  const recommendedDestinations = useMemo(() => {
    if (!readyToRecommend) return [];

    return destinations.filter((d) => {
      const total = (Number(d.cost) || 0) * persons + GUIDE_FEE;
      return total <= Number(budget);
    });
  }, [readyToRecommend, destinations, persons, budget]);

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
      guideIncluded: true,
      guideFee: GUIDE_FEE,

      totalCost,
      duration,
    };

    navigate(`/tripsummary/${selectedDestination._id}`, {
      state: { tripData },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Form Section */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 lg:p-7">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">
            Plan Your Dream Trip
          </h2>

          {/* Budget */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Budget (₹)
          </label>
          <input
            type="number"
            placeholder="Enter your budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
            min={1}
          />
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
          )}

          {/* Date */}
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={getTomorrowDate()}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}

          {/* Persons */}
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
            Number of Persons
          </label>
          <input
            type="number"
            placeholder="Number of Persons"
            value={persons}
            onChange={(e) => setPersons(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
            min={1}
          />
          {errors.persons && (
            <p className="text-red-500 text-sm mt-1">{errors.persons}</p>
          )}

          {/* Guide Option */}
          <label className="block mt-4">
            <span className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeGuide}
                onChange={(e) => setIncludeGuide(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">
                I want a guide (₹{GUIDE_FEE})
              </span>
            </span>
          </label>

          {/* Contact Information */}
          <h3 className="text-sm font-semibold pt-6 text-gray-800">
            Contact Information
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            value={contactInfo.name}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, name: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 mt-2 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 mt-2 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          <input
            type="tel"
            placeholder="Phone Number"
            value={contactInfo.phone}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, phone: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 mt-2 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Destination Section */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 lg:p-7 flex flex-col lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Recommended Destinations
          </h2>

          {!readyToRecommend ? (
            <p className="text-gray-500">
              Fill budget, start date, and persons to see recommendations.
            </p>
          ) : recommendedDestinations.length === 0 ? (
            <p className="text-gray-500">
              No destinations match your budget. Try adjusting budget or
              persons.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-1">
              {recommendedDestinations.map((dest) => {
                const total =
                  (Number(dest.cost) || 0) * persons +
                  (includeGuide ? GUIDE_FEE : 0);
                const isSelected = selectedDestination?._id === dest._id;
                return (
                  <div
                    key={dest._id}
                    onClick={() => setSelectedDestination(dest)}
                    className={`group rounded-xl overflow-hidden border p-2 cursor-pointer transition transform hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-emerald-500 ring-2 ring-emerald-200"
                        : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="w-full h-32 md:h-36 object-cover rounded-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <h3 className="font-semibold mt-2 text-gray-800">
                      {dest.title}
                    </h3>
                    <p className="text-sm text-gray-600">Base: ₹{dest.cost}</p>
                    <p className="text-sm text-gray-600">
                      Estimated Total: ₹{total}
                    </p>
                    <p className="text-xs text-gray-500">
                      Duration: {dest.duration || "N/A"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
              Total Cost: ₹{calculateTotalCost()}
            </span>
            <button
              onClick={handleTripSummary}
              disabled={!selectedDestination}
              className={`py-2.5 px-4 rounded-xl text-white font-semibold transition ${
                selectedDestination
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {selectedDestination
                ? "Show Trip Summary"
                : "Select a Destination"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
