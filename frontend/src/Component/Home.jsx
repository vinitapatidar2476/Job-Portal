import React from "react";
import { Search, MapPin, Briefcase, ChevronRight, TrendingUp, Star, Building, Globe, Activity, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="hero-section min-vh-75 d-flex align-items-center">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <div className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-4">
                  <Star size={18} /> Over 10,000+ Active Roles
                </div>
                <h1 className="display-3 fw-800 dashboard-title mb-4" style={{ lineHeight: 1.1 }}>
                  Find the Perfect <span className="text-primary">Career Match</span> for Your Ambition.
                </h1>
                <p className="lead text-muted mb-5 fw-600 fst-italic">
                  The ultimate hub connecting talented individuals with world-class employers. 
                  Streamlined, secure, and smart career transitions.
                </p>
                
                <div className="search-container p-2 mb-5 glass-card shadow-lg col-lg-10">
                    <div className="row g-2 align-items-center w-100">
                      <div className="col-md-5 ps-3 d-flex align-items-center gap-2">
                        <Search className="text-primary opacity-50" size={20} />
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Job Title or Keyword..." />
                      </div>
                      <div className="col-md-4 border-start border-light d-flex align-items-center gap-2 ps-3">
                        <MapPin className="text-primary opacity-50" size={20} />
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="All Cities..." />
                      </div>
                      <div className="col-md-3">
                        <Link to="/userLoginLayout/jobList" className="btn btn-premium w-100 rounded-pill py-3 fw-bold">Search Jobs</Link>
                      </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-4 flex-wrap">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-light p-2 rounded-circle"><TrendingUp size={20} className="text-primary"/></div>
                    <span className="fw-bold small text-dark">High Growth Roles</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-light p-2 rounded-circle"><Globe size={20} className="text-primary"/></div>
                    <span className="fw-bold small text-dark">Global Opportunities</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-light p-2 rounded-circle"><Building size={20} className="text-primary"/></div>
                    <span className="fw-bold small text-dark">Top Companies</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
               <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
                  <div className="position-relative">
                      <div className="premium-gradient rounded-4 shadow-lg p-5 text-white" style={{ minHeight: 400 }}>
                          <h2 className="fw-bold mb-4">Popular Categories</h2>
                          <div className="row g-3">
                              {['Development', 'Design', 'Marketing', 'Finance', 'Writing', 'Data'].map((cat, i) => (
                                  <div key={i} className="col-6">
                                      <div className="glass-card p-3 p-lg-4 d-flex align-items-center gap-2 border-0 bg-white bg-opacity-10 text-white">
                                          <Code size={24} /> <span className="fw-bold">{cat}</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                      {/* Floating Card */}
                      <div className="position-absolute premium-card p-3 shadow-lg bg-white mt-n5" style={{ bottom: -30, left: 30, maxWidth: 220 }}>
                          <div className="d-flex align-items-center gap-3">
                              <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}><Activity color="white" size={20}/></div>
                              <div><p className="small mb-0 fw-bold">Success Hired</p><h5 className="fw-800 text-dark mb-0">8.2k+</h5></div>
                          </div>
                      </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <h2 className="fw-800 dashboard-title display-5">4.2k</h2>
              <p className="text-muted fw-bold">Active Jobs</p>
            </div>
            <div className="col-md-3 border-start border-light d-md-block d-none">
              <h2 className="fw-800 dashboard-title display-5">1.5k</h2>
              <p className="text-muted fw-bold">Companies</p>
            </div>
            <div className="col-md-3 border-start border-light d-md-block d-none">
              <h2 className="fw-800 dashboard-title display-5">2.8k</h2>
              <p className="text-muted fw-bold">Job Seekers</p>
            </div>
            <div className="col-md-3 border-start border-light d-md-block d-none">
              <h2 className="fw-800 dashboard-title display-5">98%</h2>
              <p className="text-muted fw-bold">Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-white">
          <div className="container py-5">
              <div className="premium-gradient p-5 rounded-5 text-white text-center shadow-lg position-relative overflow-hidden">
                  <div className="position-relative z-1 py-4">
                    <h2 className="display-5 fw-800 mb-4">Ready to fuel your professional growth?</h2>
                    <p className="fs-5 opacity-75 mb-5 mx-auto col-lg-8">Sign up now and gain access to thousands of personalized job recommendations curated just for your profile.</p>
                    <div className="d-flex gap-3 justify-content-center">
                        <Link to="/userRegister" className="btn btn-light rounded-pill px-5 py-3 fw-bold fs-5 text-primary shadow-lg border-0">Sign Up Free</Link>
                        <Link to="/userLoginLayout/jobList" className="btn btn-outline-light rounded-pill px-5 py-3 fw-bold fs-5 shadow-lg d-flex align-items-center gap-2">Explore Hub <ChevronRight/></Link>
                    </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};
