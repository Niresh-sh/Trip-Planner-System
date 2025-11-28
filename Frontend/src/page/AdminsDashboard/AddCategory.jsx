import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      setListLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/category/get-category`);
      const data = await res.json();
      const list = data?.categories || [];
      setCategories(Array.isArray(list) ? list : []);
    } catch (err) {
      setError("Failed to load categories.");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) return setMessage("⚠️ Category name is required.");
    try {
      setLoading(true);
      setMessage("");
      const res = await fetch(`${API_BASE_URL}/api/category/create-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Created: ${data.category.name}`);
        setName("");
        fetchCategories();
      } else {
        setMessage(`⚠️ ${data.message || "Unable to create category"}`);
      }
    } catch (err) {
      setMessage("❌ Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setEditingName(cat.name);
    setMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = async () => {
    const trimmed = editingName.trim();
    if (!trimmed) return setMessage("⚠️ Category name is required.");
    try {
      setLoading(true);
      setMessage("");
      const res = await fetch(`${API_BASE_URL}/api/category/update-category/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Updated: ${data.category.name}`);
        cancelEdit();
        fetchCategories();
      } else {
        setMessage(`⚠️ ${data.message || "Unable to update category"}`);
      }
    } catch (err) {
      setMessage("❌ Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      setLoading(true);
      setMessage("");
      const res = await fetch(`${API_BASE_URL}/api/category/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`🗑️ Deleted: ${data.category?.name || "Category"}`);
        fetchCategories();
      } else {
        setMessage(`⚠️ ${data.message || "Unable to delete category"}`);
      }
    } catch (err) {
      setMessage("❌ Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-green-600">Manage Categories</h2>

      {/* Add Category */}
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border px-4 py-2 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={loading}
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
      {(message || error) && (
        <p className={`text-sm ${error ? "text-red-500" : "text-green-600"}`}>
          {message || error}
        </p>
      )}

      {/* Category List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gray-50 border-b px-4 py-3 font-medium text-gray-700">
          Existing Categories
        </div>
        {listLoading ? (
          <div className="p-4 text-gray-500">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="p-4 text-gray-500">No categories found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 w-40 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4">
                      {editingId === cat._id ? (
                        <input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                      ) : (
                        cat.name
                      )}
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      {editingId === cat._id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            disabled={loading}
                            className={`px-3 py-1 rounded text-white ${
                              loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 rounded border hover:bg-gray-100 transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(cat)}
                            className="px-3 py-1 rounded border hover:bg-gray-100 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            disabled={loading}
                            className={`px-3 py-1 rounded text-white ${
                              loading ? "bg-gray-300" : "bg-gray-500 hover:bg-gray-600"
                            }`}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
