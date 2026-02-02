import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminGuide() {
  const [guides, setGuides] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", languages: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const backendURL = import.meta.env.VITE_API_URL;
  const fetchGuides = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/guide/all`);
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
        const res = await axios.put(
          `${backendURL}/api/guide/update/${editingId}`,
          { ...form, languages: languagesArray }
        );
        setGuides(guides.map((g) => (g._id === editingId ? res.data : g)));
      } else {
        const res = await axios.post(`${backendURL}/api/guide/create`, {
          ...form,
          languages: languagesArray,
        });
        setGuides([...guides, res.data]);
      }

      setForm({ name: "", phone: "", languages: "" });
      setEditingId(null);
    } catch (err) {
      setError("Failed to save guide");
    } finally {
      setLoading(false);
    }
  };

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
      await axios.delete(`${backendURL}/api/guide/delete/${id}`);
      setGuides(guides.filter((g) => g._id !== id));
    } catch (err) {
      setError("Failed to delete guide");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Guide List */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-600 mb-4 border-b pb-2">
          Manage Guides
        </h2>

        {error && (
          <p className="text-red-500 mb-4 border-t pt-2">{error}</p>
        )}

        <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-gray-700">Phone</th>
                <th className="px-4 py-2 text-left text-gray-700">Languages</th>
                <th className="px-4 py-2 text-left text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-gray-700">Assigned Location</th>
                <th className="px-4 py-2 text-center text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guides?.map((guide) => (
                <tr key={guide._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{guide.name}</td>
                  <td className="px-4 py-2">{guide.phone}</td>
                  <td className="px-4 py-2">{guide.languages.join(", ")}</td>
                  <td className="px-4 py-2">{guide.status}</td>
                  <td className="px-4 py-2">
                    {guide.status === "Occupied" ? guide.assignedDestination?.location : "—"}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(guide)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(guide._id)}
                      className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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

      {/* Add / Edit Guide Form */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4 border-b pb-2">
          {editingId ? "Edit Guide" : "Add New Guide"}
        </h3>

        <form onSubmit={handleAddGuide} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="languages"
              placeholder="Languages (comma-separated)"
              value={form.languages}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
              loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
            } transition`}
          >
            {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update Guide" : "Add Guide"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminGuide;
