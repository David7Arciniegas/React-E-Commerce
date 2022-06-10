import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from "../../utils/getConfig";
import { getProducts } from './products.slice';

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
            dispatch(getProducts());
            alert("Product added to cart!")
            })
        .catch(error => alert(error.response.data.message))
        .finally(() => dispatch(setIsLoading(false)));
};




export default cartSlice.reducer;
