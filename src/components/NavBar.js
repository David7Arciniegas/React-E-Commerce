import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart } from "../store/slices/cart.slice";
import CartSideBar from "./CartSideBar";

const LoadingScreen = () => {

  const logout = () => localStorage.setItem("token", "")
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
      const token = localStorage.getItem("token");
  
      if (token) {
        setShow(true);
      } else {
        navigate("/login");
      }
    };
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
              <Nav.Link role="button" onClick={handleShow}>Cart</Nav.Link>
              <Nav.Link role="button" onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CartSideBar show={show} handleClose={handleClose}/>
     
    
    </div>
  );
};

export default LoadingScreen;
