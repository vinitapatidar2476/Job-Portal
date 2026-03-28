import React, { useState } from "react";
import { User, Mail, Lock, ChevronRight, Briefcase, Users, Building, ShieldCheck } from "lucide-react";
import API from "../Api";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", formData);
      toast.success("Account created! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 hero-section">
      <ToastContainer autoClose={2000} />
      <div className="row w-100 justify-content-center mt-5 mb-5">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg rounded-4 p-4 p-lg-5 glass-card">
            <div className="text-center mb-5">
              <div className="premium-gradient d-inline-flex p-3 rounded-4 shadow-lg mb-4">
                <ShieldCheck size={32} color="white" />
              </div>
              <h2 className="fw-bold dashboard-title fs-2">Join JobPortal</h2>
              <p className="text-muted fw-semibold">Choose your path and start your journey</p>
            </div>

            <form onSubmit={handleRegister}>
              <div className="row g-3 mb-4 justify-content-center">
                <div className="col-md-5">
                  <input
                    type="radio"
                    className="btn-check"
                    name="role"
                    id="seeker"
                    value="seeker"
                    checked={formData.role === "seeker"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <label className="btn btn-outline-primary w-100 p-3 h-100 d-flex flex-column align-items-center justify-content-center border-0 premium-card gap-2" htmlFor="seeker">
                    <Users size={24} /> Seeker
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="radio"
                    className="btn-check"
                    name="role"
                    id="employer"
                    value="employer"
                    checked={formData.role === "employer"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <label className="btn btn-outline-primary w-100 p-3 h-100 d-flex flex-column align-items-center justify-content-center border-0 premium-card gap-2" htmlFor="employer">
                    <Building size={24} /> Employer
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-dark mb-2">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-3 p-3">
                    <User size={18} className="text-primary" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 rounded-end-3 p-3"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-dark mb-2">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-3 p-3">
                    <Mail size={18} className="text-primary" />
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 rounded-end-3 p-3"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-dark mb-2">Create Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-3 p-3">
                    <Lock size={18} className="text-primary" />
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 rounded-end-3 p-3"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-premium w-100 py-3 shadow-lg d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"} <ChevronRight size={18} />
              </button>
            </form>

            <div className="text-center mt-5 p-3 border-top border-light">
              <p className="text-muted mb-0 fw-semibold">Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
