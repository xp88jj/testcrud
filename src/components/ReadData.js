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
    <div>
      <h2>Read Records</h2>
      {Object.keys(data).length > 0 ? (
        Object.keys(data).map((key) => (
          <div key={key}>
            <h3>Letter {key}</h3>
            <p>Date: {data[key].date}</p>
            <p>Sender: {data[key].sender}</p>
            <p>Receiver: {data[key].receiver}</p>
            <p>Notes: {data[key].notes}</p>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default ReadData;
