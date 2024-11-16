import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">UPI Fraud Detection</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
