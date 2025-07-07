import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";

export const AdminApplication = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/applications"
      );
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/applications/${id}`);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  return (
    <Container className="mt-4">
      <h3>📄 All Applications</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Applicant Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Applied At</th>
            <th>Cover Letter</th>
            <th>Resume</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app._id}>
              <td>{index + 1}</td>
              <td>{app.user?.name}</td>
              <td>{app.user?.email}</td>
              <td>{app.jobId?.title}</td>
              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
              <td>{app.coverLetter || "—"}</td>
              <td>
                {app.resume ? (
                  <a
                    href={`http://localhost:5000/${app.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    Download
                  </a>
                ) : (
                  "No Resume"
                )}
              </td>

              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(app._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
