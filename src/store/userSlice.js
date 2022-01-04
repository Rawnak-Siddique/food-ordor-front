import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        account: {},
    },
    reducers: {
        logInUser: (state, action) => {
            state.account = action.payload;
        },
        logOutUser: (state, action) => {
            state.account = null;
        }
    },
});

export const getUser = state => state.user.account;

export const { logInUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;