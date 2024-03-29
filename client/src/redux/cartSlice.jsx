import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let find = state.cart.findIndex((item) => item._id === action.payload._id);
            if (find >= 0) {
                state.cart[find].quantity += 1;
            } else {
                state.cart.push(action.payload);
            }
        },

        removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
        },
        emptyCart: (state, action) => {
            state.cart = [];
        },
        increaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item._id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        },
        decreaseItemQuantity: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item._id === action.payload) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        },
    },
});

export const {
    addItem,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    emptyCart
} = cartSlice.actions;

export default cartSlice.reducer;