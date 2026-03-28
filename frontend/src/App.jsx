import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { JobList } from "./Component/users/JobList";
import { Login } from "./Component/users/Login";
import { Register } from "./Component/users/Register";
import { Home } from "./Component/Home";
import { MyApplications } from "./Component/users/MyApplications";
import { AdminDashboard } from "./Component/Admin/AdminDashboard";
import { EmployerDashboard } from "./Component/Employer/EmployerDashboard";
import { NavBar } from "./Component/NavBar";
import ProtectedRoute from "./Component/ProtectedRoute";
import SavedJobs from "./Component/users/SavedJobs";
import { Footer } from "./Component/Footer";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><NavBar/><Home /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/userRegister" element={<Register />} />
        
        {/* Job Seeker Routes */}
        <Route path="/userLoginLayout" element={<ProtectedRoute role="seeker" />}>
           <Route path="jobList" element={<><NavBar/><JobList /><Footer /></>} />
           <Route path="myApplication" element={<><MyApplications /><Footer /></>} />
           <Route path="savedJobs" element={<><SavedJobs /><Footer /></>} />
        </Route>

        {/* Employer Routes */}
        <Route path="/employerLayout" element={<ProtectedRoute role="employer" />}>
           <Route path="dashboard" element={<EmployerDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/adminLayout" element={<ProtectedRoute role="admin" />}>
           <Route path="adminDashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
