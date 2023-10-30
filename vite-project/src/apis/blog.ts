import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiCreateBlog = (data: any) =>
    axios({
        url: "/blog/create",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllBlog = (data: string) =>
    axios({
        url: "/blog",
        method: "GET",
        params: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetOneBlog = (data: any) =>
    axios({
        url: `/blog/${data.id}`,
        method: "GET",
        params: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteBlog = (data: any) =>
    axios({
        url: `/blog/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateBlog = (data: any) =>
    axios({
        url: `/blog/${data._id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });
