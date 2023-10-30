import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiCreateBrand = (data: any) =>
    axios({
        url: "/brand/create",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllBrand = (data: string) =>
    axios({
        url: "/brand",
        method: "GET",
        params: data,
        headers: { Authorization: `Bearer ${token}` },
    });
export const apiDeleteBrand = (data: any) =>
    axios({
        url: `/brand/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${data.token}` },
    });

export const apiUpdateBrand = (data: any) =>
    axios({
        url: `/brand/${data.id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${data.token}` },
    });
