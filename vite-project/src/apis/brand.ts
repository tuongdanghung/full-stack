import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiCreateBrand = (data: any) =>
    axios({
        url: "/brands",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllBrand = (data: string) =>
    axios({
        url: "/brands",
        method: "GET",
        params: data,
        headers: { Authorization: `Bearer ${token}` },
    });
export const apiDeleteBrand = (data: any) =>
    axios({
        url: `/brands/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${data.token}` },
    });

export const apiUpdateBrand = (data: any) =>
    axios({
        url: `/brands/${data.id}`,
        data: { title: data.title },
        method: "PUT",
        headers: { Authorization: `Bearer ${data.token}` },
    });
