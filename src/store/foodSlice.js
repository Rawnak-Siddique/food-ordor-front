import { createSlice } from '@reduxjs/toolkit'

export const foodSlice = createSlice({
    name: 'food',
    initialState: {
        basket: [],
        total: 0,
    },
    reducers: {
        addToBasket: (state, action) => {
            state.basket.push(action.payload);
            state.total += action.payload.price;
        },
        removeFromBasket: (state, action) => {},
    },
});

export const getCartItems = state => state.food.basket;

export const getCartTotal = state => state.food.total;

export const getCartLength = state => state.food.basket.length;

export const { addToBasket, removeFromBasket } = foodSlice.actions;

export default foodSlice.reducer;