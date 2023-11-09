import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions";

export const appSlice = createSlice({
    name: "users",
    initialState: {
        users: null,
        oneUser: null,
        isLoading: false,
        carts: null,
        address: null,
        favorite: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.GetAllUsersByAdmin.pending, (state: any) => {
            state.isLoading = true;
        });

        builder.addCase(
            actions.GetAllUsersByAdmin.fulfilled,
            (state: any, action) => {
                state.isLoading = false;
                state.users = action.payload;
            }
        );

        builder.addCase(actions.GetOneUser.fulfilled, (state: any, action) => {
            state.isLoading = false;
            state.oneUser = action.payload;
        });

        builder.addCase(actions.GetAllCart.fulfilled, (state: any, action) => {
            state.isLoading = false;
            state.carts = action.payload;
        });

        builder.addCase(
            actions.GetAllAddress.fulfilled,
            (state: any, action) => {
                state.isLoading = false;
                state.address = action.payload;
            }
        );
        builder.addCase(
            actions.GetAllFavorite.fulfilled,
            (state: any, action) => {
                state.isLoading = false;
                state.favorite = action.payload;
            }
        );

        builder.addCase(actions.GetAllUsersByAdmin.rejected, (state: any) => {
            state.isLoading = false;
        });
    },
});

export default appSlice.reducer;
