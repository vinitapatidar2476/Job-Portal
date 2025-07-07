import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NavBar } from "./NavBar";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div
        style={{
          background: "linear-gradient(135deg, #6e8efb, #a777e3)",
          minHeight: "90vh",
          padding: "50px 0",
          color: "white",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-5 mb-md-0">
              <motion.h1
                className="display-4 fw-bold mb-3"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                Find Your <span style={{ color: "#ffc107" }}>Dream Job</span>
              </motion.h1>

              <motion.p
                className="lead mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ fontSize: "1.2rem" }}
              >
                Discover thousands of job opportunities, connect with top
                companies, and take your career to the next level.
              </motion.p>

              <motion.div
                className="d-flex gap-3 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  variant="light"
                  className="fw-bold"
                  onClick={() => navigate("/login")}
                >
                  Browse Jobs
                </Button>
                <Button
                  variant="warning"
                  className="fw-bold text-white"
                  onClick={() => navigate("/AdminLogin")}
                >
                  Post a Job
                </Button>
              </motion.div>
            </Col>

            <Col md={6} className="text-center">
              <motion.img
                src="https://img.freepik.com/free-vector/tiny-people-searching-business-opportunities_74855-19928.jpg?semt=ais_hybrid&w=740"
                alt="Job search illustration"
                className="img-fluid"
                style={{
                  maxHeight: "400px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </Col>
          </Row>

          {/* Feature Highlights */}
          <Row className="mt-5 text-center">
            {[
              { title: "1000+ Jobs", desc: "Wide range of industries" },
              { title: "Top Companies", desc: "Verified employers hiring now" },
              { title: "Secure Platform", desc: "Safe & trusted applications" },
            ].map((item, index) => (
              <Col md={4} key={index} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card
                    bg="light"
                    text="dark"
                    className="h-100 shadow-sm border-0 rounded-4"
                  >
                    <Card.Body>
                      <Card.Title className="fw-bold fs-4">
                        {item.title}
                      </Card.Title>
                      <Card.Text>{item.desc}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};
