const API_BASE = "http://127.0.0.1:5000";

// 🔹 Generic API Request Function
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error("API request failed");
    }

    return await res.json();
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
}

// 🔹 GET request
export const getData = (endpoint: string) => {
  return apiRequest(endpoint, {
    method: "GET",
  });
};

// 🔹 POST request
export const postData = (endpoint: string, data: any) => {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// 🔹 PUT request
export const putData = (endpoint: string, data: any) => {
  return apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// 🔹 DELETE request
export const deleteData = (endpoint: string) => {
  return apiRequest(endpoint, {
    method: "DELETE",
  });
};

// 🔹 CSV Upload (SPECIAL CASE)
export const uploadCSV = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload-csv`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("CSV Upload Failed");
  }

  return res.json();
};