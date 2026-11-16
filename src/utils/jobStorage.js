import defaultJobs from "../data/jobs";

const STORAGE_KEYS = {
  JOBS: "adminJobs",
  APPLICATIONS: "applications",
  SAVED_JOBS: "savedJobs",
};

// Initialize or get all jobs (combining default + user-posted jobs)
export function getStoredJobs() {
  try {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS));
    if (custom && Array.isArray(custom) && custom.length > 0) {
      return custom;
    }
  } catch (e) {
    console.warn("Could not read adminJobs from localStorage", e);
  }
  // If first time, initialize with defaultJobs
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(defaultJobs));
  } catch (e) {}
  return defaultJobs;
}

export function saveJobListing(jobData, existingId = null) {
  const currentJobs = getStoredJobs();
  let updatedJobs;

  if (existingId) {
    updatedJobs = currentJobs.map((j) =>
      Number(j.id) === Number(existingId) ? { ...j, ...jobData, id: j.id } : j
    );
  } else {
    const newJob = {
      id: Date.now(),
      applicantsCount: 0,
      postedTime: "Just now",
      rating: 4.8,
      featured: Boolean(jobData.featured),
      logoBg: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      tags: Array.isArray(jobData.tags)
        ? jobData.tags
        : typeof jobData.tags === "string"
        ? jobData.tags.split(",").map((s) => s.trim()).filter(Boolean)
        : ["Tech"],
      skills: Array.isArray(jobData.skills)
        ? jobData.skills
        : typeof jobData.skills === "string"
        ? jobData.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : ["Communication"],
      ...jobData,
    };
    updatedJobs = [newJob, ...currentJobs];
  }

  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updatedJobs));
  window.dispatchEvent(new Event("jobStorageUpdated"));
  return updatedJobs;
}

export function deleteJobListing(jobId) {
  const currentJobs = getStoredJobs();
  const updatedJobs = currentJobs.filter((j) => Number(j.id) !== Number(jobId));
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updatedJobs));
  window.dispatchEvent(new Event("jobStorageUpdated"));
  return updatedJobs;
}

export function getJobById(id) {
  const jobs = getStoredJobs();
  return jobs.find((j) => Number(j.id) === Number(id)) || null;
}

// ─── Applications Management ──────────────────────────────────────────

export function getStoredApplications() {
  try {
    const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS));
    if (apps && Array.isArray(apps)) return apps;
  } catch (e) {
    console.warn("Could not read applications from localStorage", e);
  }
  return [];
}

export function submitApplication(appData) {
  const currentApps = getStoredApplications();
  const newApp = {
    id: Date.now(),
    status: "Pending",
    appliedDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    ...appData,
  };

  const updated = [newApp, ...currentApps];
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));

  // Also increment applicantsCount on the job
  try {
    const jobs = getStoredJobs();
    const updatedJobs = jobs.map((j) => {
      if (Number(j.id) === Number(appData.jobId)) {
        return { ...j, applicantsCount: (j.applicantsCount || 0) + 1 };
      }
      return j;
    });
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updatedJobs));
  } catch (e) {}

  window.dispatchEvent(new Event("applicationStorageUpdated"));
  return newApp;
}

export function updateApplicationStatus(appId, newStatus) {
  const currentApps = getStoredApplications();
  const updated = currentApps.map((a) =>
    a.id === appId || String(a.id) === String(appId)
      ? { ...a, status: newStatus }
      : a
  );
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
  window.dispatchEvent(new Event("applicationStorageUpdated"));
  return updated;
}

export function deleteApplicationRecord(appId) {
  const currentApps = getStoredApplications();
  const updated = currentApps.filter(
    (a) => a.id !== appId && String(a.id) !== String(appId)
  );
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
  window.dispatchEvent(new Event("applicationStorageUpdated"));
  return updated;
}
