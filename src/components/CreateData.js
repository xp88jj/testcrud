import React, { useState } from "react";
import { db } from "../firebase";
import { ref, push } from "firebase/database";

function CreateData() {
  const [formData, setFormData] = useState({
    date: "",
    sender: "",
    receiver: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = ref(db, "letters");
    push(dbRef, formData)
      .then(() => alert("Data created successfully!"))
      .catch((error) => alert("Error creating data: " + error.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Record</h2>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
      />
      <input
        type="text"
        name="sender"
        value={formData.sender}
        onChange={handleChange}
        placeholder="Sender"
      />
      <input
        type="text"
        name="receiver"
        value={formData.receiver}
        onChange={handleChange}
        placeholder="Receiver"
      />
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateData;
