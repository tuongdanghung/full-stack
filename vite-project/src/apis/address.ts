import axios from "../config/axios";
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
