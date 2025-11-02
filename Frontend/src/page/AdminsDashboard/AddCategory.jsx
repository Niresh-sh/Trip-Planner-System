import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");

  // Inline edit state
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
      console.error("Fetch categories error:", err);
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
    if (!trimmed) {
      setMessage("⚠️ Category name is required.");
      return;
    }
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
      console.error(err);
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
    if (!trimmed) {
      setMessage("⚠️ Category name is required.");
      return;
    }
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
      console.error(err);
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
      console.error(err);
      setMessage("❌ Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Manage Categories</h2>

      {/* Create */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border px-3 py-2 rounded w-64"
          disabled={loading}
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
        {message && <p className="text-sm">{message}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {/* List */}
      <div className="bg-white rounded shadow">
        <div className="border-b px-4 py-2 font-medium">Existing Categories</div>
        {listLoading ? (
          <div className="p-4 text-gray-500">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="p-4 text-gray-500">No categories found</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4 w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-t">
                  <td className="py-2 px-4">
                    {editingId === cat._id ? (
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
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
                          className={`px-3 py-1 rounded text-white ${loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"}`}
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 rounded border"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(cat)}
                          className="px-3 py-1 rounded border"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          disabled={loading}
                          className={`px-3 py-1 rounded text-white ${loading ? "bg-red-300" : "bg-red-600 hover:bg-red-700"}`}
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
        )}
      </div>
    </div>
  );
};

export default AddCategory;
