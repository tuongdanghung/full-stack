import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiCreateProduct = (data: any) =>
    axios({
        url: "/products",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllProduct = (data: any) =>
    axios({
        url: `/products`,
        params: data,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiProductDetail = (detail: any) =>
    axios({
        url: `/products/${detail}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteProduct = (id: any) =>
    axios({
        url: `/products/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiEditProduct = (id: any, data: any, dataToken: any) =>
    axios({
        url: `/products/${id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${dataToken}` },
    });

export const apiEditStatusProduct = (id: any, data: any) =>
    axios({
        url: `/products/block/${id}`,
        data: { active: data },
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });

// product

export const apiCreateCapacity = (data: any) =>
    axios({
        url: "/capacities",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllCapacity = (data: any) =>
    axios({
        url: "/capacities",
        params: data,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiEditCapacity = (data: any) =>
    axios({
        url: `/capacities/${data.id}`,
        data: { size: data.size, percent: data.percent },
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteCapacity = (data: any) =>
    axios({
        url: `/capacities/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

// capacity

export const apiCreateColor = (data: any) =>
    axios({
        url: "/colors",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllColor = (data: any) =>
    axios({
        url: "/colors",
        method: "GET",
        params: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteColor = (data: any) =>
    axios({
        url: `/colors/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiEditColor = (data: any) =>
    axios({
        url: `/colors/${data.id}`,
        data: { color: data.color },
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });

// color

export const apiCreateProductCapacity = (data: any) =>
    axios({
        url: "/products/productCapacity",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteProductCapacity = (data: any) =>
    axios({
        url: "/products/productCapacity",
        method: "DELETE",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

//Capacity

export const apiCreateProductColor = (data: any) =>
    axios({
        url: "/products/productColor",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteProductColor = (data: any) =>
    axios({
        url: "/products/productColor",
        method: "DELETE",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateImage = (data: any, id: number, dataToken: any) =>
    axios({
        url: `/products/image/${id}`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${dataToken}` },
    });

export const apiDeleteImage = (id: number, dataToken: any) =>
    axios({
        url: `/products/image/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${dataToken}` },
    });

export const apiCreateImage = (data: any, dataToken: any) =>
    axios({
        url: "/products/image",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${dataToken}` },
    });
