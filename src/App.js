import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReadData from "./components/ReadData";
import CreateData from "./components/CreateData";
import UpdateData from "./components/UpdateData";
import DeleteData from "./components/DeleteData";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Control Panel</h1>
        <div className="buttons">
          <Link to="/create">
            <button>Create</button>
          </Link>
          <Link to="/read">
            <button>Read</button>
          </Link>
          <Link to="/update">
            <button>Update</button>
          </Link>
          <Link to="/delete">
            <button>Delete</button>
          </Link>
        </div>

        <Routes>
          <Route path="/create" element={<CreateData />} />
          <Route path="/read" element={<ReadData />} />
          <Route path="/update" element={<UpdateData />} />
          <Route path="/delete" element={<DeleteData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
