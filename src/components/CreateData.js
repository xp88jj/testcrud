import React, { useState } from "react";
import { db } from "../firebase"; // Ensure firebase.js is properly configured
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

function CreateData() {
  const [formData, setFormData] = useState({
    date: "",
    sender: "",
    receiver: "",
    notes: "",
  });

  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = ref(db, "letters");
    push(dbRef, formData)
      .then(() => {
        alert("Data created successfully!");
        navigate("/read"); // Navigate to the Read page after successful creation
      })
      .catch((error) => alert("Error creating data: " + error.message));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Create a New Record
      </h2>
      <p className="text-red-500 italic text-center">
        All fields need to have an entry.
      </p>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="sender"
        value={formData.sender}
        onChange={handleChange}
        placeholder="Sender"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="receiver"
        value={formData.receiver}
        onChange={handleChange}
        placeholder="Receiver"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Create
      </button>
    </form>
  );
}

export default CreateData;
