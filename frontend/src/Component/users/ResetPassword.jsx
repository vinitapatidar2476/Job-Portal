import React, { useState } from "react";
import { Lock, ChevronRight, Briefcase } from "lucide-react";
import API from "../Api";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return toast.error("Passwords do not match");

        setLoading(true);
        try {
            await API.put(`/auth/reset-password/${token}`, { password });
            toast.success("Password reset successful!");
            setTimeout(() => navigate("/login"), 2000);
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
                                <Briefcase size={32} color="white" />
                            </div>
                            <h2 className="fw-bold dashboard-title fs-2">Reset Password</h2>
                            <p className="text-muted fw-semibold">Enter your new password below</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-dark mb-2">New Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 rounded-start-3 p-3"><Lock size={18} className="text-primary" /></span>
                                    <input type="password" name="password" className="form-control border-start-0 rounded-end-3 p-3" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-dark mb-2">Confirm Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 rounded-start-3 p-3"><Lock size={18} className="text-primary" /></span>
                                    <input type="password" name="confirmPassword" className="form-control border-start-0 rounded-end-3 p-3" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-premium w-100 py-3 shadow-lg d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                                {loading ? "Updating..." : "Update Password"} <ChevronRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
