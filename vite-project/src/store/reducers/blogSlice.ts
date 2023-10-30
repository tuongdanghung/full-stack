import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions";

export const appSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: null,
        oneBlog: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.GetAllBlog.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.GetAllBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload;
        });
        builder.addCase(actions.GetOneBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.oneBlog = action.payload;
        });
        builder.addCase(actions.GetAllBlog.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default appSlice.reducer;
