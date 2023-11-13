import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiGetPublicProvinces = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: "get",
                url: "https://vapi.vnappmob.com/api/province/",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPublicDistrict = (provinceId: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPublicWard = (districtId: any) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/ward/${districtId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getLocation = async (locationName: any) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                locationName
            )}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi gửi yêu cầu: " + error);
    }
};

export const apiGetAllAddress = (data: any) =>
    axios({
        url: `/addresses`,
        method: "GET",
        headers: { Authorization: `Bearer ${data}` },
    });

export const apiCreateAddress = (data: any, dataToken: any) =>
    axios({
        url: `/addresses`,
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${dataToken}` },
    });

export const apiDeleteAddress = (id: any) =>
    axios({
        url: `/addresses/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
