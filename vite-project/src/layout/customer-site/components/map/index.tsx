import { ChangeEvent, useEffect, useState } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../../../../apis";

type Props = {
    dataMap: any;
};

const MapComponent = (props: Props) => {
    const [provinces, setProvinces] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const [wards, setWards] = useState<any>([]);
    const [province, setProvince] = useState<any>("");
    const [district, setDistrict] = useState<any>("");
    const [ward, setWard] = useState<any>("");
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if ((response as any).status === 200) {
                setProvinces((response as any)?.data.results);
            }
        };
        fetchPublicProvince();
    }, []);
    useEffect(() => {
        setDistrict(null);
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            if ((response as any).status === 200) {
                setDistricts((response as any).data?.results);
            }
        };
        province && fetchPublicDistrict();
        !province && setDistricts([]);
    }, [province]);

    useEffect(() => {
        setWard(null);
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(district);
            if ((response as any).status === 200) {
                setWards((response as any).data?.results);
            }
        };
        district && fetchPublicWard();
        !district && setWards([]);
    }, [district]);

    const handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionValue = event.target.value;
        setProvince(selectedOptionValue);
    };
    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionValue = event.target.value;
        setDistrict(selectedOptionValue);
    };
    const handleWardChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionValue = event.target.value;
        setWard(selectedOptionValue);
        const findProvince = provinces?.find(
            (select: any) => select.province_id === province
        );
        const findDistrict = districts?.find(
            (select: any) => select.district_id === district
        );
        const findWard = wards?.find(
            (select: any) => select.ward_id === selectedOptionValue
        );

        props.dataMap({
            province: findProvince.province_name,
            district: findDistrict.district_name,
            ward: findWard.ward_name,
        });
    };
    return (
        <div>
            <h2 className="font-semibold text-xl py-4">Delivery address</h2>
            <div className="flex flex-col gap-4">
                <select
                    value={province ? province : ""}
                    onChange={handleProvinceChange}
                >
                    <option value="">Choose Option</option>
                    {provinces?.map((item: any, index: number) => {
                        return (
                            <option key={index} value={item.province_id}>
                                {item.province_name}
                            </option>
                        );
                    })}
                </select>
                <select
                    value={district ? district : ""}
                    onChange={handleDistrictChange}
                >
                    <option value="">Choose Option</option>
                    {districts?.map((item: any, index: number) => {
                        return (
                            <option key={index} value={item.district_id}>
                                {item.district_name}
                            </option>
                        );
                    })}
                </select>
                <select value={ward ? ward : ""} onChange={handleWardChange}>
                    <option value="">Choose Option</option>
                    {wards?.map((item: any, index: number) => {
                        return (
                            <option key={index} value={item.ward_id}>
                                {item.type}
                                {item.ward_name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default MapComponent;
