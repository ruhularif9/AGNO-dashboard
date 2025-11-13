// src/api/client.ts
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function getDashboardData() {
  try {
    console.log("Backend URL:", backendUrl); // ✅ to confirm in console

    const res = await fetch(`${backendUrl}/api/dashboard/stats`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Dashboard data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
