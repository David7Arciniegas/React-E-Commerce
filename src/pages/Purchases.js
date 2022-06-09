import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector((state) => state.purchases);
  
  const options = { year: "numeric", month: "long", day: "numeric"};
  const date = new Date(purchases[0]?.createdAt).toLocaleDateString("en-us", options);

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  return (
    <div>
        <h1>Purchases</h1>
      
      <ul>
        {purchases.map((purchase) => (
            <div>
                <h4>{date}</h4>
            <li  key={purchases[0].cart.products.title} onClick={() => navigate(`/products/${purchase.cart?.products[0].id}`)}>{purchase.cart?.products[0]?.title}
                {purchase.cart.products.map((product) => ( 
                    <div key={purchases[0].cart.products.description}>
                        Quantity: {purchase.cart?.products[0]?.productsInCart.quantity}
                        <div>
                          Price: $ {purchase.cart?.products[0]?.price}
                        </div>
                    </div>
                ))}
                     
            </li>
            </div>
        ))}
            
      </ul>
    </div>
  );
};

export default Purchases;
