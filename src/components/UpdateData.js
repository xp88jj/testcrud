import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import "./UpdateData.css"; // Import the CSS file

function UpdateData() {
  const [records, setRecords] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

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

  // Filter records based on search query
  const filteredRecords = Object.keys(records).filter((key) => {
    const record = records[key];
    return (
      record.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Paginate filtered records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handle record selection
  const handleSelectRecord = (id) => {
    setSelectedId(id);
    const selectedRecord = records[id];
    if (selectedRecord) {
      setFormData({
        date: selectedRecord.date || "",
        sender: selectedRecord.sender || "",
        receiver: selectedRecord.receiver || "",
        notes: selectedRecord.notes || "",
      });
    } else {
      alert("Record not found.");
    }
  };

  // Submit updated record to Firebase
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!formData.date || !formData.sender || !formData.receiver || !formData.notes) {
      alert("All fields are required. Please fill in all fields before submitting.");
      return;
    }

    if (!selectedId) {
      alert("Please select a record to update.");
      return;
    }

    const dbRef = ref(db, `letters/${selectedId}`);
    update(dbRef, formData)
      .then(() => {
        alert(`Record ID: ${selectedId} updated successfully!`);

        // Update local state to reflect the change
        setRecords((prevRecords) => ({
          ...prevRecords,
          [selectedId]: { ...formData },
        }));

        // Reset form
        setSelectedId("");
        setFormData({
          date: "",
          sender: "",
          receiver: "",
          notes: "",
        });
      })
      .catch((error) => {
        alert("Error updating record: " + error.message);
      });
  };

  return (
    <div className="container">
      {/* Records List */}
      <div className="record-list">
        <h3>Select a Record to Edit</h3>
        <input
          type="text"
          placeholder="Search by sender, receiver, or notes"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
          className="search-input"
        />
        {currentRecords.map((key) => (
          <div key={key} className="record">
            <p>
              <strong>ID:</strong> {key} | <strong>Date:</strong> {records[key].date} |{" "}
              <strong>Sender:</strong> {records[key].sender}
            </p>
            <button className="edit-button" onClick={() => handleSelectRecord(key)}>Edit</button>
          </div>
        ))}
        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {/* Update Form */}
      <div className="form-container">
        <h3>Edit Record</h3>
        {selectedId ? (
          <form onSubmit={handleSubmit}>
            <p style={{ color: "red", fontStyle: "italic" }}>
              Editing Record ID: {selectedId}
            </p>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="Date"
              required
              className="form-input"
            />
            <input
              type="text"
              name="sender"
              value={formData.sender}
              onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
              placeholder="Sender"
              required
              className="form-input"
            />
            <input
              type="text"
              name="receiver"
              value={formData.receiver}
              onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
              placeholder="Receiver"
              required
              className="form-input"
            />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notes"
              required
              className="form-textarea"
            />
            <button type="submit" className="submit-button">Update</button>
          </form>
        ) : (
          <p>Please select a record to edit.</p>
        )}
      </div>
    </div>
  );
}

export default UpdateData;
