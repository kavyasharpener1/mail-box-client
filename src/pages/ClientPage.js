import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ClientPage() {
  const Navigate=useNavigate()
  return (
    <Container className="mt-5 p-3" fluid>
      <Row>
        <Col>
          <h1 className="mb-3">Welcome to Mail-Box App </h1>
          <p className="mb-4">Thank you for choosing Mailbox App </p>
          <p> Let's Enjoy the App !!!!</p>
          <Button variant="dark" onClick={()=>Navigate('/Login')}>Get Started</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientPage;