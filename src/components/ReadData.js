import React from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

function ReadData() {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const dbRef = ref(db, "letters");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data || {});
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Read Records
      </h2>
      {Object.keys(data).length > 0 ? (
        Object.keys(data).map((key) => (
          <div
            key={key}
            className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Letter ID: <span className="text-blue-500">{key}</span>
            </h3>
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span> {data[key].date}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Sender:</span> {data[key].sender}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Receiver:</span> {data[key].receiver}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Notes:</span> {data[key].notes}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No data available.</p>
      )}
    </div>
  );
}

export default ReadData;
