import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
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
    setJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/jobs/create",
        job
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error posting job");
    }
  };

  return (
    <Container className="mt-3">
      <h2>Create New Job</h2>
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
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Post Job
        </Button>
      </Form>
    </Container>
  );
};

export default JobPostForm;
