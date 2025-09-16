import React, { useState } from "react";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/category/create-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Created: ${data.category.name}`);
        setName("");
      } else {
        setMessage(`⚠️ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Failed to create category.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Add New Category</h2>
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border px-3 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default AddCategory;
