import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const JobPostForm = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/jobs/create",
        job
      );
      alert(response.data.message);
      setJob({ title: "", company: "", location: "", salary: "", description: "" });
    } catch (error) {
      console.error(error);
      alert("Error posting job");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card className="shadow-sm" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <h3 className="mb-4 text-center text-primary">➕ Create New Job</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={job.title}
                onChange={handleChange}
                placeholder="Enter job title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={job.company}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={job.description}
                onChange={handleChange}
                placeholder="Enter job description"
                rows={3}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Post Job
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobPostForm;