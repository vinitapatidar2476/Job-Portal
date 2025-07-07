import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      console.warn("No token found. Skipping API call.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/applications/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Applications fetched:", res.data.applications);
        setApplications(res.data.applications);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Failed to fetch applications",
          err.response?.data || err
        );
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const statusColor = (status) => {
    if (!status) return "orange";
    switch (status.toLowerCase()) {
      case "approved":
        return "green";
      case "rejected":
        return "red";
      default:
        return "orange";
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      <Container className="pt-5">
        <h2 className="text-center fw-bold mb-4">My Job Applications</h2>

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : applications.length === 0 ? (
          <Alert
            variant="info"
            className="text-center fs-5 shadow-sm rounded-3"
          >
            No applications found.
          </Alert>
        ) : (
          <Row>
            {applications.map((app) => (
              <Col md={6} lg={4} key={app._id} className="mb-4">
                <Card className="shadow-sm h-100 border-0 rounded-4">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="text-primary fw-semibold mb-3">
                        {app.jobId?.title || "Untitled Job"}
                      </Card.Title>

                      <Card.Text>
                        <strong>Company:</strong> {app.jobId?.company || "N/A"}{" "}
                        <br />
                        <strong>Location:</strong>{" "}
                        {app.jobId?.location || "N/A"} <br />
                        <strong>Applied On:</strong>{" "}
                        {formatDate(app.appliedAt) || "N/A"}
                        <br />
                        <strong style={{ color: statusColor(app.status) }}>
                          {" "}
                          Status :
                        </strong>
                        {app.status || "Pending"}
                      </Card.Text>

                      <hr />

                      <Card.Text>
                        <strong>Cover Letter:</strong>
                        <br />
                        <span className="text-muted">{app.coverLetter}</span>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyApplications;
