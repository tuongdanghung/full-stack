import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiGetAllUer = (params: any) =>
    axios({
        url: "/user",
        method: "GET",
        params: { email: params },
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetOneUser = (token: any) =>
    axios({
        url: "/user/me",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
export const apiRegister = (data: object) =>
    axios({
        url: "/user/register",
        method: "POST",
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiLogin = (data: object) =>
    axios({
        url: "/user/login",
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
        url: `/user/update`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateUserByAdmin = (data: any) =>
    axios({
        url: `/user/updateAdmin/${data.id}`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${data.token}` },
    });
export const apiUpdateCart = (data: any) =>
    axios({
        url: `/user/update/cart`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${data.token}` },
    });
export const apiDeleteCart = (data: any) =>
    axios({
        url: `/user/delete-cart/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${data.token}` },
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
