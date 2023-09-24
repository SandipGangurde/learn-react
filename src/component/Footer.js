import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <div className="footer d-flex justify-content-between p-2">
      <p>&copy; {new Date().getFullYear()} Your Company Name</p>

      <div>Terms of Service | Privacy Policy</div>
    </div>
  );
}

export default Footer;
