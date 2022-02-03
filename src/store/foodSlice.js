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
        removeFromBasket: (state, action) => {
            const index = action.payload;
            const newBasket = [...state.basket]
            if(index >= 0){
                newBasket.splice(index, 1);
            }else {
                console.alertS(`Cant remove product (id: ${action.id}) as its not in basket`)
            }
            state.basket = newBasket;
        },
    },
});

export const getCartItems = state => state.food.basket;

export const getCartTotal = state => state.food.total;

export const getCartLength = state => state.food.basket.length;

export const { addToBasket, removeFromBasket } = foodSlice.actions;

export default foodSlice.reducer;