import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiCreateCategory = (data: any) =>
    axios({
        url: "/category/create",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllCategory = (data: string) =>
    axios({
        url: "/category",
        method: "GET",
        params: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteCategory = (data: any) =>
    axios({
        url: `/category/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${data.token}` },
    });

export const apiUpdateCategory = (data: any) =>
    axios({
        url: `/category/${data.id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${data.token}` },
    });
