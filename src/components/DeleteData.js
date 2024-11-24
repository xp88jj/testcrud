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
    <div>
      <h2>Delete Record</h2>
      <div>
        <h3>Select a Record to Delete:</h3>
        {Object.keys(records).length > 0 ? (
          Object.keys(records).map((key) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <p>
                <strong>ID:</strong> {key} | <strong>Date:</strong> {records[key].date} |{" "}
                <strong>Sender:</strong> {records[key].sender}
              </p>
              <button onClick={() => handleDelete(key)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No records available to delete.</p>
        )}
      </div>
    </div>
  );
}

export default DeleteData;
