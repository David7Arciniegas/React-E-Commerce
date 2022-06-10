import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../store/slices/cart.slice';
import { filterCategory } from '../store/slices/products.slice';



const ProductsDetail = () => {

    const [ product, setProducts ] = useState({})
    const [ quantity, setQuantity ] = useState("")
    const { id } = useParams();
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    useEffect(() => {
       axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
             .then(res => {
                 const productsSearched = res.data.data.products.find(
                  productsItem => productsItem.id === Number(id));
                 setProducts(productsSearched);
                 dispatch(filterCategory(productsSearched.category.id));
                
             });
        
    }, [ dispatch, id])

    const addProduct = () => {
      const item = {
        id : Number(id),
        quantity: Number(quantity)   
      }
      console.log(item)
      dispatch(addToCart(item));
    }
   
   
 
    return (


        <div>
                <Card
                    style={{ cursor: "pointer" }}>
                    <Card.Img variant="top" src={product.productImgs} className="image-fluid"/>
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <input
                       onChange={e => setQuantity(e.target.value)}
                       value={quantity} 
                       type="number"
                       placeholder='Quantity'
                       />
                      <Button onClick={addProduct}>Add to Cart</Button>
                    </Card.Body>
                  </Card>

            
            <h2>Discover similar items</h2>
            <Row xs={1} md={2} lg={3} className="g-4">

          {products.map((productsItem) => (
             
                <Col key={productsItem.id}>
                  <Card
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/products/${productsItem.id}`)}
                    >
                    <Card.Img variant="top" src={productsItem.productImgs} width="10px" />
                    <Card.Body>
                      <Card.Title>{productsItem.title}</Card.Title>
                      <Card.Text>wefwegwe</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
               
              ))}
               </Row>
             
               
        </div>
    );
};

export default ProductsDetail;
