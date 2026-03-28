import React, { useState, useEffect } from "react";
import { Users, Briefcase, LayoutDashboard, FileText, CheckCircle, XCircle, Trash2, ShieldCheck, BarChart3, TrendingUp, Search, LogOut, Home } from "lucide-react";
import API from "../Api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [analytics, setAnalytics] = useState({ totalUsers: 0, totalJobs: 0, totalApplications: 0, usersByRole: [] });
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const userData = localStorage.getItem("user");
    const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== "admin") {
            navigate("/");
            return;
        }
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "overview") {
                const { data } = await API.get("/admin/analytics");
                setAnalytics(data);
            } else if (activeTab === "users") {
                const { data } = await API.get("/admin/users");
                setUsers(data);
            } else if (activeTab === "jobs") {
                const { data } = await API.get("/admin/jobs");
                setJobs(data);
            }
        } catch (error) {
            toast.error("Error fetching admin data");
        } finally {
            setLoading(false);
        }
    };

    const handleJobAction = async (jobId, action) => {
        try {
            await API.put(`/admin/job/${action}/${jobId}`);
            toast.success(`Job ${action}ed`);
            fetchData();
        } catch (error) { toast.error(`${action} failed`); }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await API.delete(`/admin/user/${id}`);
            toast.success("User deleted");
            fetchData();
        } catch (error) { toast.error("Delete failed"); }
    };

    const Sidebar = () => (
        <div className="col-lg-2 sidebar sticky-top d-flex flex-column h-100 p-3 vh-100">
            <div className="text-center py-4 mb-4">
                <div className="premium-gradient d-inline-flex p-3 rounded-4 shadow-lg mb-3">
                    <ShieldCheck size={28} color="white" />
                </div>
                <h5 className="fw-bold fs-4 dashboard-title text-white">Admin Central</h5>
            </div>
            <div className="flex-grow-1">
                <button className={`nav-link w-100 text-start border-0 fw-bold d-flex align-items-center gap-3 ${activeTab === 'overview' ? 'active premium-gradient' : 'bg-transparent text-light opacity-75'}`} onClick={() => setActiveTab("overview")}><LayoutDashboard size={18} /> Overview</button>
                <button className={`nav-link w-100 text-start border-0 fw-bold d-flex align-items-center gap-3 ${activeTab === 'users' ? 'active premium-gradient' : 'bg-transparent text-light opacity-75'}`} onClick={() => setActiveTab("users")}><Users size={18} /> Manage Users</button>
                <button className={`nav-link w-100 text-start border-0 fw-bold d-flex align-items-center gap-3 ${activeTab === 'jobs' ? 'active premium-gradient' : 'bg-transparent text-light opacity-75'}`} onClick={() => setActiveTab("jobs")}><Briefcase size={18} /> Job Approval</button>

                <hr className="border-light opacity-25 my-4" />
                <button className="nav-link w-100 text-start border-0 bg-transparent text-light opacity-75 fw-bold d-flex align-items-center gap-3" onClick={() => navigate("/")}><Home size={18} /> Back to Home</button>
                <button className="nav-link w-100 text-start border-0 bg-transparent text-light opacity-75 fw-bold d-flex align-items-center gap-3 mt-2" onClick={() => navigate("/userLoginLayout/jobList")}><Search size={18} /> Explore Jobs</button>
            </div>
            <div className="p-3">
                <button className="nav-link w-100 text-start border-0 bg-transparent text-danger fw-bold d-flex align-items-center gap-3" onClick={() => { localStorage.clear(); navigate("/login"); }}><LogOut size={18} /> Logout</button>
            </div>
        </div>
    );

    return (
        <div className="container-fluid bg-light">
            <ToastContainer autoClose={2000} />
            <div className="row">
                <Sidebar />
                <div className="col-lg-10 p-4 p-md-5 overflow-auto vh-100">
                    <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom border-light">
                        <div>
                            <h2 className="dashboard-title fs-2 fw-800 mb-1">Super Admin Panel</h2>
                            <p className="text-muted fw-semibold">Monitor the entire platform's growth and operations.</p>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <div className="search-container p-1 px-3 d-none d-lg-flex bg-white rounded-pill">
                                <Search size={18} className="text-muted" />
                                <input type="text" className="form-control border-0 bg-transparent shadow-none small" placeholder="Quick search..." />
                            </div>
                            <div className="premium-card p-2 px-3 border-0 bg-white">
                                <span className="fw-bold text-dark">Welcome back, Boss!</span>
                            </div>
                        </div>
                    </div>

                    {activeTab === "overview" && (
                        <div className="row g-4">
                            <div className="col-md-3">
                                <div className="premium-card p-4 border-start border-primary border-5 text-center">
                                    <div className="bg-primary-subtle p-3 rounded-circle d-inline-block mb-3"><Users className="text-primary" size={24} /></div>
                                    <h3 className="fw-800 fs-1 mb-1">{analytics.totalUsers}</h3>
                                    <p className="text-muted fw-bold small text-uppercase mb-0">Total Users</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="premium-card p-4 border-start border-accent border-5 text-center" style={{ borderColor: '#7c3aed !important' }}>
                                    <div className="bg-purple-subtle p-3 rounded-circle d-inline-block mb-3" style={{ backgroundColor: '#f3e8ff' }}><Briefcase color="#7c3aed" size={24} /></div>
                                    <h3 className="fw-800 fs-1 mb-1">{analytics.totalJobs}</h3>
                                    <p className="text-muted fw-bold small text-uppercase mb-0">Total Jobs</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="premium-card p-4 border-start border-success border-5 text-center">
                                    <div className="bg-success-subtle p-3 rounded-circle d-inline-block mb-3"><FileText className="text-success" size={24} /></div>
                                    <h3 className="fw-800 fs-1 mb-1">{analytics.totalApplications}</h3>
                                    <p className="text-muted fw-bold small text-uppercase mb-0">Total Applications</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="premium-card p-4 border-start border-warning border-5 text-center">
                                    <div className="bg-warning-subtle p-3 rounded-circle d-inline-block mb-3" style={{ backgroundColor: '#fef3c7' }}><TrendingUp color="#92400e" size={24} /></div>
                                    <h3 className="fw-800 fs-1 mb-1">85%</h3>
                                    <p className="text-muted fw-bold small text-uppercase mb-0">Success Rate</p>
                                </div>
                            </div>

                            <div className="col-md-6 mt-5">
                                <h4 className="fw-bold mb-4 d-flex align-items-center gap-2"><BarChart3 size={20} /> User Distribution</h4>
                                <div className="premium-card p-4">
                                    {analytics.usersByRole.map(item => (
                                        <div key={item._id} className="mb-4">
                                            <div className="d-flex justify-content-between mb-2"><span className="fw-bold text-muted text-uppercase small">{item._id}s</span><span className="fw-bold">{item.count}</span></div>
                                            <div className="progress rounded-pill shadow-inner" style={{ height: 12 }}>
                                                <div className={`progress-bar rounded-pill ${item._id === 'admin' ? 'bg-danger' : item._id === 'employer' ? 'bg-primary' : 'bg-success'}`} style={{ width: `${(item.count / analytics.totalUsers) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div className="premium-card p-4 overflow-hidden shadow-sm">
                            <h4 className="fw-bold mb-4">Platform Users</h4>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr><th className="px-4">User Details</th><th className="px-4">Role</th><th className="px-4">Joined At</th><th className="px-4 text-center">Action</th></tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u._id}>
                                                <td className="px-4 py-3"><div className="d-flex align-items-center gap-3"><div className="premium-gradient rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: 40, height: 40 }}>{u.name.charAt(0)}</div><div><p className="mb-0 fw-bold">{u.name}</p><p className="mb-0 small text-muted">{u.email}</p></div></div></td>
                                                <td className="px-4 fw-bold small text-uppercase">{u.role}</td>
                                                <td className="px-4 text-muted small">{new Date(u.createdAt).toLocaleDateString()}</td>
                                                <td className="px-4 text-center">
                                                    <button className="btn btn-outline-danger btn-sm p-2 rounded-3 border-light-subtle" onClick={() => deleteUser(u._id)}><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "jobs" && (
                        <div className="premium-card p-4 overflow-hidden shadow-sm">
                            <h4 className="fw-bold mb-4">Job Verification Queue</h4>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0 text-nowrap">
                                    <thead className="bg-light">
                                        <tr><th className="px-4">Job Information</th><th className="px-4">Posted By</th><th className="px-4">Status</th><th className="px-4 text-center">Verification Action</th></tr>
                                    </thead>
                                    <tbody>
                                        {jobs.map(j => (
                                            <tr key={j._id}>
                                                <td className="px-4 py-3"><div><p className="mb-0 fw-bold">{j.title}</p><p className="mb-0 small text-muted">{j.company} • {j.location}</p></div></td>
                                                <td className="px-4">{j.postedBy?.name}</td>
                                                <td className="px-4"><span className={`badge-status status-${j.status}`}>{j.status.toUpperCase()}</span></td>
                                                <td className="px-4 text-center">
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <button className="btn btn-success p-2 rounded-circle" disabled={j.status === 'approved'} onClick={() => handleJobAction(j._id, 'approve')}><CheckCircle size={18} /></button>
                                                        <button className="btn btn-danger p-2 rounded-circle" disabled={j.status === 'rejected'} onClick={() => handleJobAction(j._id, 'reject')}><XCircle size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};