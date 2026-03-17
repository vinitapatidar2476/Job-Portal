import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("secret-12345", res.data.token);
      console.log(res.data.token);
      alert("Login successful");
      navigate("/adminLayout");
    } catch (err) {
      console.error(err);
      alert("Invalid Credentials");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ padding: "2rem", minWidth: "400px" }}>
        <h3 className="mb-4">Admin Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
