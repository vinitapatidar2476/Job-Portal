import React, { useState } from "react";
import { X, Send, FileText, CheckCircle, Briefcase } from "lucide-react";
import API from "../Api";
import { toast } from "react-toastify";

const ApplicationModal = ({ job, onClose }) => {
    const [file, setFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return toast.error("Please upload your resume");

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("jobId", job._id);
        formData.append("resume", file);
        formData.append("coverLetter", coverLetter);

        try {
            await API.post("/applications/apply", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setSuccess(true);
            toast.success("Job Applied Successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit application");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal show d-block bg-dark bg-opacity-75 animate-fade-in" style={{ zIndex: 9999 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-0 shadow-lg rounded-4 premium-card p-3 p-lg-4 overflow-hidden">
                    <div className="modal-header border-0 d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-800 dashboard-title fs-3 mb-0">Apply for Job</h4>
                        <button className="btn btn-light rounded-circle p-2" onClick={onClose}><X size={24} /></button>
                    </div>
                    {success ? (
                        <div className="modal-body text-center py-5">
                            <div className="bg-success bg-opacity-10 d-inline-flex p-4 rounded-circle mb-4">
                                <CheckCircle size={54} className="text-success shadow-sm" />
                            </div>
                            <h2 className="fw-800 dashboard-title display-6">Success!</h2>
                            <p className="text-muted fw-bold lead mb-5">Your application for <span className="text-dark">{job.title}</span> at <span className="text-dark">{job.company}</span> has been sent!</p>
                            <button className="btn btn-premium px-5 py-3 rounded-pill fw-bold" onClick={onClose}>Finish & Close</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="p-4 bg-light rounded-4 mb-4 border border-light">
                                    <h5 className="fw-bold fs-4 mb-1">{job.title}</h5>
                                    <p className="text-muted fw-semibold mb-0"><Briefcase size={16} className="text-primary me-2" />{job.company} • {job.location}</p>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold small text-uppercase text-muted">A short message to recruiter</label>
                                    <textarea className="form-control bg-light border-0 rounded-4 p-3 shadow-none" rows="4" placeholder="Briefly introduce yourself and why you're a fit..." value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold small text-uppercase text-muted">Upload Resume (PDF only)</label>
                                    <div className="premium-card p-4 text-center border-dashed position-relative d-flex flex-column align-items-center justify-content-center bg-light bg-opacity-50">
                                        <input type="file" className="position-absolute w-100 h-100 opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} required />
                                        <div className="bg-primary-subtle p-3 rounded-circle mb-3"><FileText className="text-primary" size={32} /></div>
                                        <h5 className="fw-bold mb-1">{file ? file.name : "Choose File or Drag & Drop"}</h5>
                                        <p className="text-muted small mb-0 fw-semibold">Accepts .pdf files only</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-0 pt-4 mt-4 border-top border-light">
                                <button type="button" className="btn btn-light px-4 py-3 rounded-3 fw-bold border-0 bg-transparent text-muted" onClick={onClose}>Cancel</button>
                                <button type="submit" className="btn btn-premium px-5 py-3 rounded-pill shadow-lg fw-800 d-flex align-items-center gap-2" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Application"} <Send size={18} />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationModal;
