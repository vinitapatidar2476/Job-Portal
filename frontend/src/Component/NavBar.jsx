import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Home, User, Briefcase, LayoutDashboard } from "lucide-react";

export const NavBar = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="premium-gradient p-2 rounded-3 me-2">
            <Briefcase size={24} color="white" />
          </div>
          <span className="fw-bold fs-4 dashboard-title">JobPortal</span>
        </Link>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#userNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/userLoginLayout/jobList">Explore Jobs</Link>
            </li>
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link fw-bold text-primary" to="/adminLayout/adminDashboard">Admin Dashboard</Link>
              </li>
            )}
            {user?.role === 'employer' && (
              <li className="nav-item">
                <Link className="nav-link fw-bold text-primary" to="/employerLayout/dashboard">Employer Dashboard</Link>
              </li>
            )}
            {user?.role === 'seeker' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-primary" to="/userLoginLayout/myApplication">My Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-success" to="/userLoginLayout/savedJobs">Saved Jobs</Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline-primary px-4 border-0 fw-bold">Login</Link>
                <Link to="/userRegister" className="btn btn-premium px-4">Register</Link>
              </>
            ) : (
              <div className="dropdown">
                <button className="btn d-flex align-items-center gap-2 premium-card p-2 px-3 border-0" type="button" data-bs-toggle="dropdown">
                  <div className="premium-gradient rounded-circle d-flex align-items-center justify-content-center" style={{width: 35, height: 35}}>
                    <User size={18} color="white" />
                  </div>
                  <span className="fw-bold text-dark">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg p-2 mt-2 rounded-4">
                  <li>
                    <Link className="dropdown-item rounded-3 py-2 d-flex align-items-center gap-2" 
                      to={user.role === 'admin' ? '/adminLayout/adminDashboard' : user.role === 'employer' ? '/employerLayout/dashboard' : '/userLoginLayout/myApplication'}>
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider bg-light" /></li>
                  <li>
                    <button className="dropdown-item text-danger rounded-3 py-2 d-flex align-items-center gap-2" onClick={handleLogout}>
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
