import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";

export const AdminManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/admin/applied-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/jobs/${id}/approve`);
      fetchJobs();
    } catch (err) {
      console.error("Error approving job", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  return (
    <div>
      <Container className="mt-4">
        <h3>🛠 Manage Job Posts with Applications</h3>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Posted On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((item, index) => {
                const job = item.job;
                const applications = item.applications;

                return (
                  <React.Fragment key={job._id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.status}</td>
                      <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleApprove(job._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                    {applications.length > 0 && (
                      <tr>
                        <td colSpan="6">
                          <strong>Applicants:</strong>
                          <ul className="mt-2">
                            {applications.map((app) => (
                              <li key={app._id} className="mb-2">
                                👤{" "}
                                <strong>{app.user?.name || "No Name"}</strong> —{" "}
                                {app.user?.email}
                                <br />
                                📝{" "}
                                <em>
                                  {app.coverLetter ||
                                    "No cover letter provided."}
                                </em>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};
