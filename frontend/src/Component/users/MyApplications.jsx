import React, { useState, useEffect } from "react";
import { FileText, MapPin, Building, Briefcase, Clock, FileCheck, ExternalLink, Home, Search } from "lucide-react";
import API from "../Api";
import { NavBar } from "../NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data } = await API.get("/applications/my-applications");
            setApplications(data);
        } catch (error) {
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <NavBar />
            <ToastContainer autoClose={2000} />
            <div className="container py-5">
                <div className="row justify-content-center mb-5">
                    <div className="col-12 text-center">
                        <div className="premium-gradient d-inline-flex p-3 rounded-4 shadow-lg mb-3">
                            <FileCheck size={28} color="white" />
                        </div>
                        <h2 className="dashboard-title fs-1 fw-800">Application Tracker</h2>
                        <p className="text-muted fw-semibold">Keep track of all your applied roles in real-time.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
                ) : applications.length > 0 ? (
                    <div className="row g-4">
                        {applications.map(app => (
                            <div key={app._id} className="col-lg-10 mx-auto">
                                <div className="premium-card p-4 d-md-flex align-items-center justify-content-between gap-4">
                                    <div className="d-flex align-items-center gap-4 flex-grow-1">
                                        <div className="bg-primary-subtle p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                                            <Briefcase className="text-primary" size={28} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <h5 className="fw-bold fs-4 mb-0">{app.jobId?.title}</h5>
                                                <span className={`badge-status status-${app.status} py-2 px-3`}>{app.status.toUpperCase()}</span>
                                            </div>
                                            <p className="text-dark fw-bold mb-2 small"><Building className="text-primary me-2" size={14} />{app.jobId?.company}</p>
                                            <div className="d-flex flex-wrap align-items-center gap-4 text-muted small mt-3">
                                                <span className="d-inline-flex align-items-center gap-1 fw-bold"><MapPin size={14} className="text-primary" /> {app.jobId?.location}</span>
                                                <span className="d-inline-flex align-items-center gap-1 fw-bold"><Clock size={14} className="text-primary" /> Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 mt-md-0 d-flex flex-column gap-2">
                                        <a href={`http://localhost:5000/${app.resume?.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"><FileText size={16} /> View Resume</a>
                                        <button className="btn btn-light rounded-3 fw-bold border-0 d-flex align-items-center justify-content-center gap-2 text-muted" title="View Job Details"><ExternalLink size={16} /> Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5 premium-card bg-white mx-auto col-lg-8"><p className="text-muted fs-5 mb-4">You haven't applied for any jobs yet.</p><a href="/userLoginLayout/jobList" className="btn btn-premium px-5 py-3">Explore Jobs Now</a></div>
                )}
            </div>
        </div>
    );
};


