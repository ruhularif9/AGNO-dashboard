import { useState } from "react";
import Dashboard from "../pages/Dashboard";
import Navbar from "../components/Navbar";

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "users", label: "Users" },
  { id: "analytics", label: "Analytics" },
  { id: "sales", label: "Sales" },
  { id: "settings", label: "Settings" },
];

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard searchQuery={searchQuery} />;
      case "users":
        return <div className="p-6 text-gray-200">Users Management Placeholder</div>;
      case "analytics":
        return <div className="p-6 text-gray-200">Analytics Placeholder</div>;
      case "sales":
        return <div className="p-6 text-gray-200">Sales Placeholder</div>;
      case "settings":
        return <div className="p-6 text-gray-200">Settings Placeholder</div>;
      default:
        return <Dashboard searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-60 bg-gray-800 flex flex-col text-gray-300">
        <div className="text-2xl font-bold p-6 text-blue-400 border-b border-gray-700">
          AGNO OS
        </div>
        <nav className="flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition ${
                activeTab === item.id ? "bg-gray-700 font-semibold text-blue-400" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Navbar with search handler */}
        <Navbar onSearch={setSearchQuery} />

        {/* Dashboard / other tab content */}
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
