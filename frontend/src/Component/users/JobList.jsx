import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, Filter, ChevronRight, Bookmark, Building, DollarSign } from "lucide-react";
import API from "../Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationModal from "./ApplicationModal";

export const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    experience: "",
    jobType: "",
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/jobs/all", { params: filters });
      setJobs(data.jobs);
      setTotalPages(data.pages);
    } catch (error) {
      toast.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters.page, filters.category, filters.jobType, filters.experience]);

  const handleApply = (job) => {
    const userData = localStorage.getItem("user");
    const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;
    if (!user) {
      toast.warning("Please login to apply");
      return;
    }
    if (user.role !== 'seeker') {
      toast.error("Only Job Seekers can apply!");
      return;
    }
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleSaveJob = async (jobId) => {
    const userData = localStorage.getItem("user");
    const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;
    if (!user) return toast.warning("Please login to save jobs");
    if (user.role !== 'seeker') return toast.error("Only seekers can save jobs");

    try {
      await API.post("/saved-jobs/save", { jobId });
      toast.success("Job saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save job");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <ToastContainer autoClose={2000} />
      <div className="container mt-4">
        <div className="row mb-5">
          <div className="col-12">
            <h1 className="dashboard-title fs-2 fw-800 mb-4">Find Your Next Adventure</h1>
            <div className="search-container glass-card p-3 p-lg-2">
              <div className="row w-100 g-2 align-items-center">
                <div className="col-lg-4">
                  <div className="input-group border-0 bg-transparent">
                    <span className="input-group-text border-0 bg-transparent ps-3"><Search size={20} className="text-primary" /></span>
                    <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Job title or company..." value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} />
                  </div>
                </div>
                <div className="col-lg-3 border-start border-light d-none d-lg-block">
                  <div className="input-group border-0 bg-transparent">
                    <span className="input-group-text border-0 bg-transparent"><MapPin size={20} className="text-primary" /></span>
                    <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Location..." value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
                  </div>
                </div>
                <div className="col-lg-3 d-none d-lg-block border-start border-light">
                  <select className="form-select border-0 bg-transparent shadow-none fw-semibold" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                    <option value="">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <button className="btn btn-premium w-100 rounded-pill py-3 fw-bold" onClick={fetchJobs}>Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3 d-none d-lg-block">
            <div className="premium-card p-4 sticky-top" style={{ top: 100 }}>
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2"><Filter size={18} /> Advanced Filters</h5>
              <div className="mb-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Job Type</label>
                <select className="form-select rounded-3 border-light bg-light" value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}>
                  <option value="">Full Time & Part Time</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold text-muted small text-uppercase">Experience Level</label>
                <select className="form-select rounded-3 border-light bg-light" value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })}>
                  <option value="">Any Experience</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
              <button className="btn btn-outline-danger w-100 rounded-3" onClick={() => setFilters({ keyword: "", location: "", category: "", experience: "", jobType: "", page: 1 })}>Clear Filters</button>
            </div>
          </div>

          <div className="col-lg-9">
            {loading ? (
              <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
            ) : jobs.length > 0 ? (
              <div className="row g-4">
                {jobs.map((job) => (
                  <div key={job._id} className="col-12">
                    <div className="premium-card p-4 d-md-flex align-items-center justify-content-between gap-4">
                      <div className="d-flex align-items-center gap-4">
                        <div className="bg-light p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ width: 70, height: 70 }}>
                          <Building className="text-primary" size={32} />
                        </div>
                        <div>
                          <h5 className="fw-bold mb-1">{job.title}</h5>
                          <div className="d-flex flex-wrap align-items-center gap-3">
                            <span className="text-muted small d-flex align-items-center gap-1"><Building size={14} /> {job.company}</span>
                            <span className="text-muted small d-flex align-items-center gap-1"><MapPin size={14} /> {job.location}</span>
                            <span className="text-muted small d-flex align-items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                          </div>
                          <div className="mt-3 d-flex gap-2">
                            <span className="badge bg-primary-subtle text-primary border-primary-subtle rounded-pill px-3 py-2">{job.category}</span>
                            <span className="badge bg-secondary-subtle text-secondary border-secondary-subtle rounded-pill px-3 py-2">{job.jobType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 mt-md-0 d-flex gap-2">
                        <button className="btn btn-outline-secondary p-3 rounded-3" title="Save Job" onClick={() => handleSaveJob(job._id)}><Bookmark size={20} /></button>
                        <button className="btn btn-primary px-4 py-3 rounded-3 fw-bold d-flex align-items-center gap-2" onClick={() => handleApply(job)}>View Details <ChevronRight size={18} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 premium-card bg-white"><p className="text-muted fs-5">No jobs found matching your criteria.</p></div>
            )}

            {showModal && <ApplicationModal job={selectedJob} onClose={() => setShowModal(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};
