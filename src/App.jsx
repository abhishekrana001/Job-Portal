import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplyJob from "./pages/ApplyJob";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JobDetails from "./pages/JobDetails";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import SavedJobs from "./pages/SavedJobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Companies from "./pages/Companies";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

  <Route path="/" element={<Home />} />

  <Route path="/jobs" element={<Jobs />} />
    <Route path="/companies" element={<Companies />} />
  <Route
    path="/jobs/:id"
    element={<JobDetails />}
  />

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/register"
    element={<Register />}
  />

  {/* Protected Routes */}

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />

  <Route
    path="/applications"
    element={
      <ProtectedRoute>
        <Applications />
      </ProtectedRoute>
    }
  />

  <Route
    path="/saved-jobs"
    element={
      <ProtectedRoute>
        <SavedJobs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/jobs/:id/apply"
    element={
      <ProtectedRoute>
        <ApplyJob />
      </ProtectedRoute>
    }
  />
  <Route path="*" element={<NotFound />} />

</Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;