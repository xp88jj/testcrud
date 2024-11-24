import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";

function UpdateData() {
  const [records, setRecords] = useState({});
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    sender: "",
    receiver: "",
    notes: "",
  });

  // Fetch records from Firebase
  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setRecords(data || {});
    });
  }, []);

  // Handle when a record is selected
  const handleSelectRecord = (id) => {
    setSelectedId(id);
    const selectedRecord = records[id];
    setFormData({
      date: selectedRecord.date || "",
      sender: selectedRecord.sender || "",
      receiver: selectedRecord.receiver || "",
      notes: selectedRecord.notes || "",
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId) return alert("Please select a record to update.");

    // Validation: Check for empty fields
    if (!formData.date || !formData.sender || !formData.receiver || !formData.notes) {
      alert("All fields are required. Please fill in all fields before submitting.");
      return;
    }

    const dbRef = ref(db, `letters/${selectedId}`);
    update(dbRef, formData)
      .then(() => alert(`Record ${selectedId} updated successfully!`))
      .catch((error) => alert("Error updating data: " + error.message));
  };

  return (
    <div>
      <h2>Update Record</h2>
      <div>
        <h3>Select a Record to Update:</h3>
        {Object.keys(records).length > 0 ? (
          Object.keys(records).map((key) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <p>
                <strong>ID:</strong> {key} | <strong>Date:</strong> {records[key].date} |{" "}
                <strong>Sender:</strong> {records[key].sender}
              </p>
              <button onClick={() => handleSelectRecord(key)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No records available to update.</p>
        )}
      </div>

      {selectedId && (
        <form onSubmit={handleSubmit}>
          <h3>Editing Record ID: {selectedId}</h3>
          <p style={{ color: "red", fontStyle: "italic" }}>
            All fields are required. Please fill in all fields.
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
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
}

export default UpdateData;
