import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from "../../utils/getConfig";
import { getProducts } from './products.slice';
import { getPurchases } from './purchases.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [], 
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})


export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
};

export const addToCart = (item) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", item, getConfig())
        .then(() => {
            dispatch(getCart());
            alert("Product added to cart!")
            })
        .catch((error) => {dispatch(getProducts());alert(error.response.data.message)})
        .finally(() => dispatch(setIsLoading(false)));
};



export const buyProduct = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => {
            dispatch(getPurchases())
            dispatch(setCart([]));
          })
         .finally(() => dispatch(setIsLoading(false)));
};




export default cartSlice.reducer;
