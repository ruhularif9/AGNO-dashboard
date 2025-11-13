// src/api/client.ts
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function getDashboardData() {
  try {
    const res = await fetch(`${backendUrl}/api/dashboard/stats`); // 👈 add /stats
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
