import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDestination = () => {
  const [form, setForm] = useState({
    title: "",
    location: "",
    latitude: "",
    longitude: "",
    rating: "",
    duration: "",
    cost: "",
    category: "",
    description: "",
    highlights: "",
    elevation: "",
    bestTime: { OctDec: "", MarMay: "", JunSep: "" },
    image: "",
    included: "",
    notIncluded: "",
    nearbyAttractions: [{ name: "", distance: "", rating: "" }],
  });
  const [destinations, setDestinations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const backendURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${backendURL}/api/category/get-category`
        );
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.categories || [];
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/api/destination/get-destination`
      );
      setDestinations(res.data.destinations);
    } catch (error) {
      console.error("Failed to fetch destinations", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("bestTime.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        bestTime: { ...prev.bestTime, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNearbyChange = (index, e) => {
    const { name, value } = e.target;
    const newNearby = [...form.nearbyAttractions];
    newNearby[index][name] = value;
    setForm((prev) => ({ ...prev, nearbyAttractions: newNearby }));
  };

  const addNearbyAttraction = () => {
    setForm((prev) => ({
      ...prev,
      nearbyAttractions: [
        ...prev.nearbyAttractions,
        { name: "", distance: "", rating: "" },
      ],
    }));
  };

  const removeNearbyAttraction = (index) => {
    const newNearby = [...form.nearbyAttractions];
    newNearby.splice(index, 1);
    setForm((prev) => ({ ...prev, nearbyAttractions: newNearby }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      rating: parseFloat(form.rating),
      cost: parseInt(form.cost, 10),
      category: form.category,
      highlights: form.highlights
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
      included: form.included
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      notIncluded: form.notIncluded
        .split(",")
        .map((ni) => ni.trim())
        .filter(Boolean),
      nearbyAttractions: form.nearbyAttractions.filter(
        (na) => na.name && na.distance && na.rating
      ),
    };

    try {
      if (editingId) {
        await axios.put(
          `${backendURL}/api/destination/update-destination/${editingId}`,
          payload
        );
      } else {
        await axios.post(
          `${backendURL}/api/destination/create-destination`,
          payload
        );
      }
      setForm({
        title: "",
        location: "",
        latitude: "",
        longitude: "",
        rating: "",
        duration: "",
        cost: "",
        category: "",
        description: "",
        highlights: "",
        elevation: "",
        bestTime: { OctDec: "", MarMay: "", JunSep: "" },
        image: "",
        included: "",
        notIncluded: "",
        nearbyAttractions: [{ name: "", distance: "", rating: "" }],
      });
      setEditingId(null);
      fetchDestinations();
    } catch (error) {
      console.error("Error saving destination", error);
    }
  };

  const handleEdit = (dest) => {
    setEditingId(dest._id);
    setForm({
      title: dest.title || "",
      location: dest.location || "",
      latitude: dest.latitude || "",
      longitude: dest.longitude || "",
      rating: dest.rating || "",
      duration: dest.duration || "",
      cost: dest.cost || "",
      category: dest.category?._id || dest.category || "",
      description: dest.description || "",
      highlights: dest.highlights ? dest.highlights.join(",") : "",
      elevation: dest.elevation || "",
      bestTime: dest.bestTime || { OctDec: "", MarMay: "", JunSep: "" },
      image: dest.image || "",
      included: dest.included ? dest.included.join(",") : "",
      notIncluded: dest.notIncluded ? dest.notIncluded.join(",") : "",
      nearbyAttractions:
        dest.nearbyAttractions && dest.nearbyAttractions.length > 0
          ? dest.nearbyAttractions
          : [{ name: "", distance: "", rating: "" }],
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await axios.delete(
          `${backendURL}/api/destination/delete-destination/${id}`
        );
        fetchDestinations();
      } catch (error) {
        console.error("Error deleting destination", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-green-700">
        {editingId ? "Edit Destination" : "Add Destination"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
      >
        {/* Responsive 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
            step="any"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
            step="any"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 3-4 hours)"
            value={form.duration}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={form.cost}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="elevation"
            placeholder="Elevation"
            value={form.elevation}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            name="highlights"
            placeholder="Highlights (comma separated)"
            value={form.highlights}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-green-700 mb-2">
            Select Category
          </label>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <label
                key={cat._id}
                className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition ${
                  form.category === cat._id
                    ? "border-green-600 bg-green-100"
                    : "border-gray-300 hover:border-green-500"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat._id}
                  checked={form.category === cat._id}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Best Time & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="bestTime.OctDec"
              placeholder="Best Time Oct-Dec"
              value={form.bestTime.OctDec}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="bestTime.MarMay"
              placeholder="Best Time Mar-May"
              value={form.bestTime.MarMay}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="bestTime.JunSep"
              placeholder="Best Time Jun-Sep"
              value={form.bestTime.JunSep}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Included & Not Included */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <textarea
            name="included"
            placeholder="Included items (comma separated)"
            value={form.included}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="notIncluded"
            placeholder="Not Included items (comma separated)"
            value={form.notIncluded}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Nearby Attractions */}
        <div>
          <label className="block mb-2 font-semibold text-green-700">
            Nearby Attractions
          </label>
          {form.nearbyAttractions.map((attr, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-4 mb-2 items-center">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={attr.name}
                onChange={(e) => handleNearbyChange(idx, e)}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="text"
                name="distance"
                placeholder="Distance"
                value={attr.distance}
                onChange={(e) => handleNearbyChange(idx, e)}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={attr.rating}
                onChange={(e) => handleNearbyChange(idx, e)}
                step="0.1"
                min="0"
                max="5"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => removeNearbyAttraction(idx)}
                className="text-gray-600 hover:text-gray-800 font-bold text-xl"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNearbyAttraction}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add Nearby Attraction
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
        >
          {editingId ? "Update Destination" : "Add Destination"}
        </button>
      </form>

      {/* Scrollable Existing Destinations */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-green-700">
        Existing Destinations
      </h2>
      <div className="max-h-96 overflow-y-auto">
        <ul className="space-y-3">
          {Array.isArray(destinations) &&
            destinations.map((dest) => (
              <li
                key={dest._id}
                className="p-4 border border-gray-300 rounded-xl shadow-sm flex justify-between items-center bg-gray-50"
              >
                <div>
                  <strong>{dest.title}</strong> - {dest.location}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(dest)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dest._id)}
                    className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDestination;
