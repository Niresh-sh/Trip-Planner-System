import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminGuide() {
  const [guides, setGuides] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    languages: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGuides = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/guide/all");
      setGuides(res.data);
    } catch (err) {
      setError("Failed to load guides");
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddGuide = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const languagesArray = form.languages.split(",").map((lang) => lang.trim());

    try {
      if (editingId) {
        // Update existing guide
        const res = await axios.put(
          `http://localhost:3000/api/guide/update/${editingId}`,
          {
            name: form.name,
            phone: form.phone,
            languages: languagesArray,
          }
        );

        setGuides(guides.map((g) => (g._id === editingId ? res.data : g)));
      } else {
        // Add new guide
        const res = await axios.post("http://localhost:3000/api/guide/create", {
          name: form.name,
          phone: form.phone,
          languages: languagesArray,
        });

        setGuides([...guides, res.data]);
      }

      // Reset form
      setForm({ name: "", phone: "", languages: "" });
      setEditingId(null);
    } catch (err) {
      setError("Failed to save guide");
    } finally {
      setLoading(false);
    }
  };

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (guide) => {
    setForm({
      name: guide.name,
      phone: guide.phone,
      languages: guide.languages.join(", "),
    });
    setEditingId(guide._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/guide/delete/${id}`);
      setGuides(guides.filter((g) => g._id !== id));
    } catch (err) {
      setError("Failed to delete guide");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Manage Guides
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Languages</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Assigned Location</th>
              </tr>
            </thead>
            <tbody>
              {guides?.map((guide) => (
                <tr key={guide._id} className="text-center">
                  <td className="py-2 px-4 border-b">{guide.name}</td>
                  <td className="py-2 px-4 border-b">{guide.phone}</td>
                  <td className="py-2 px-4 border-b">
                    {guide.languages.join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b">{guide.status}</td>
                  <td className="py-2 px-4 border-b">
                    {guide.status === "Occupied"
                      ?guide.assignedDestination?.location
                      : "—"}
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleEdit(guide)}
                      className="px-3 py-1 text-sm bg-green-400 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(guide._id)}
                      className="px-3 py-1 text-sm bg-gray-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Guide
        </h3>

        <form onSubmit={handleAddGuide} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="languages"
              placeholder="Languages (comma-separated)"
              value={form.languages}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
                loading ? "bg-teal-300" : "bg-green-500 hover:bg-gray-600"
              }`}
            >
              {loading ? "Adding..." : "Add Guide"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminGuide;
