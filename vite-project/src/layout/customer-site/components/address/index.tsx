import { ChangeEvent, useEffect, useState } from "react";
import { GetAllAddress } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";

const AddressComponent = (props: any) => {
    const token = localStorage.getItem("auth");

    const dispatch = useDispatch<AppDispatch>();
    const [province, setProvince] = useState<any>("");
    const address = useSelector((state: any) => state?.userReducer?.address);
    useEffect(() => {
        dispatch(GetAllAddress(token));
    }, []);

    const handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionValue = event.target.value;
        props.handleAddressId(event.target.value);
        props.findAddress(event.target.value);
        setProvince(selectedOptionValue);
        dispatch(GetAllAddress(token));
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
                    {address?.map((item: any, index: number) => {
                        return (
                            <option key={index} value={item.id}>
                                {`${item.province} - ${item.district} - ${item.ward}`}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default AddressComponent;
