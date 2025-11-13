// src/api/client.ts

// Use your backend URL from Vercel environment variables
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Example API function
export async function getDashboardData() {
  try {
    const res = await fetch(`${backendUrl}/api/dashboard`);
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
