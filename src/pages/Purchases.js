import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../store/slices/purchases.slice";

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
    <div>
      <h1>Purchases</h1>

      <ul>
        {purchases.map((purchase) => (
          <div key={purchase.id}>
            <h4>
              Created:{" "}
              {new Date(purchase.createdAt).toLocaleDateString(
                "en-us",
                options
              )}
            </h4>

            {purchase.cart.products.map((product) => (
              <li
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.title}
                <div key={product.id}>
                  Quantity: {product.productsInCart.quantity}
                  Price: $ {product.price}
                </div>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
