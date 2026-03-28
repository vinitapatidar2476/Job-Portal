import React, { useEffect, useState } from "react";
import { Bookmark, MapPin, Building, DollarSign, Trash2, Home, ChevronRight } from "lucide-react";
import API from "../Api";
import { NavBar } from "../NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      const { data } = await API.get("/saved-jobs/my");
      setSavedJobs(data.savedJobs);
    } catch (error) {
      toast.error("Error fetching saved jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await API.delete(`/saved-jobs/unsave/${jobId}`);
      setSavedJobs((prev) => prev.filter((item) => item.job?._id !== jobId));
      toast.success("Job removed from saved list");
    } catch (err) {
      toast.error("Error unsaving job");
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <NavBar />
      <ToastContainer autoClose={2000} />
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <div className="premium-gradient d-inline-flex p-3 rounded-4 shadow-lg mb-3">
              <Bookmark size={28} color="white" />
            </div>
            <h2 className="dashboard-title fs-1 fw-800">My Collections</h2>
            <p className="text-muted fw-semibold">Manage all your bookmarked roles in one place.</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
        ) : savedJobs.length === 0 ? (
          <div className="text-center py-5 premium-card bg-white mx-auto col-lg-8 shadow-sm">
            <p className="text-muted fs-5 mb-4">Your collection is empty.</p>
            <a href="/userLoginLayout/jobList" className="btn btn-premium px-5 py-3">Browse Latest Jobs</a>
          </div>
        ) : (
          <div className="row g-4">
            {savedJobs
              .filter((item) => item.job)
              .map((item) => (
                <div key={item._id} className="col-lg-10 mx-auto">
                  <div className="premium-card p-4 d-md-flex align-items-center justify-content-between gap-4">
                    <div className="d-flex align-items-center gap-4 flex-grow-1">
                      <div className="bg-primary-subtle p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                        <Building className="text-primary" size={28} />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fw-bold fs-4 mb-1">{item.job.title}</h5>
                        <p className="text-dark fw-bold mb-2 small"><Building className="text-primary me-2" size={14} />{item.job.company}</p>
                        <div className="d-flex flex-wrap align-items-center gap-4 text-muted small mt-3">
                          <span className="d-inline-flex align-items-center gap-1 fw-bold"><MapPin size={14} className="text-primary" /> {item.job.location}</span>
                          <span className="d-inline-flex align-items-center gap-1 fw-bold"><DollarSign size={14} className="text-primary" /> {item.job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-0 d-flex gap-2">
                      <button className="btn btn-outline-danger p-3 rounded-3" onClick={() => handleUnsave(item.job._id)} title="Remove Bookmark">
                        <Trash2 size={20} />
                      </button>
                      <a href="/userLoginLayout/jobList" className="btn btn-primary px-4 py-3 rounded-3 fw-bold d-flex align-items-center gap-2">View Job <ChevronRight size={18} /></a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
