import axios from "../config/axios";
export const apiCreateComment = (data: any) =>
    axios({
        url: "/comment/create",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${data.token}` },
    });
