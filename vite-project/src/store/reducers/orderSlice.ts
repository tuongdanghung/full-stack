import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions";

export const appSlice = createSlice({
    name: "orders",
    initialState: {
        orders: null,
        orderByUser: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.GetAllOrder.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.GetAllOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });
        builder.addCase(actions.GetOneOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderByUser = action.payload;
        });
        builder.addCase(actions.GetAllOrder.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default appSlice.reducer;
