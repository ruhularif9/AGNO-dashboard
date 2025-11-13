import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Sales from "./pages/Sales";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
const App = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Pass search state handler to Navbar */}
          <Navbar onSearch={setSearchQuery} />

          <main className="p-6 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              {/* Pass searchQuery prop to Dashboard */}
              <Route path="/overview" element={<Dashboard searchQuery={searchQuery} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
