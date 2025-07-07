import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserTie, FaSignInAlt } from "react-icons/fa";
export const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-white py-2 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/10698/10698323.png"
            alt="JobPortal Logo"
            height="60"
            style={{ objectFit: "contain", width: "100px" }}
          />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              color: "d",
            }}
          >
            Job Portal
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/AdminLogin" style={navItemStyle}>
              <FaUserTie /> Admin Login
            </Nav.Link>

            <Nav.Link as={Link} to="/login" style={navItemStyle}>
              <FaSignInAlt /> User Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const navItemStyle = {
  color: "black",
  fontSize: "1.1rem",
  fontWeight: "500",
  textTransform: "uppercase",
  margin: "0 10px",
  padding: "8px 15px",
  transition: "all 0.3s ease",
};

NavBar;
