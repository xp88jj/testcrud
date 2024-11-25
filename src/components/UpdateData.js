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
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Records List */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Select a Record to Edit
        </h3>
        <input
          type="text"
          placeholder="Search by sender, receiver, or notes"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
          className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {currentRecords.map((key) => (
          <div
            key={key}
            className="p-4 mb-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-gray-600">
              <strong>ID:</strong> {key} | <strong>Date:</strong> {records[key].date} |{" "}
              <strong>Sender:</strong> {records[key].sender}
            </p>
            <button
              onClick={() => handleSelectRecord(key)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Edit
            </button>
          </div>
        ))}
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Update Form */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Record</h3>
        {selectedId ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-red-500 italic">
              Editing Record ID: {selectedId}
            </p>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="sender"
              value={formData.sender}
              onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
              placeholder="Sender"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="receiver"
              value={formData.receiver}
              onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
              placeholder="Receiver"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notes"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Update
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Please select a record to edit.</p>
        )}
      </div>
    </div>
  );
}

export default UpdateData;
