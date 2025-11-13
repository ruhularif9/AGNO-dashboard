console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

export async function getDashboardData() {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Fetching data from:", `${backendUrl}/stats`);
    
    const res = await fetch(`${backendUrl}/stats`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
