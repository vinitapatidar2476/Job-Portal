import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/adminDashboard"
        );
        console.log(res.data);
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchStats();
  }, []);
  return (
    <Container fluid>
      <h2 className="mb-4">👋 Welcome, Admin</h2>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card bg="primary" text="white" className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Jobs</Card.Title>
              <Card.Text style={{ fontSize: "1.5rem" }}>
                {stats.totalJobs}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card bg="success" text="white" className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Applications</Card.Title>
              <Card.Text style={{ fontSize: "1.5rem" }}>
                {stats.totalApplications}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card bg="warning" text="dark" className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text style={{ fontSize: "1.5rem" }}>
                {stats.totalUsers}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

AdminDashboard;
