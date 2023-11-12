import axios from "../config/axios";
const token = localStorage.getItem("auth");

export const apiCreateUer = (data: any) =>
    axios({
        url: "/users",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllUer = (params: any) =>
    axios({
        url: "/users",
        method: "GET",
        params: { email: params },
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetOneUser = (token: any) =>
    axios({
        url: "/users/me",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiRegister = (data: object) =>
    axios({
        url: "/auth/register",
        method: "POST",
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiLogin = (data: object) =>
    axios({
        url: "/auth/login",
        method: "POST",
        withCredentials: true,
        data: data,
    });

export const apiFinalRegister = (params: any) =>
    axios({
        url: `/auth/verifyAccount/${params}`,
        method: "PUT",
    });

export const apiUpdateUser = (data: any) =>
    axios({
        url: `/users/update`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateUserByAdmin = (data: any) =>
    axios({
        url: `/users/updateByAdmin/${data.id}`,
        method: "PUT",
        data: {
            status: data.status,
        },
        headers: { Authorization: `Bearer ${data.token}` },
    });

export const apiGetAllCart = (data: any) =>
    axios({
        url: "/carts",
        method: "GET",
        headers: { Authorization: `Bearer ${data}` },
    });

export const apiCreateCart = (data: any) =>
    axios({
        url: `/carts`,
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllFavorite = (data: any) =>
    axios({
        url: "/favorites",
        method: "GET",
        headers: { Authorization: `Bearer ${data}` },
    });

export const apiCreateFavorite = (data: any) =>
    axios({
        url: `/favorites`,
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteFavorite = (id: any) =>
    axios({
        url: `/favorites/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateCart = (id: number, data: any) =>
    axios({
        url: `/carts/${id}`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteCart = (id: any) =>
    axios({
        url: `/carts/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiForgotPassword = (data: any) =>
    axios({
        url: "/user/forgotpassword",
        method: "POST",
        data: data,
    });

export const apiResetToken = (data: any) =>
    axios({
        url: "/user/resetpassword",
        method: "PUT",
        data: data,
    });

export const apiLoginGoogle = () =>
    axios({
        url: "/auth/google/redirect",
        method: "GET",
    });
