import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterCategory, filterTitle, getProducts } from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, FormControl, InputGroup, ListGroup, Row } from "react-bootstrap";
import axios from "axios";
import "../styles/home.css";



const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ search, setSearch ] = useState("");
  const [ categories, setCategories ] = useState([]);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());

    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories") 
    .then(res => setCategories(res.data.data.categories))
  }, [dispatch]);

  const filterProducts = () => {
    dispatch(filterTitle(search));  

  }
  const selectCategory = (id) => {
    dispatch(filterCategory(id));
  }


    
  return (
    <div>
      
      <h3 className="home-title">Categories</h3>
        <Row>
          <Col lg={3}>
            <ListGroup style={{ cursor: "pointer" }}>
              {
                categories.map(category => (
                  <ListGroup.Item key={category.id} 
                    onClick={() => selectCategory(category.id)}>
                    {category.name}
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </Col>

          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="What are you looking for?"
                aria-label="What are you looking for?"
                aria-describedby="basic-addon2"
                onChange={e => setSearch(e.target.value)}
                value={search}
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={filterProducts}>
                Button
              </Button>
            </InputGroup>
            <Row xs={1} md={2} lg={3} className="g-4">
              {products.map((productsItem) => (
                <Col key={productsItem.id}>
                  <Card
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/products/${productsItem.id}`)}
                  >
                    <div className="home-image">
                    <Card.Img variant="top" src={productsItem.productImgs[0]} className="img-fluid"/>
                    </div>
                    <Card.Body>
                      <Card.Title>{productsItem.title}</Card.Title>
                      
                      <Card.Text>Price: ${productsItem.price}</Card.Text>
                      <Button >Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          
          </Col>
        </Row>
          

    </div>
  );
};

export default Home;
