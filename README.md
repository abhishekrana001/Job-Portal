# 🚀 JobPortal - Naukri & Indeed Clone (2-User Platform)

A full-stack, enterprise-grade Job Portal built with **React 19**, **Vite**, **Express 5**, and **MongoDB**. Designed to mirror the core workflows of **Naukri.com** and **Indeed**, supporting two distinct, end-to-end user types: **Employers / Recruiters** (who post and manage jobs & candidates) and **Job Seekers / Candidates** (who search, filter, and apply for jobs with real-time status tracking).

---

## 🌟 दो प्रकार के यूज़र्स (Two Types of Users)

### 🏢 1. Employer / Recruiter (जॉब पोस्ट करने वाला)
* **Employer Registration & Profile:** रजिस्टर करते समय Company Name, Official Email, और Designation दर्ज कर सकते हैं।
* **Post a New Job (+ Post Job):**
  * Job Title, Company Name, Location, Workplace Type (Remote / Hybrid / On-site)
  * Job Type (Full Time, Part Time, Contract, Internship)
  * Salary Range (e.g. ₹12 - ₹18 LPA), Experience Level (e.g. 2-5 Years)
  * Tech Skills / Tags (React, Node.js, Java, Python, UI/UX, Docker, AWS)
  * Job Description, Requirements, और Responsibilities
* **Manage Posted Jobs:** अपनी पोस्ट की गई सभी जॉब्स देखना, Edit करना, Delete करना, और Applicant count ट्रैक करना।
* **Review Candidate Applications:**
  * किस कैंडिडेट ने किस जॉब पर अप्लाई किया है उसकी पूरी प्रोफाइल देखें।
  * Candidate Name, Email, Phone, Cover Letter, और **Resume Link (1-click preview)**।
* **Live Status Management:**
  * रिक्रूटर कैंडिडेट का स्टेटस चेंज कर सकता है: `Pending` ➔ `Under Review` ➔ `Shortlisted` ➔ `Hired` या `Rejected`।
* **Employer Dashboard Metrics:** Total Active Jobs, Total Applicants Received, Shortlisted candidates, और Quick Actions।

---

### 👨‍💻 2. Job Seeker / Candidate (जॉब सर्च और अप्लाई करने वाला)
* **Candidate Registration & Profile:** नाम, ईमेल, पासवर्ड, टार्गेट रोल / टाइटल, स्किल्स और बायो।
* **Advanced Job Search & Filters (Naukri / Indeed Style):**
  * **Keyword Search:** Job Title, Company Name, या Skills (React, Java, Backend, UI/UX) से सर्च करें।
  * **Location Filter:** City (Chandigarh, Mohali, Bangalore, Delhi) या Remote।
  * **Job Type Filter:** Full Time, Part Time, Internship, Contract।
  * **Workplace Filter:** Remote, Hybrid, On-site।
  * **Category & Experience Filter:** React, Java, Backend, UI/UX, Software Engineer।
  * **Sorting:** Sort by Latest, Salary, Company Name।
  * **Grid & List Views:** अपनी पसंद के अनुसार व्यू मोड बदलें।
* **Real-Time Job Synchronization:** जैसे ही कोई Employer जॉब पोस्ट करता है, वह तुरंत सभी Job Seekers के सर्च रिजल्ट्स में दिखने लगती है!
* **Detailed Job Overview:** Full Job Description, Responsibilities, Skills required, Company Verification Badge, और Similar Jobs।
* **Apply for Jobs (Resume & Cover Letter):**
  * One-Click Apply या Detailed Form
  * Applicant Full Name, Email, Phone
  * Resume URL (Drive link / PDF) और Sample Resume Auto-Fill
  * Personal Cover Letter
* **My Applications Tracking Dashboard:**
  * अपने सभी अप्लाई किए गए जॉब्स की लिस्ट देखें।
  * **Live Status Tracking:** जैसे ही Recruiter स्टेटस अपडेट करता है (`Pending`, `Under Review`, `Shortlisted`, `Hired`, `Rejected`), कैंडिडेट को रियल-टाइम में नया स्टेटस दिखता है।
  * Filter by Status & Withdraw Application विकल्प।
* **Bookmark / Saved Jobs:** अपनी पसंदीदा जॉब्स को सेव करें और बाद में कभी भी देखें।

---

## ⚡ Quick Demo Credentials (1-क्लिक टेस्टिंग)

लॉगिन पेज पर instant fill बटन्स दिए गए हैं ताकि बिना टाइम वेस्ट किए टेस्ट किया जा सके:

| Role | Email | Password | Access / Flow |
|---|---|---|---|
| 👨‍💼 **Job Seeker (Candidate)** | `demo@jobportal.com` | `Demo@123` | Search, Filters, Apply with Resume, Track Applications, Save Jobs |
| 🏢 **Recruiter / Company (Employer)** | `recruiter@techsolutions.com` | `Recruiter@123` | Post Jobs, Manage Listings, Review Resumes, Update Candidate Status |

---

## 🛠️ Tech Stack & Architecture

### Frontend:
* **React 19** with Fast Refresh
* **Vite 8** for ultra-fast bundling and build
* **React Router DOM 7** for declarative client-side routing & route guards (`ProtectedRoute`, `AdminRoute`)
* **Lucide React** for modern UI icons
* **Custom Responsive CSS** with Glassmorphism, CSS Grid, Flexbox, Dark theme support

### Backend:
* **Node.js** & **Express 5** RESTful API server
* **MongoDB** with **Mongoose 9** ODM schemas
* **JWT (JSON Web Tokens)** for stateless, secure authentication
* **Bcryptjs** for salt-hashed password security
* **CORS** & **Dotenv** configuration

### 🔄 Dual-Mode Offline/Online Resilient Storage:
* यदि MongoDB डेटाबेस ऑनलाइन है, तो REST API के माध्यम से पूरा डेटाबेस सिंक होता है।
* यदि MongoDB ऑफलाइन है या डेवलपमेंट मोड में तुरंत टेस्ट करना हो, तो स्मार्ट लोकल सिंक्रोनाइज़ेशन लेयर (`jobStorage.js`) ऑटो-फॉलस्टार्ट करती है — जिससे बिना किसी सर्वर एरर के रिक्रूटर की पोस्ट की गई जॉब्स और कैंडिडेट के अप्लिकेशन्स 100% परसिस्टेंट रहते हैं!

---

## 📁 Project Directory Structure

```text
job-portal/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile with roles
│   │   ├── jobController.js      # Job CRUD, search/filter, recruiter's posted jobs
│   │   └── applicationController.js # Apply, candidate status, recruiter applicants
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification, employerOrAdmin guard
│   ├── models/
│   │   ├── User.js               # User schema (roles: candidate, employer, admin)
│   │   ├── Job.js                # Job schema (title, company, salary, skills, tags)
│   │   └── Application.js        # Application schema (status, resumeUrl, snapshot)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   ├── jobRoutes.js          # /api/jobs routes
│   │   └── applicationRoutes.js  # /api/applications routes
│   ├── seeder.js                 # Sample database seeder
│   ├── server.js                 # Express server bootstrap & middleware
│   ├── package.json
│   └── .env                      # Backend environment variables
│
├── src/
│   ├── assets/                   # Images & logos
│   ├── components/
│   │   ├── Navbar.jsx / .css     # Dynamic Navbar (Candidate vs Employer vs Guest)
│   │   ├── Footer.jsx / .css     # Footer component
│   │   ├── JobCard.jsx / .css    # Modern job preview card with tags
│   │   ├── ProtectedRoute.jsx    # Candidate route protection
│   │   └── AdminRoute.jsx        # Employer & Admin route protection
│   ├── context/
│   │   ├── AuthContext.jsx       # Auth state, role detection (isEmployer, isJobSeeker)
│   │   └── ToastContext.jsx      # Notifications toast system
│   ├── data/
│   │   └── jobs.js               # Initial curated high-tech jobs
│   ├── pages/
│   │   ├── Home.jsx / .css       # Landing page with hero search & categories
│   │   ├── Jobs.jsx / .css       # Search, filter by location/skills/type, sort
│   │   ├── JobDetails.jsx / .css # Detailed job spec, requirements, apply CTA
│   │   ├── ApplyJob.jsx / .css   # Application form with Resume link & cover letter
│   │   ├── Applications.jsx      # Candidate's "My Applications" tracking dashboard
│   │   ├── SavedJobs.jsx         # Candidate's bookmarked jobs
│   │   ├── AdminDashboard.jsx    # Employer/Admin portal (post jobs, review applicants)
│   │   ├── Login.jsx             # Quick 1-click login for Candidate/Employer/Admin
│   │   ├── Register.jsx          # Role selector (Job Seeker vs Employer)
│   │   ├── Profile.jsx           # User profile editor
│   │   ├── Companies.jsx         # Featured hiring companies
│   │   └── NotFound.jsx          # 404 page
│   ├── services/
│   │   └── api.js                # Unified REST API service wrapper
│   ├── utils/
│   │   └── jobStorage.js         # Centralized real-time storage & sync engine
│   ├── App.jsx                   # Main React routing setup
│   └── main.jsx                  # React DOM render entry
│
├── .env                          # Frontend environment config
├── package.json
└── README.md                     # Complete project documentation
```

---

## 🚀 Installation & Setup Guide (शुरू करने का तरीका)

### Step 1: Clone & Install Frontend Dependencies
```bash
# Navigate to the project root directory
cd job-portal

# Install frontend packages
npm install
```

### Step 2: Install Backend Dependencies
```bash
# Navigate to the backend directory
cd backend

# Install backend packages
npm install

# Return to root directory
cd ..
```

### Step 3: Configure Environment Variables

**Frontend (`.env` in root directory):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (`backend/.env`):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=jobportal_super_secret_jwt_key_2026
JWT_EXPIRES_IN=7d
NODE_ENV=development
ADMIN_EMAIL=admin@jobportal.com
ADMIN_PASSWORD=Admin@123
```

### Step 4: Run the Application

#### Option A: Run Frontend (Client)
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

#### Option B: Run Backend (API Server)
```bash
cd backend
npm run dev
# Or: npm start
```
The server will start on **[http://localhost:5000](http://localhost:5000)**.

---

## 📡 REST API Documentation

### 🔐 Auth Endpoints (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register Candidate or Employer (`role`, `companyName`) | Public |
| `POST` | `/api/auth/login` | Login user, recruiter, or admin | Public |
| `GET` | `/api/auth/me` | Fetch currently authenticated user | Private |
| `PUT` | `/api/auth/profile` | Update profile, skills, bio, links | Private |

### 💼 Jobs Endpoints (`/api/jobs`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/jobs` | Get all jobs with query filters (`search`, `location`, `type`, `category`) | Public |
| `GET` | `/api/jobs/:id` | Get single job details by ID | Public |
| `GET` | `/api/jobs/my/posted` | Get all jobs posted by the logged-in Employer | Private (Employer/Admin) |
| `POST` | `/api/jobs` | Create / Post a new job | Private (Employer/Admin) |
| `PUT` | `/api/jobs/:id` | Update an existing job | Private (Employer/Admin) |
| `DELETE` | `/api/jobs/:id` | Delete a job listing | Private (Employer/Admin) |
| `POST` | `/api/jobs/:id/save` | Toggle save/bookmark job | Private (Job Seeker) |

### 📄 Applications Endpoints (`/api/applications`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/applications` | Apply for a job (Resume URL, cover letter, details) | Private (Job Seeker) |
| `GET` | `/api/applications/my` | Get all applications of the logged-in Candidate | Private (Job Seeker) |
| `GET` | `/api/applications/employer` | Get all candidate applications for Employer's jobs | Private (Employer/Admin) |
| `PUT` | `/api/applications/:id/status` | Update application status (`Shortlisted`, `Hired`, etc.) | Private (Employer/Admin) |
| `DELETE` | `/api/applications/:id` | Withdraw or delete an application | Private |

---

## 🎯 Complete User Journey Walkthrough (पूरा वर्कफ़्लो)

```text
[ Recruiter Flow ]
1. Recruiter signs in (Click "Employer" on Login page)
2. Clicks "+ Post Job" in Navbar or Employer Dashboard
3. Fills in Role Title, Skills, Salary, Location, and Description
4. Clicks "Post Job" ➔ Job is instantly live!

[ Candidate Flow ]
5. Candidate signs in (Click "Candidate" on Login page)
6. Searches or browses for jobs on /jobs with filters
7. Sees the newly posted job by the Recruiter
8. Opens Job Details ➔ Clicks "Apply For Position"
9. Fills in phone, cover letter, resume link ➔ Submits Application

[ Recruiter Review & Status Flow ]
10. Recruiter opens "Employer Dashboard" ➔ "Applications" tab
11. Views candidate's details & clicks "Resume Preview"
12. Changes Status from "Pending" to "Shortlisted" or "Hired"

[ Candidate Live Feedback Flow ]
13. Candidate opens "My Applications"
14. Instantly sees updated status badge ("Shortlisted" / "Hired")!
```

---

## 🛡️ License & Contributions
Developed for high performance and production readiness. Free to customize, scale, and deploy.

लॉगिन पेज पर instant fill बटन्स दिए गए हैं ताकि बिना टाइम वेस्ट किए टेस्ट किया जा सके:

| Role | Email | Password | Access / Flow |
|---|---|---|---|
| 👨‍💼 **Job Seeker (Candidate)** | `demo@jobportal.com` | `Demo@123` | Search, Filters, Apply with Resume, Track Applications, Save Jobs |
| 🏢 **Recruiter / Company (Employer)** | `recruiter@techsolutions.com` | `Recruiter@123` | Post Jobs, Manage Listings, Review Resumes, Update Candidate Status |

---

## 🛠️ Tech Stack & Architecture

### Frontend:
* **React 19** with Fast Refresh
* **Vite 8** for ultra-fast bundling and build
* **React Router DOM 7** for declarative client-side routing & route guards (`ProtectedRoute`, `AdminRoute`)
* **Lucide React** for modern UI icons
* **Custom Responsive CSS** with Glassmorphism, CSS Grid, Flexbox, Dark theme support

### Backend:
* **Node.js** & **Express 5** RESTful API server
* **MongoDB** with **Mongoose 9** ODM schemas
* **JWT (JSON Web Tokens)** for stateless, secure authentication
* **Bcryptjs** for salt-hashed password security
* **CORS** & **Dotenv** configuration

### 🔄 Dual-Mode Offline/Online Resilient Storage:
* यदि MongoDB डेटाबेस ऑनलाइन है, तो REST API के माध्यम से पूरा डेटाबेस सिंक होता है।
* यदि MongoDB ऑफलाइन है या डेवलपमेंट मोड में तुरंत टेस्ट करना हो, तो स्मार्ट लोकल सिंक्रोनाइज़ेशन लेयर (`jobStorage.js`) ऑटो-फॉलस्टार्ट करती है — जिससे बिना किसी सर्वर एरर के रिक्रूटर की पोस्ट की गई जॉब्स और कैंडिडेट के अप्लिकेशन्स 100% परसिस्टेंट रहते हैं!

---

## 📁 Project Directory Structure

```text
job-portal/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile with roles
│   │   ├── jobController.js      # Job CRUD, search/filter, recruiter's posted jobs
│   │   └── applicationController.js # Apply, candidate status, recruiter applicants
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification, employerOrAdmin guard
│   ├── models/
│   │   ├── User.js               # User schema (roles: candidate, employer, admin)
│   │   ├── Job.js                # Job schema (title, company, salary, skills, tags)
│   │   └── Application.js        # Application schema (status, resumeUrl, snapshot)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   ├── jobRoutes.js          # /api/jobs routes
│   │   └── applicationRoutes.js  # /api/applications routes
│   ├── seeder.js                 # Sample database seeder
│   ├── server.js                 # Express server bootstrap & middleware
│   ├── package.json
│   └── .env                      # Backend environment variables
│
├── src/
│   ├── assets/                   # Images & logos
│   ├── components/
│   │   ├── Navbar.jsx / .css     # Dynamic Navbar (Candidate vs Employer vs Guest)
│   │   ├── Footer.jsx / .css     # Footer component
│   │   ├── JobCard.jsx / .css    # Modern job preview card with tags
│   │   ├── ProtectedRoute.jsx    # Candidate route protection
│   │   └── AdminRoute.jsx        # Employer & Admin route protection
│   ├── context/
│   │   ├── AuthContext.jsx       # Auth state, role detection (isEmployer, isJobSeeker)
│   │   └── ToastContext.jsx      # Notifications toast system
│   ├── data/
│   │   └── jobs.js               # Initial curated high-tech jobs
│   ├── pages/
│   │   ├── Home.jsx / .css       # Landing page with hero search & categories
│   │   ├── Jobs.jsx / .css       # Search, filter by location/skills/type, sort
│   │   ├── JobDetails.jsx / .css # Detailed job spec, requirements, apply CTA
│   │   ├── ApplyJob.jsx / .css   # Application form with Resume link & cover letter
│   │   ├── Applications.jsx      # Candidate's "My Applications" tracking dashboard
│   │   ├── SavedJobs.jsx         # Candidate's bookmarked jobs
│   │   ├── AdminDashboard.jsx    # Employer/Admin portal (post jobs, review applicants)
│   │   ├── Login.jsx             # Quick 1-click login for Candidate/Employer/Admin
│   │   ├── Register.jsx          # Role selector (Job Seeker vs Employer)
│   │   ├── Profile.jsx           # User profile editor
│   │   ├── Companies.jsx         # Featured hiring companies
│   │   └── NotFound.jsx          # 404 page
│   ├── services/
│   │   └── api.js                # Unified REST API service wrapper
│   ├── utils/
│   │   └── jobStorage.js         # Centralized real-time storage & sync engine
│   ├── App.jsx                   # Main React routing setup
│   └── main.jsx                  # React DOM render entry
│
├── .env                          # Frontend environment config
├── package.json
└── README.md                     # Complete project documentation
```

---

## 🚀 Installation & Setup Guide (शुरू करने का तरीका)

### Step 1: Clone & Install Frontend Dependencies
```bash
# Navigate to the project root directory
cd job-portal

# Install frontend packages
npm install
```

### Step 2: Install Backend Dependencies
```bash
# Navigate to the backend directory
cd backend

# Install backend packages
npm install

# Return to root directory
cd ..
```

### Step 3: Configure Environment Variables

**Frontend (`.env` in root directory):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (`backend/.env`):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=jobportal_super_secret_jwt_key_2026
JWT_EXPIRES_IN=7d
NODE_ENV=development
ADMIN_EMAIL=admin@jobportal.com
ADMIN_PASSWORD=Admin@123
```

### Step 4: Run the Application

#### Option A: Run Frontend (Client)
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

#### Option B: Run Backend (API Server)
```bash
cd backend
npm run dev
# Or: npm start
```
The server will start on **[http://localhost:5000](http://localhost:5000)**.

---

## 📡 REST API Documentation

### 🔐 Auth Endpoints (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register Candidate or Employer (`role`, `companyName`) | Public |
| `POST` | `/api/auth/login` | Login user, recruiter, or admin | Public |
| `GET` | `/api/auth/me` | Fetch currently authenticated user | Private |
| `PUT` | `/api/auth/profile` | Update profile, skills, bio, links | Private |

### 💼 Jobs Endpoints (`/api/jobs`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/jobs` | Get all jobs with query filters (`search`, `location`, `type`, `category`) | Public |
| `GET` | `/api/jobs/:id` | Get single job details by ID | Public |
| `GET` | `/api/jobs/my/posted` | Get all jobs posted by the logged-in Employer | Private (Employer/Admin) |
| `POST` | `/api/jobs` | Create / Post a new job | Private (Employer/Admin) |
| `PUT` | `/api/jobs/:id` | Update an existing job | Private (Employer/Admin) |
| `DELETE` | `/api/jobs/:id` | Delete a job listing | Private (Employer/Admin) |
| `POST` | `/api/jobs/:id/save` | Toggle save/bookmark job | Private (Job Seeker) |

### 📄 Applications Endpoints (`/api/applications`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/applications` | Apply for a job (Resume URL, cover letter, details) | Private (Job Seeker) |
| `GET` | `/api/applications/my` | Get all applications of the logged-in Candidate | Private (Job Seeker) |
| `GET` | `/api/applications/employer` | Get all candidate applications for Employer's jobs | Private (Employer/Admin) |
| `PUT` | `/api/applications/:id/status` | Update application status (`Shortlisted`, `Hired`, etc.) | Private (Employer/Admin) |
| `DELETE` | `/api/applications/:id` | Withdraw or delete an application | Private |

---

## 🎯 Complete User Journey Walkthrough (पूरा वर्कफ़्लो)

```text
[ Recruiter Flow ]
1. Recruiter signs in (Click "Employer" on Login page)
2. Clicks "+ Post Job" in Navbar or Employer Dashboard
3. Fills in Role Title, Skills, Salary, Location, and Description
4. Clicks "Post Job" ➔ Job is instantly live!

[ Candidate Flow ]
5. Candidate signs in (Click "Candidate" on Login page)
6. Searches or browses for jobs on /jobs with filters
7. Sees the newly posted job by the Recruiter
8. Opens Job Details ➔ Clicks "Apply For Position"
9. Fills in phone, cover letter, resume link ➔ Submits Application

[ Recruiter Review & Status Flow ]
10. Recruiter opens "Employer Dashboard" ➔ "Applications" tab
11. Views candidate's details & clicks "Resume Preview"
12. Changes Status from "Pending" to "Shortlisted" or "Hired"

[ Candidate Live Feedback Flow ]
13. Candidate opens "My Applications"
14. Instantly sees updated status badge ("Shortlisted" / "Hired")!
```

---

## 🛡️ License & Contributions
Developed for high performance and production readiness. Free to customize, scale, and deploy.
