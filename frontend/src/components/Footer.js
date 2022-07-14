import React from "react";
import { Container, Row, Col, } from "react-bootstrap";


function Footer() {
  return (
    <div>
      <footer >

        <div className="bg-dark text-light" >
          <Container fluid className="text-center">
          <Row>
            <Col md={3} className="text-center">
              <h1>E-Commerce</h1>
            </Col>
            <Col md={6} className="text-center py-3">
              Copyright &copy; ECommerce
            </Col>
            <Col md={3} className="text-center">
              <h2>Social Links</h2>

              <i className="fa-brands fa-facebook fa-2xl"></i>
              <i className="fa-brands fa-twitter ms-2 fa-2xl"></i>
            </Col>
          </Row>
          </Container>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
