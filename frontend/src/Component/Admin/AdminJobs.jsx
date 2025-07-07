import React from "react";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
export const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div>
      <Container className="mt-4">
        <h3>🛠 Job Posts</h3>

        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Company</th>
              <th> Job Type</th>
              <th>Location</th>
              <th>Posted On</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.jobType}</td>
                <td>{job.location}</td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
