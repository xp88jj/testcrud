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
    <form onSubmit={handleSubmit}>
      <h2>Create a New Record</h2>
      <p style={{ color: "red", fontStyle: "italic" }}>
        All fields need to have an entry.
      </p>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
        required
      />
      <input
        type="text"
        name="sender"
        value={formData.sender}
        onChange={handleChange}
        placeholder="Sender"
        required
      />
      <input
        type="text"
        name="receiver"
        value={formData.receiver}
        onChange={handleChange}
        placeholder="Receiver"
        required
      />
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateData;
