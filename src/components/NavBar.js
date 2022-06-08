import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/login">Login</Nav.Link>
              <Nav.Link href="/#/purchases">Purchases</Nav.Link>
              <Nav.Link role="button">Cart (Sidebar)</Nav.Link>
            </Nav>
          </Navbar.Collapse> 
        </Container> 
      </Navbar>
    </div>
  );
};

export default NavBar;
