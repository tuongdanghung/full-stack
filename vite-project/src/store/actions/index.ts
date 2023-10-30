import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
import * as type from "../../interface/api";

export const GetAllUsersByAdmin = createAsyncThunk<any, any, type.UserType>(
    "users",
    async (data: string, { rejectWithValue }) => {
        const response = await apis.apiGetAllUer(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetOneUser = createAsyncThunk<any, any, type.UserType>(
    "OneUser",
    async (token: string, { rejectWithValue }) => {
        const response = await apis.apiGetOneUser(token);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.message;
    }
);

export const GetAllProduct = createAsyncThunk<any, any, type.ProductType>(
    "product",
    async (data: any, { rejectWithValue }) => {
        const response = await apis.apiGetAllProduct(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetProductDetail = createAsyncThunk<any, any, type.ProductType>(
    "product-detail",
    async (data: object, { rejectWithValue }) => {
        const response = await apis.apiProductDetail(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetBrand = createAsyncThunk<any, any, type.ProductType>(
    "brand",
    async (data: string, { rejectWithValue }) => {
        const response = await apis.apiGetAllBrand(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetCategory = createAsyncThunk<any, any, type.ProductType>(
    "category",
    async (data: string, { rejectWithValue }) => {
        const response = await apis.apiGetAllCategory(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetRam = createAsyncThunk<any, any, type.ProductType>(
    "ram",
    async (data: string, { rejectWithValue }) => {
        const response = await apis.apiGetAllRam(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetCapacity = createAsyncThunk<any, any, type.ProductType>(
    "capacity",
    async (data: string, { rejectWithValue }) => {
        const response = await apis.apiGetAllCapacity(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetColor = createAsyncThunk<any, any, type.ProductType>(
    "color",
    async (data: string, { rejectWithValue }) => {
        const response = await apis.apiGetAllColor(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetAllOrder = createAsyncThunk<any, any, type.ProductType>(
    "order",
    async (token: string, { rejectWithValue }) => {
        const response = await apis.apiGetAllOrder(token);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetOneOrder = createAsyncThunk<any, any, type.ProductType>(
    "orderByUser",
    async (token: string, { rejectWithValue }) => {
        const response = await apis.apiGetOrder(token);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);

export const GetAllBlog = createAsyncThunk<any, any, type.ProductType>(
    "allBlog",
    async (token: string, { rejectWithValue }) => {
        const response = await apis.apiGetAllBlog(token);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);
export const GetOneBlog = createAsyncThunk<any, any, type.ProductType>(
    "oneBlog",
    async (data: string, { rejectWithValue }) => {
        const response = await apis.apiGetOneBlog(data);
        if (!(response as any).data.success) {
            return rejectWithValue("Error fetching data");
        }
        return response.data.data;
    }
);
