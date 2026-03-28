import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Globe, Users, Code2, Share2, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="pt-5 pb-3 mt-auto bg-white border-top border-light position-relative overflow-hidden">
      {/* Background decoration */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{ background: 'radial-gradient(circle at top left, var(--primary) 0%, transparent 40%)', pointerEvents: 'none' }}></div>
      <div className="position-absolute bottom-0 end-0 w-100 h-100 opacity-25" style={{ background: 'radial-gradient(circle at bottom right, var(--accent) 0%, transparent 40%)', pointerEvents: 'none' }}></div>
      
      <div className="container position-relative z-1 pt-4">
        <div className="row g-5 mb-5">
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="text-decoration-none d-flex align-items-center gap-2 mb-4">
              <div className="premium-gradient p-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center" style={{width: 40, height: 40}}>
                <Briefcase size={22} color="white" />
              </div>
              <span className="fs-3 fw-900 dashboard-title" style={{letterSpacing: '-1px'}}>JobPortal<span className="text-primary">.</span></span>
            </Link>
            <p className="text-muted fw-semibold mb-4 lh-lg pe-lg-4">
              The premier destination connecting ambitious professionals with industry-leading organizations across the globe. Elevate your career journey today.
            </p>
            <div className="d-flex align-items-center gap-3">
              <a href="#" className="btn btn-light bg-light rounded-circle p-2 shadow-sm text-primary hover-glow border-0" title="Twitter"><Share2 size={20} /></a>
              <a href="#" className="btn btn-light bg-light rounded-circle p-2 shadow-sm text-primary hover-glow border-0" title="LinkedIn"><Users size={20} /></a>
              <a href="#" className="btn btn-light bg-light rounded-circle p-2 shadow-sm text-primary hover-glow border-0" title="GitHub"><Code2 size={20} /></a>
              <a href="#" className="btn btn-light bg-light rounded-circle p-2 shadow-sm text-primary hover-glow border-0" title="Website"><Globe size={20} /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-4 text-dark fs-5">For Candidates</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li><Link to="/userLoginLayout/jobList" className="text-muted text-decoration-none fw-semibold hover-primary transition-all">Browse Jobs</Link></li>
              <li><Link to="/userLoginLayout/savedJobs" className="text-muted text-decoration-none fw-semibold hover-primary transition-all">Saved Roles</Link></li>
              <li><Link to="/userLoginLayout/myApplication" className="text-muted text-decoration-none fw-semibold hover-primary transition-all">Application Tracker</Link></li>
              <li><a href="#" className="text-muted text-decoration-none fw-semibold hover-primary transition-all">Career Guide</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-4 text-dark fs-5">For Employers</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li><Link to="/employerLayout/dashboard" className="text-muted text-decoration-none fw-semibold hover-primary transition-all">Post a Job</Link></li>
              <li><Link to="/employerLayout/dashboard" className="text-muted text-decoration-none fw-semibold hover-primary transition-all">Browse Candidates</Link></li>
              <li><a href="#" className="text-muted text-decoration-none fw-semibold hover-primary transition-all">Recruitment Solutions</a></li>
              <li><a href="#" className="text-muted text-decoration-none fw-semibold hover-primary transition-all">Pricing Plans</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-4 text-dark fs-5">Contact Us</h5>
            <ul className="list-unstyled d-flex flex-column gap-4 mb-0">
              <li className="d-flex align-items-center gap-3">
                <div className="bg-primary-subtle p-2 rounded-circle"><Mail size={18} className="text-primary" /></div>
                <span className="text-muted fw-semibold">support@jobportal.com</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <div className="bg-primary-subtle p-2 rounded-circle"><Phone size={18} className="text-primary" /></div>
                <span className="text-muted fw-semibold">+1 (800) 123-4567</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <div className="bg-primary-subtle p-2 rounded-circle"><MapPin size={18} className="text-primary" /></div>
                <span className="text-muted fw-semibold">123 Innovation Drive, Tech City, TC 90210</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="row align-items-center justify-content-between pt-2 pb-3">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted fw-semibold small mb-0">
              &copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="d-inline-flex gap-4">
              <a href="#" className="text-muted text-decoration-none small fw-semibold hover-primary">Privacy Policy</a>
              <a href="#" className="text-muted text-decoration-none small fw-semibold hover-primary">Terms of Service</a>
              <a href="#" className="text-muted text-decoration-none small fw-semibold hover-primary">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
