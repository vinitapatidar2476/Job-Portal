import React, { useState } from "react";
import { LogIn, User, Lock, Mail, ChevronRight, Briefcase } from "lucide-react";
import API from "../Api";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 hero-section">
      <ToastContainer autoClose={2000} />
      <div className="row w-100 justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 p-4 p-lg-5 glass-card">
            <div className="text-center mb-5">
              <div className="premium-gradient d-inline-flex p-3 rounded-4 shadow-lg mb-4">
                <Briefcase size={32} color="white" />
              </div>
              <h2 className="fw-bold dashboard-title fs-2">Welcome Back</h2>
              <p className="text-muted fw-semibold">Discover your dream job today</p>
            </div>

            <form onSubmit={handleLogin}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-dark mb-2">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-3 p-3">
                    <Lock size={18} className="text-primary" />
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 rounded-end-3 p-3"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>



              <button type="submit" className="btn btn-premium w-100 py-3 shadow-lg d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                {loading ? "Logging in..." : "Login Now"} <ChevronRight size={18} />
              </button>
            </form>

            <div className="text-center mt-5 p-3 border-top border-light">
              <p className="text-muted mb-0 fw-semibold">Don't have an account? <Link to="/userRegister" className="text-primary text-decoration-none fw-bold">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
