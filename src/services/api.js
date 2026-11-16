// Base API URL - development mein localhost, production mein server URL
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper function - authenticated requests ke liye token attach karta hai
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic fetch wrapper
const request = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ─── AUTH APIs ─────────────────────────────────────────────────────────────

export const authAPI = {
  register: (userData) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(userData) }),

  login: (credentials) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),

  getMe: () => request("/auth/me"),

  updateProfile: (profileData) =>
    request("/auth/profile", { method: "PUT", body: JSON.stringify(profileData) }),
};

// ─── JOBS APIs ──────────────────────────────────────────────────────────────

export const jobsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/jobs${query ? `?${query}` : ""}`);
  },

  getById: (id) => request(`/jobs/${id}`),

  getMyPosted: () => request("/jobs/my/posted"),

  create: (jobData) =>
    request("/jobs", { method: "POST", body: JSON.stringify(jobData) }),

  update: (id, jobData) =>
    request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(jobData) }),

  delete: (id) => request(`/jobs/${id}`, { method: "DELETE" }),

  toggleSave: (id) => request(`/jobs/${id}/save`, { method: "POST" }),
};

// ─── APPLICATIONS APIs ──────────────────────────────────────────────────────

export const applicationsAPI = {
  apply: (applicationData) =>
    request("/applications", { method: "POST", body: JSON.stringify(applicationData) }),

  getMyApplications: () => request("/applications/my"),

  getEmployerApplications: () => request("/applications/employer"),

  // Admin / Recruiter
  getAll: () => request("/applications"),

  updateStatus: (id, status) =>
    request(`/applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  delete: (id) => request(`/applications/${id}`, { method: "DELETE" }),
};
