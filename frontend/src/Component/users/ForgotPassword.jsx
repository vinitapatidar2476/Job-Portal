import React, { useState } from "react";
import { Mail, ChevronRight, Briefcase, Lock } from "lucide-react";
import API from "../Api";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      setSent(true);
      toast.success("Reset link sent to your email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 hero-section">
      <ToastContainer autoClose={2000} />
      <div className="row w-100 justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-lg rounded-4 p-4 p-lg-5 glass-card">
            <div className="text-center mb-5">
              <div className="premium-gradient d-inline-flex p-3 rounded-4 shadow-lg mb-4">
                <Lock size={32} color="white" />
              </div>
              <h2 className="fw-bold dashboard-title fs-2">Reset Password</h2>
              <p className="text-muted fw-semibold">Enter your email for a recovery link</p>
            </div>

            {sent ? (
              <div className="text-center py-4">
                <div className="alert alert-success rounded-4 fw-bold">Check your inbox! We've sent a recovery link.</div>
                <Link to="/login" className="btn btn-primary w-100 py-3 mt-4 rounded-pill">Back to Login</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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

                <button type="submit" className="btn btn-premium w-100 py-3 shadow-lg d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"} <ChevronRight size={18} />
                </button>
                <div className="text-center mt-4">
                  <Link to="/login" className="text-muted text-decoration-none small fw-bold">Nevermind, take me back</Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
