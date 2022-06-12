import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../store/slices/purchases.slice";
import "../styles/purchases.css";

const Purchases = () => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  return (
    <div className="div" >
      <p className="title">My Purchases</p>

      <div className="container">
        <Card.Body>
          <Card className="card-one">
            {purchases.map((purchase) => (
              <div key={purchase.id}>
                <Card>
                  <h4 className="date">
                  {" "}
                  {new Date(purchase.createdAt).toLocaleDateString(
                    "en-us",
                    options
                  )}
                  </h4>
                </Card>
                {purchase.cart.products.map((product) => (
                  <Card
                    key={product.id}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    {product.title}
                    <div className="purchases" key={product.id}>
                      <div className="quantity-container">
                        <div className="quantity">
                      {product.productsInCart.quantity}
                      </div>
                      </div>
                      <div>
                      Price: $ {product.price}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </Card>
        </Card.Body>
      </div>
    </div>
  );
};

export default Purchases;
