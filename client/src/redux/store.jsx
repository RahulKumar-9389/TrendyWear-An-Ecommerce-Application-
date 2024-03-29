import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        search: searchReducer
    }
});

export default store;