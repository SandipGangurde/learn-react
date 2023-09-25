import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function AdminNavbar() {
  const navigate = useNavigate();

  // Handles user logout, clears local storage, and navigates to the home page
  const handleLogout = () => {
    toast.success("Logout successfully");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-light menu-bg fixed-top">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className="nav-menu m-2" to="/admin/player">
                Player
              </NavLink>
              <NavLink className="nav-menu m-2" to="/admin/team">
                Team
              </NavLink>
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
