import React, { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

function AdminNavbar() {
  const navigate = useNavigate();

  const notify = (message) => {
    toast(message);
  };

  const logout = () => {
    notify("Logout successfully");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className="m-2" to="/admin/player">
                Player
              </NavLink>
              <NavLink className="m-2" to="/admin/team">
                Team
              </NavLink>
              <Button variant="primary" onClick={logout}>
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
