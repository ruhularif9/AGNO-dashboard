
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function getDashboardData() {
  try {
    const res = await fetch(`${backendUrl}/api/dashboard`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
