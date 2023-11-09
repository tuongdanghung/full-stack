import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiCreateOrder = (data: any) =>
    axios({
        url: "/orders",
        method: "POST",
        data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllOrder = (token: string) =>
    axios({
        url: "/orders",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetOrder = (token: string) =>
    axios({
        url: "/orders/byUser",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateOrder = (id: any, data: any) =>
    axios({
        url: `/orders/${id.id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });
