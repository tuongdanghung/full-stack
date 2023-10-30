import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions";

export const appSlice = createSlice({
    name: "products",
    initialState: {
        products: null,
        detail: {},
        brand: [],
        category: [],
        capacity: [],
        ram: [],
        color: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.GetAllProduct.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.GetAllProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        });

        builder.addCase(actions.GetProductDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.detail = action.payload;
        });

        builder.addCase(actions.GetBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brand = action.payload;
        });

        builder.addCase(actions.GetCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category = action.payload;
        });

        builder.addCase(actions.GetRam.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ram = action.payload;
        });

        builder.addCase(actions.GetCapacity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.capacity = action.payload;
        });

        builder.addCase(actions.GetColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.color = action.payload;
        });

        builder.addCase(actions.GetAllProduct.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default appSlice.reducer;
