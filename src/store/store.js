import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        food: foodReducer,
        user: userReducer,
    },
});