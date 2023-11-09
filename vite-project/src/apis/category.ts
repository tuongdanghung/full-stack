import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiCreateCategory = (data: any) =>
    axios({
        url: "/categories",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllCategory = (data: string) =>
    axios({
        url: "/categories",
        method: "GET",
        params: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteCategory = (data: any) =>
    axios({
        url: `/categories/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${data.token}` },
    });

export const apiUpdateCategory = (data: any) =>
    axios({
        url: `/categories/${data.id}`,
        data: { title: data.title },
        method: "PUT",
        headers: { Authorization: `Bearer ${data.token}` },
    });
