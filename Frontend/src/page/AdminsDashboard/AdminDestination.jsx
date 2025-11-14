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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/category/get-category"
        );
        const data = Array.isArray(res.data)
        ? res.data
        : res.data.categories || [];
         setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]); // fallback
    }
  };
  fetchCategories();
}, []);
  // Fetch all destinations
  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/destination/get-destination"
      );

      setDestinations(res.data.destinations);
    } catch (error) {
      console.error("Failed to fetch destinations", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for bestTime nested fields
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

  // Handle nearbyAttractions changes
  const handleNearbyChange = (index, e) => {
    const { name, value } = e.target;
    const newNearby = [...form.nearbyAttractions];
    newNearby[index][name] = value;
    setForm((prev) => ({ ...prev, nearbyAttractions: newNearby }));
  };

  // Add new nearbyAttraction input set
  const addNearbyAttraction = () => {
    setForm((prev) => ({
      ...prev,
      nearbyAttractions: [
        ...prev.nearbyAttractions,
        { name: "", distance: "", rating: "" },
      ],
    }));
  };

  // Remove nearbyAttraction input set
  const removeNearbyAttraction = (index) => {
    const newNearby = [...form.nearbyAttractions];
    newNearby.splice(index, 1);
    setForm((prev) => ({ ...prev, nearbyAttractions: newNearby }));
  };

  // Submit form (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data
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
          `http://localhost:3000/api/destination/update-destination/${id}`,
          payload
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/destination/create-destination",
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

  // Edit existing destination
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

  // Delete destination
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/destination/delete-destination/${id}`
        );
        fetchDestinations();
      } catch (error) {
        console.error("Error deleting destination", error);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-600">
        {editingId ? "Edit Destination" : "Add Destination"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-green-50 p-6 rounded shadow-md"
      >
        {/* Basic info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
            step="any"
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
            step="any"
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 3-4 hours)"
            value={form.duration}
            onChange={handleChange}
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={form.cost}
            onChange={handleChange}
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div>
            <label className="block font-semibold text-green-700 mb-2">
              Select Category
            </label>
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <label
                  key={cat._id}
                  className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition ${
                    form.category === cat._id
                      ? "border-green-600 bg-green-100"
                      : "border-green-300 hover:border-green-500"
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

          <input
            type="text"
            name="elevation"
            placeholder="Elevation"
            value={form.elevation}
            onChange={handleChange}
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Highlights */}
        <textarea
          name="highlights"
          placeholder="Highlights (comma separated)"
          value={form.highlights}
          onChange={handleChange}
          rows={2}
          className="w-full p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Best Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="bestTime.OctDec"
            placeholder="Best Time Oct-Dec"
            value={form.bestTime.OctDec}
            onChange={handleChange}
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="bestTime.MarMay"
            placeholder="Best Time Mar-May"
            value={form.bestTime.MarMay}
            onChange={handleChange}
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="bestTime.JunSep"
            placeholder="Best Time Jun-Sep"
            value={form.bestTime.JunSep}
            onChange={handleChange}
            className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Image URL */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Included */}
        <textarea
          name="included"
          placeholder="Included items (comma separated)"
          value={form.included}
          onChange={handleChange}
          rows={2}
          className="w-full p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Not Included */}
        <textarea
          name="notIncluded"
          placeholder="Not Included items (comma separated)"
          value={form.notIncluded}
          onChange={handleChange}
          rows={2}
          className="w-full p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Nearby Attractions */}
        <div>
          <label className="block mb-2 font-semibold text-green-700">
            Nearby Attractions
          </label>
          {form.nearbyAttractions.map((attr, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-4 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={attr.name}
                onChange={(e) => handleNearbyChange(idx, e)}
                className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="text"
                name="distance"
                placeholder="Distance"
                value={attr.distance}
                onChange={(e) => handleNearbyChange(idx, e)}
                className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="p-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => removeNearbyAttraction(idx)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNearbyAttraction}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Nearby Attraction
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition"
        >
          {editingId ? "Update Destination" : "Add Destination"}
        </button>
      </form>

      {/* Destination List */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-green-600">
        Existing Destinations
      </h2>
      <ul>
        {Array.isArray(destinations) &&
          destinations.map((dest) => (
            <li
              key={dest._id}
              className="mb-4 p-4 border border-green-300 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <strong>{dest.title}</strong> - {dest.location}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(dest)}
                  className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dest._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AdminDestination;
