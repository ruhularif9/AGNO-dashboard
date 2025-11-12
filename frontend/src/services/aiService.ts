// src/services/aiService.ts

// -------------------------
// 🧩 Type Definitions
// -------------------------
export type DashboardStats = {
  activeUsers: number;
  revenue: number;
  newSignups: number;
  userGrowth: number;
  revenueGrowth: number;
};

export type ChartDataPoint = {
  name: string;
  value: number;
};

export type ChatMessage = {
  id: string;
  sender: "user" | "ai";
  content: string;
};

// -------------------------
// 🌐 API Base URL
// -------------------------
const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

// -------------------------
// 📊 Dashboard Services
// -------------------------

// ✅ Fetch overall dashboard statistics
export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/api/dashboard/stats`);
  if (!res.ok) {
    throw new Error(`fetchDashboardStats failed: ${res.statusText}`);
  }
  const data = await res.json();
  console.log("📊 Fetched dashboard stats:", data);
  return data;
}

// ✅ Fetch user growth chart data
export async function fetchUserGrowthChart(): Promise<ChartDataPoint[]> {
  const res = await fetch(`${API_BASE}/api/dashboard/user-growth`);
  if (!res.ok) {
    throw new Error(`fetchUserGrowthChart failed: ${res.statusText}`);
  }
  const data = await res.json();
  console.log("📈 Fetched user growth data:", data);
  return data;
}

// ✅ Fetch revenue growth chart data
export async function fetchRevenueChart(): Promise<ChartDataPoint[]> {
  const res = await fetch(`${API_BASE}/api/dashboard/revenue-growth`);
  if (!res.ok) {
    throw new Error(`fetchRevenueChart failed: ${res.statusText}`);
  }
  const data = await res.json();
  console.log("💰 Fetched revenue growth data:", data);
  return data;
}

// ✅ Add dashboard stats cumulatively — do not overwrite
export async function addDashboardData(
  newData: DashboardStats
): Promise<DashboardStats> {
  try {
    // 1️⃣ Fetch existing stats
    const currentStats = await fetchDashboardStats();
    console.log("🟢 Sending data to backend:", newData);

    // 2️⃣ Compute cumulative stats
    const cumulativeStats: DashboardStats = {
      activeUsers: currentStats.activeUsers + newData.activeUsers,
      revenue: currentStats.revenue + newData.revenue,
      newSignups: currentStats.newSignups + newData.newSignups,
      userGrowth: currentStats.userGrowth + newData.userGrowth,
      revenueGrowth: currentStats.revenueGrowth + newData.revenueGrowth,
    };

    // 3️⃣ Send updated stats to backend
    const res = await fetch(`${API_BASE}/api/dashboard/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cumulativeStats),
    });

    if (!res.ok) {
      throw new Error(`addDashboardData failed: ${res.statusText}`);
    }

    const updatedData = await res.json();
    console.log("✅ Backend response:", updatedData);

    return updatedData;
  } catch (err) {
    console.error("Error in addDashboardData:", err);
    throw err;
  }
}

// -------------------------
// 💬 Chat Service
// -------------------------
export async function sendChatMessage(message: string): Promise<ChatMessage> {
  const res = await fetch(`${API_BASE}/api/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw new Error(`sendChatMessage failed: ${res.statusText}`);
  }
  return res.json();
}
