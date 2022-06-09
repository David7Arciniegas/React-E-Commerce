import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCart } from "../store/slices/cart.slice";

const LoadingScreen = () => {

  const logout = () => localStorage.setItem("token", "")
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/#/">e-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/login">Login</Nav.Link>
              <Nav.Link href="/#/Purchases">Purchases</Nav.Link>
              <Nav.Link href="/#/Cart">Cart</Nav.Link>
              <Nav.Link role="button" onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default LoadingScreen;
