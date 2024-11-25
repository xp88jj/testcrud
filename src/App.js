import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ReadData from "./components/ReadData";
import CreateData from "./components/CreateData";
import UpdateData from "./components/UpdateData";
import DeleteData from "./components/DeleteData";

const router = createBrowserRouter(
  [
    { path: "/", element: <Navigate to="/read" /> },
    { path: "/create", element: <CreateData /> },
    { path: "/read", element: <ReadData /> },
    { path: "/update", element: <UpdateData /> },
    { path: "/delete", element: <DeleteData /> },
  ],
  {
    future: {
      v7_startTransition: true, // Enable future state updates
      v7_relativeSplatPath: true, // Enable new route resolution
    },
  }
);

function App() {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 p-6">
      <header className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6 text-center">
        <h1 className="text-3xl font-bold">Control Panel</h1>
      </header>

      <div className="flex justify-center gap-4 mb-6">
        <a href="/create">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Create
          </button>
        </a>
        <a href="/read">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Read
          </button>
        </a>
        <a href="/update">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Update
          </button>
        </a>
        <a href="/delete">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Delete
          </button>
        </a>
      </div>

      <main className="bg-white p-6 rounded-lg shadow-lg">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
