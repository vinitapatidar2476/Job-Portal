import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

export const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs/list");
        const data = await response.json();
        console.log("Jobs fetched from backend:", data);
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplyModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("TOKEN FROM LOCAL STORAGE:", token);
    const formData = new FormData();
    formData.append("jobId", selectedJobId);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Applied successfully!");
      setShowApplyModal(false);
      setCoverLetter("");
      setResume(null);
    } catch (error) {
      console.error(
        "Error while applying:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Error applying for job");
    }
  };

  const handleSaveJob = async (jobId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/saved-jobs/save",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job saved!");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving job");
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
        <h2 className="mb-4 text-center fw-bold">Available Jobs</h2>
        <Row>
          {jobs.map((job) => (
            <Col key={job._id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fw-bold mb-3 text-primary">
                      {job.title}
                    </Card.Title>
                    <Card.Text>
                      <span className="fw-semibold">Company:</span>{" "}
                      {job.company}
                      <br />
                      <span className="fw-semibold">Location:</span>{" "}
                      {job.location}
                      <br />
                      <span className="fw-semibold">Job Type:</span>{" "}
                      {job.jobType}
                      <br />
                      <span className="fw-semibold">Salary:</span> {job.salary}
                      <br />
                      <span className="fw-semibold">Description:</span>
                      <br />
                      <span className="text-muted">{job.description}</span>
                    </Card.Text>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <Button
                      variant="primary"
                      onClick={() => handleApply(job._id)}
                    >
                      Apply Now
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleSaveJob(job._id)}
                    >
                      Save Job
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal
        show={showApplyModal}
        onHide={() => setShowApplyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Apply for Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmitApplication}
            encType="multipart/form-data"
          >
            <Form.Group controlId="coverLetter" className="mb-3">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a brief cover letter"
              />
            </Form.Group>

            <Form.Group controlId="resume" className="mb-3">
              <Form.Label>Upload Resume (PDF/DOC)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" type="submit">
                Submit Application
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
