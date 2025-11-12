import { useState, type ChangeEvent } from "react";
import { Search, Bell } from "lucide-react";
import ChatWidget from "./ChatWidget";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [chatOpen, setChatOpen] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className="w-full bg-gray-900 p-4 flex justify-between items-center shadow relative">
      {/* Left: Title + Search */}
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-blue-400">Dashboard</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="pl-8 pr-3 py-1 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Right: Bell + Profile Avatar + Chat Icon */}
      <div className="flex items-center space-x-4 relative">
        {/* Chat toggle button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Chat
        </button>

        {/* Bell icon */}
        <Bell className="text-gray-400" size={20} />

        {/* Anime-style Profile avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400">
          <img
            src="https://api.dicebear.com/6.x/adventurer/svg?seed=anime" // cartoon/anime avatar
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Chat dropdown */}
        {chatOpen && (
          <div className="absolute top-full right-0 mt-2 z-50">
            <ChatWidget />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
