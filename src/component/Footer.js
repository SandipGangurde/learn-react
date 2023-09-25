import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <div className="footer p-2 fixed-bottom">
      <Container>
        <Row className="justify-content-between">
          <Col>
            <p>&copy; {new Date().getFullYear()} Your Company Name</p>
          </Col>
          <Col className="text-end">
            <span>Terms of Service | Privacy Policy</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
