import React, { useState, useEffect } from "react";
import { PlusCircle, Briefcase, Users, LayoutDashboard, FileText, Settings, LogOut, ChevronRight, BarChart3, Clock, CheckCircle, XCircle, Home, Search } from "lucide-react";
import API from "../Api";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = localStorage.getItem("user");
  const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "employer" && user?.role !== "admin") {
      navigate("/");
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/jobs/employer/all");
      setJobs(data);
    } catch (error) {
      toast.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllApplicants = async () => {
    setActiveTab("applicants");
    setSelectedJob(null);
    setLoading(true);
    try {
      const { data } = await API.get("/applications/employer/all-applicants");
      setApplicants(data);
    } catch (error) {
      toast.error("Error fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicants = async (jobId) => {
    setActiveTab("applicants");
    setSelectedJob(jobId);
    setLoading(true);
    try {
      const { data } = await API.get(`/applications/job/${jobId}/applicants`);
      setApplicants(data);
    } catch (error) {
      toast.error("Error fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      await API.put(`/applications/${appId}/status`, { status });
      toast.success(`Application ${status}`);
      // Refresh the correct applicant list
      if (selectedJob) {
        fetchApplicants(selectedJob);
      } else {
        fetchAllApplicants();
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const Sidebar = () => (
    <div className="col-lg-2 sidebar sticky-top d-flex flex-column h-100 p-3 vh-100">
      <div className="text-center py-4 mb-4">
        <div className="premium-gradient d-inline-flex p-3 rounded-4 shadow-lg mb-3">
          <Briefcase size={28} color="white" />
        </div>
        <h5 className="fw-bold fs-4 dashboard-title text-white">Employer Hub</h5>
      </div>
      <div className="flex-grow-1">
        <button className={`nav-link w-100 text-start border-0 fw-bold d-flex align-items-center gap-3 ${activeTab === 'overview' ? 'active premium-gradient' : 'bg-transparent text-light opacity-75'}`} onClick={() => setActiveTab("overview")}><LayoutDashboard size={18}/> Overview</button>
        <button className={`nav-link w-100 text-start border-0 fw-bold d-flex align-items-center gap-3 ${activeTab === 'myJobs' ? 'active premium-gradient' : 'bg-transparent text-light opacity-75'}`} onClick={() => setActiveTab("myJobs")}><Briefcase size={18}/> My Job Posts</button>
        <button className={`nav-link w-100 text-start border-0 fw-bold d-flex align-items-center gap-3 ${activeTab === 'postJob' ? 'active premium-gradient' : 'bg-transparent text-light opacity-75'}`} onClick={() => setActiveTab("postJob")}><PlusCircle size={18}/> Post New Job</button>
        <button className={`nav-link w-100 text-start border-0 fw-bold d-flex align-items-center gap-3 ${activeTab === 'applicants' ? 'active premium-gradient' : 'bg-transparent text-light opacity-75'}`} onClick={fetchAllApplicants}><Users size={18}/> Applicants</button>
        
        <hr className="border-light opacity-25 my-4" />
        <button className="nav-link w-100 text-start border-0 bg-transparent text-light opacity-75 fw-bold d-flex align-items-center gap-3" onClick={() => navigate("/")}><Home size={18}/> Back to Home</button>
        <button className="nav-link w-100 text-start border-0 bg-transparent text-light opacity-75 fw-bold d-flex align-items-center gap-3 mt-2" onClick={() => navigate("/userLoginLayout/jobList")}><Search size={18}/> Explore Jobs</button>
      </div>
      <div className="p-3">
        <button className="nav-link w-100 text-start border-0 bg-transparent text-danger fw-bold d-flex align-items-center gap-3" onClick={() => { localStorage.clear(); navigate("/login"); }}><LogOut size={18}/> Logout</button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid bg-light">
      <ToastContainer autoClose={2000} />
      <div className="row">
        <Sidebar />
        <div className="col-lg-10 p-4 p-md-5 overflow-auto vh-100">
          <div className="d-flex justify-content-between align-items-center mb-5 pb-3">
            <div>
              <h2 className="dashboard-title fs-2 fw-800 mb-1">Hello, {user?.name} 👋</h2>
              <p className="text-muted fw-semibold">Manage your team and find talent effectively.</p>
            </div>
            <button className="btn btn-premium d-flex align-items-center gap-2 px-4 shadow-lg" onClick={() => setActiveTab("postJob")}>
              <PlusCircle size={18} /> Post a New Job
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="row g-4">
              <div className="col-md-4">
                <div className="premium-card p-4 border-start border-primary border-5">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="bg-primary-subtle p-3 rounded-4"><Briefcase className="text-primary" size={24}/></div>
                    <span className="badge-status status-approved">+12% vs last month</span>
                  </div>
                  <h3 className="fw-800 fs-1 mb-1">{jobs.length}</h3>
                  <p className="text-muted fw-bold small text-uppercase mb-0">Total Active Jobs</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="premium-card p-4 border-start border-accent border-5" style={{borderColor: '#7c3aed !important'}}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="bg-purple-subtle p-3 rounded-4" style={{backgroundColor: '#f3e8ff'}}><Users className="text-purple" size={24} color="#7c3aed"/></div>
                    <span className="badge-status status-approved">+45% vs last month</span>
                  </div>
                  <h3 className="fw-800 fs-1 mb-1">482</h3>
                  <p className="text-muted fw-bold small text-uppercase mb-0">Total Applications</p>
                </div>
              </div>
               <div className="col-md-4">
                <div className="premium-card p-4 border-start border-success border-5">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="bg-success-subtle p-3 rounded-4"><BarChart3 className="text-success" size={24}/></div>
                    <span className="badge-status status-approved">8.2% Reach</span>
                  </div>
                  <h3 className="fw-800 fs-1 mb-1">2.4k</h3>
                  <p className="text-muted fw-bold small text-uppercase mb-0">Job Views</p>
                </div>
              </div>
              <div className="col-12 mt-5">
                <h4 className="fw-bold mb-4">Recent Actvity</h4>
                <div className="premium-card p-4 overflow-hidden shadow-sm">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light bg-opacity-50">
                      <tr><th className="border-0 px-4">Recruiter Activity</th><th className="border-0">Job Title</th><th className="border-0">Applicants</th><th className="border-0">Action</th></tr>
                    </thead>
                    <tbody>
                      {jobs.slice(0, 5).map(job => (
                        <tr key={job._id}>
                          <td className="px-4 py-3"><div className="d-flex align-items-center gap-3"><div className="bg-light p-2 rounded-circle"><Clock size={16}/></div><span className="small text-muted">2 hours ago</span></div></td>
                          <td className="fw-bold">{job.title}</td>
                          <td><span className="badge-status status-approved">24 New</span></td>
                          <td><button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => fetchApplicants(job._id)}>Manage</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "myJobs" && (
            <div className="row g-4">
              {jobs.map(job => (
                <div key={job._id} className="col-md-6 col-xl-4">
                  <div className="premium-card p-4 h-100">
                    <div className="d-flex justify-content-between mb-4">
                      <span className={`badge-status ${job.status === 'approved' ? 'status-approved' : 'status-pending'}`}>{job.status.toUpperCase()}</span>
                      <button className="btn btn-light bg-transparent border-0 p-0 text-muted"><Settings size={18}/></button>
                    </div>
                    <h5 className="fw-bold fs-4 mb-2">{job.title}</h5>
                    <p className="text-muted small mb-4">{job.location} • {job.jobType}</p>
                    <div className="row g-2 mb-4">
                        <div className="col-6"><div className="bg-light p-2 rounded-3 text-center small"><span className="d-block fw-bold fs-5">0</span>Views</div></div>
                        <div className="col-6"><div className="bg-light p-2 rounded-3 text-center small"><span className="d-block fw-bold fs-5" style={{color: '#7c3aed'}}>12</span>Apply</div></div>
                    </div>
                    <button className="btn btn-primary w-100 rounded-3 py-2 fw-bold d-flex align-items-center justify-content-center gap-2" onClick={() => fetchApplicants(job._id)}>View Applicants <ChevronRight size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "applicants" && (
            <div className="premium-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">All Applicants {selectedJob && `- ${jobs.find(j=>j._id===selectedJob)?.title}`}</h4>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm rounded-3" onClick={() => setActiveTab("myJobs")}>Back to Jobs</button>
                    <button className="btn btn-light btn-sm rounded-3"><FileText size={16}/> Export CSV</button>
                </div>
              </div>
              {applicants.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light bg-opacity-50">
                             <tr><th className="px-4">Candidate</th><th className="px-4">Job Title</th><th className="px-4">Applied Date</th><th className="px-4">Resume</th><th className="px-4">Status</th><th className="px-4 text-center">Actions</th></tr>
                        </thead>
                        <tbody>
                            {applicants.map(app => (
                                <tr key={app._id}>
                                    <td className="px-4 py-3"><div className="d-flex align-items-center gap-3"><div className="premium-gradient rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{width: 40, height: 40}}>{app.user.name.charAt(0)}</div><div><p className="mb-0 fw-bold">{app.user.name}</p><p className="mb-0 small text-muted">{app.user.email}</p></div></div></td>
                                    <td className="px-4 small fw-bold text-primary">{app.jobId?.title || '—'}</td>
                                    <td className="px-4 small text-muted">{new Date(app.appliedAt).toLocaleDateString()}</td>
                                    <td className="px-4"><a href={`http://localhost:5000/${app.resume?.replace(/\\/g, '/')}`} target="_blank" className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-2"><FileText size={14}/> View PDF</a></td>
                                    <td className="px-4"><span className={`badge-status status-${app.status}`}>{app.status.toUpperCase()}</span></td>
                                    <td className="px-4">
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button className="btn btn-success p-2 rounded-circle" disabled={app.status === 'accepted'} onClick={() => updateStatus(app._id, 'accepted')}><CheckCircle size={18}/></button>
                                            <button className="btn btn-danger p-2 rounded-circle" disabled={app.status === 'rejected'} onClick={() => updateStatus(app._id, 'rejected')}><XCircle size={18}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              ) : (
                <div className="text-center py-5"><p className="text-muted fs-5">Select a job or no applicants found.</p></div>
              )}
            </div>
          )}

          {activeTab === "postJob" && (
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="premium-card p-4 p-md-5">
                        <h4 className="fw-bold mb-4">Post a New Requirement</h4>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const jobData = Object.fromEntries(new FormData(e.target));
                            jobData.skills = jobData.skills.split(",").map(s => s.trim());
                            try {
                                await API.post("/jobs/create", jobData);
                                toast.success("Job posted successfully!");
                                fetchJobs();
                                setActiveTab("myJobs");
                            } catch (e) { toast.error("Job post failed"); }
                        }}>
                            <div className="row g-4">
                                <div className="col-12"><label className="form-label fw-bold">Job Title</label><input type="text" name="title" className="form-control" required placeholder="e.g. Senior Software Engineer" /></div>
                                <div className="col-md-6"><label className="form-label fw-bold">Company Name</label><input type="text" name="company" className="form-control" required /></div>
                                <div className="col-md-6"><label className="form-label fw-bold">Location</label><input type="text" name="location" className="form-control" required /></div>
                                <div className="col-md-6"><label className="form-label fw-bold">Experience Range</label><input type="text" name="experience" className="form-control" placeholder="e.g. 2-5 Years" required /></div>
                                <div className="col-md-6"><label className="form-label fw-bold">Salary Range</label><input type="text" name="salary" className="form-control" placeholder="e.g. 50k - 80k" required /></div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Category</label>
                                    <select name="category" className="form-select" required>
                                        <option value="Technology">Technology</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Design">Design</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Human Resources">Human Resources</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Job Type</label>
                                    <select name="jobType" className="form-select" required>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Contract">Contract</option>
                                    </select>
                                </div>
                                <div className="col-12"><label className="form-label fw-bold">Required Skills (Comma separated)</label><input type="text" name="skills" className="form-control" placeholder="React, Node.js, MongoDB" required /></div>
                                <div className="col-12"><label className="form-label fw-bold">Job Description</label><textarea name="description" className="form-control" rows="5" required></textarea></div>
                                <div className="col-12 mt-4 text-end"><button type="submit" className="btn btn-premium px-5 py-3 shadow-lg fw-bold">Publish Job Opening</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
