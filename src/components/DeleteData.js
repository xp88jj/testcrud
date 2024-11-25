import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure firebase.js exists and is configured
import { ref, onValue, remove } from "firebase/database";

function DeleteData() {
  const [records, setRecords] = useState({});

  // Fetch records from Firebase
  useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setRecords(data || {});
    });
  }, []);

  // Handle the deletion process
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete record ID: ${id}?`)) {
      const dbRef = ref(db, `letters/${id}`);
      remove(dbRef)
        .then(() => {
          alert(`Record ${id} deleted successfully!`);
        })
        .catch((error) => alert("Error deleting data: " + error.message));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Delete Record
      </h2>
      <div>
        <h3 className="text-xl font-semibold text-gray-600 mb-4">
          Select a Record to Delete:
        </h3>
        {Object.keys(records).length > 0 ? (
          Object.keys(records).map((key) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 mb-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">ID:</span> {key}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span> {records[key].date}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Sender:</span> {records[key].sender}
                </p>
              </div>
              <button
                onClick={() => handleDelete(key)}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No records available to delete.</p>
        )}
      </div>
    </div>
  );
}

export default DeleteData;
