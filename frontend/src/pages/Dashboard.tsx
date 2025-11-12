import { useEffect, useState } from "react";
import AddDashboardModal from "../components/AddDashboardModal";
import { Plus } from "lucide-react";

import DashboardCard from "../components/DashboardCard";
import { Users, DollarSign, UserPlus } from "lucide-react";
import type { DashboardStats, ChartDataPoint } from "../services/aiService";
import {
  fetchDashboardStats,
  fetchUserGrowthChart,
  fetchRevenueChart,
  addDashboardData,
} from "../services/aiService";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Accept searchQuery prop
interface DashboardProps {
  searchQuery: string;
}

const Dashboard: React.FC<DashboardProps> = ({ searchQuery }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userChart, setUserChart] = useState<ChartDataPoint[]>([]);
  const [revenueChart, setRevenueChart] = useState<ChartDataPoint[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // -----------------------------
  // Fetch all dashboard data
  // -----------------------------
  const fetchAll = async () => {
    try {
      setLoadingStats(true);
      const statsData = await fetchDashboardStats();
      setStats(statsData);
      setLoadingStats(false);

      setLoadingCharts(true);
      const [fetchedUserChart, fetchedRevenueChart] = await Promise.all([
        fetchUserGrowthChart(),
        fetchRevenueChart(),
      ]);

      // Merge with latest stats for cumulative display
      const updatedUserChart = [
        ...fetchedUserChart,
        { name: `Day ${fetchedUserChart.length + 1}`, value: statsData.activeUsers },
      ];
      const updatedRevenueChart = [
        ...fetchedRevenueChart,
        { name: `Day ${fetchedRevenueChart.length + 1}`, value: statsData.revenue },
      ];

      setUserChart(updatedUserChart);
      setRevenueChart(updatedRevenueChart);
      setLoadingCharts(false);
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data.");
      setLoadingStats(false);
      setLoadingCharts(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // -----------------------------
  // Handle AddDashboardModal submit
  // -----------------------------
  const handleAddData = async (formData: DashboardStats) => {
    try {
      await addDashboardData(formData);
      await fetchAll();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding dashboard data:", err);
      alert("Failed to add dashboard data. Check console for details.");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (loadingStats || !stats) return <div className="text-gray-300">Loading dashboard...</div>;

  // -----------------------------
  // Filter cards by search query
  // -----------------------------
  const allCards = [
    { title: "Active Users", value: stats.activeUsers, color: "blue" as const, icon: <Users size={24} /> },
    { title: "Revenue", value: `$${stats.revenue}`, color: "lightBlue" as const, icon: <DollarSign size={24} /> },
    { title: "New Signups", value: stats.newSignups, color: "cyan" as const, icon: <UserPlus size={24} /> },
  ];

  const filteredCards = allCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-300">Welcome Back!</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value}
            color={card.color}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Line Chart */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="font-semibold text-blue-400 mb-2">User Growth</h2>
          {loadingCharts ? (
            <p className="text-gray-400">Loading chart...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userChart}>
                <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} />
                <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Revenue Growth Bar Chart */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="font-semibold text-blue-400 mb-2">Revenue Growth</h2>
          {loadingCharts ? (
            <p className="text-gray-400">Loading chart...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChart}>
                <Bar dataKey="value" fill="#3b82f6" />
                <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Modal */}
      <AddDashboardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddData} />
    </div>
  );
};

export default Dashboard;
