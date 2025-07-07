import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { NavBar } from "../NavBar";
import { Footer } from "../../Footer";

const AdminLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />

      <Container fluid className="flex-grow-1">
        <Row className="flex-grow-1">
          <Col
            md={3}
            className="bg-dark text-white p-4 d-flex flex-column"
            style={{ minHeight: "100vh" }}
          >
            <h4 className="text-center mb-4">Admin Panel</h4>
            <Nav variant="pills" className="flex-column gap-2">
              <Nav.Link
                as={Link}
                to="adminDashboard"
                className="text-white bg-secondary rounded px-3 py-2"
              >
                📊 Dashboard
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="adminJobs"
                className="text-white bg-secondary rounded px-3 py-2"
              >
                🛠 Jobs
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="postJob"
                className="text-white bg-secondary rounded px-3 py-2"
              >
                ➕ Post a Job
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="adminManageJobs"
                className="text-white bg-secondary rounded px-3 py-2"
              >
                📁 Manage Jobs
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="adminApplications"
                className="text-white bg-secondary rounded px-3 py-2"
              >
                📝 Applications
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="adminUsers"
                className="text-white bg-secondary rounded px-3 py-2"
              >
                👤 Users
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="adminLogout"
                className="text-white bg-secondary rounded px-3 py-2"
              >
                🔒 Logout
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={9} className="p-4 bg-light">
            <Outlet />
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default AdminLayout;
