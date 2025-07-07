import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { JobList } from "./Component/users/JobList";
import { Login } from "./Component/users/Login";
import { Register } from "./Component/users/Register";

import { Home } from "./Component/Home";

import JobPostForm from "./Component/Admin/JobPostForm";
import MyApplications from "./Component/users/MyApplications";
import AdminLayout from "./Component/Admin/AdminLayout";
import { UserLoginLayout } from "./Component/users/UserLoginLayout";
import { Footer } from "./Footer";
import { AdminDashboard } from "./Component/Admin/AdminDashboard";
import { AdminUsers } from "./Component/Admin/AdminUsers";
import { AdminManageJobs } from "./Component/Admin/AdminManageJobs";
import { AdminApplication } from "./Component/Admin/AdminApplication";
import { AdminLogin } from "./Component/Admin/AdminLogin";
import SavedJobs from "./Component/users/SavedJobs";
import { UserLogout } from "./Component/users/userLogout";
import { AdminLogout } from "./Component/Admin/AdminLogout";
import { AdminJobs } from "./Component/Admin/AdminJobs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/adminLayout" element={<AdminLayout />}>
          <Route
            path="/adminLayout/adminDashboard"
            element={<AdminDashboard />}
          />
          <Route path="/adminLayout/adminJobs" element={<AdminJobs />} />
          <Route
            path="/adminLayout/adminManageJobs"
            element={<AdminManageJobs />}
          />
          <Route path="/adminLayout/adminUsers" element={<AdminUsers />} />
          <Route path="/adminLayout/postJob" element={<JobPostForm />} />
          <Route
            path="/adminLayout/adminApplications"
            element={<AdminApplication />}
          />
          <Route path="/adminLayout/adminLogout" element={<AdminLogout />} />
        </Route>
        <Route path="/userLoginLayout" element={<UserLoginLayout />}>
          <Route path="/userLoginLayout/jobList" element={<JobList />} />
          <Route path="/userLoginLayout/saved-jobs" element={<SavedJobs />} />

          <Route
            path="/userLoginLayout/myApplication"
            element={<MyApplications />}
          />
          <Route path="/userLoginLayout/userLogout" element={<UserLogout />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/userRegister" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
