import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/saved-jobs/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedJobs(res.data.savedJobs);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (jobId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:5000/api/saved-jobs/unsave/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSavedJobs((prev) => prev.filter((job) => job.job?._id !== jobId));
    } catch (err) {
      alert("Error unsaving job");
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Saved Jobs</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : savedJobs.length === 0 ? (
        <Alert variant="info" className="text-center">
          No saved jobs found.
        </Alert>
      ) : (
        <Row>
          {savedJobs
            .filter((item) => item.job) // ✅ only render if job is not null
            .map((item) => (
              <Col md={6} lg={4} key={item._id} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>{item.job.title || "Untitled Job"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.job.company || "N/A"}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Location:</strong> {item.job.location || "N/A"}
                      <br />
                      <strong>Type:</strong> {item.job.jobType || "N/A"}
                      <br />
                      <strong>Salary:</strong> ₹{item.job.salary || "N/A"}
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleUnsave(item.job._id)}
                    >
                      ❌ Unsave
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default SavedJobs;
