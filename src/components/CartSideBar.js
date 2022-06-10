import React, { useEffect } from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/slices/cart.slice";
import {useNavigate} from "react-router-dom"; 

const CartSideBar = ({ show, handleClose }) => {



  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const selectCartItem = (cartItem) => {
     handleClose();
    navigate(`/products/${cartItem.id}`)

  } 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

 

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {cartItems.map((cartItem) => (
              <ListGroup.Item onClick={() => selectCartItem(cartItem)}key={cartItem.id}>
                <h2>{cartItem.title}</h2>
                {cartItem.description}
                <h3>Quantity: {cartItem.quantity}</h3>
               </ListGroup.Item>

            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartSideBar;
