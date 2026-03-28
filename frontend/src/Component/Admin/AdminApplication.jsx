import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Card, Spinner } from "react-bootstrap";

export const AdminApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/applications"
      );
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
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
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4 text-primary">📄 All Job Applications</h3>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <p className="text-center text-muted">No applications found.</p>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle text-center"
            >
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Applicant Name</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Applied At</th>
                  
                  <th>Resume</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app._id}>
                    <td>{index + 1}</td>
                    <td>{app.user?.name || "—"}</td>
                    <td>{app.user?.email || "—"}</td>
                    <td>{app.jobId?.title || "—"}</td>
                    <td>
                      {app.appliedAt
                        ? new Date(app.appliedAt).toLocaleDateString()
                        : "—"}
                    </td>
                   
                    <td>
                      {app.resume ? (
                        <a
                          href={`http://localhost:5000/${app.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          Download
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
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
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};