import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, CreditCard, BarChart3, Settings } from "lucide-react";

// Define menu items
const menu = [
  { name: "Overview", icon: <Home size={18} />, path: "/overview" },
  { name: "Users", icon: <Users size={18} />, path: "/users" },
  { name: "Sales", icon: <CreditCard size={18} />, path: "/sales" },
  { name: "Analytics", icon: <BarChart3 size={18} />, path: "/analytics" },
  { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 flex flex-col p-6 space-y-6 h-screen">
      <h1 className="text-2xl font-bold text-blue-400 mb-6 tracking-wide">AGNO</h1>

      <nav className="flex flex-col space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md transition-all duration-200 ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
