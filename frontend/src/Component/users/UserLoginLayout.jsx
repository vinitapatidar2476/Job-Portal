import React from "react";
import { Row, Col } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { NavBar } from "../NavBar";
import { Footer } from "../../Footer";

export const UserLoginLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />

      <Row className="flex-grow-1" style={{ margin: 0 }}>
        {/* Sidebar */}
        <Col
          md={2}
          className="bg-dark text-white p-4 d-flex flex-column"
          style={{ minHeight: "100vh" }}
        >
          <h5 className="text-center mb-4">User Panel</h5>
          <Link
            to="jobList"
            className="text-white bg-secondary rounded px-3 py-2 mb-2 text-decoration-none"
          >
            🔍 Jobs
          </Link>
          <Link
            to="saved-jobs"
            className="text-white bg-secondary rounded px-3 py-2 mb-2 text-decoration-none"
          >
            🔖 Save Jobs
          </Link>
          <Link
            to="myApplication"
            className="text-white bg-secondary rounded px-3 py-2 mb-2 text-decoration-none"
          >
            📄 My Applications
          </Link>

          <Link
            to="userLogout"
            className="text-white bg-secondary rounded px-3 py-2 mb-2 text-decoration-none"
          >
            🔒 Logout
          </Link>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4 bg-light">
          <Outlet />
        </Col>
      </Row>

      <Footer />
    </div>
  );
};
