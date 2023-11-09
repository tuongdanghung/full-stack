import { Button } from "flowbite-react";
import { useState } from "react";
import MapComponent from "../../components/map";
import { apiCreateAddress, apiDeleteAddress } from "../../../../apis";
import { GetOneUser } from "../../../../store/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
type Props = {
    address: any;
};

const AddressProfile = (props: Props) => {
    const token = localStorage.getItem("auth");
    const dispatch = useDispatch<AppDispatch>();
    const [addressData, setAddressData] = useState({
        province: "",
        district: "",
        ward: "",
    });
    const [phone, setPhone] = useState(0);
    const [isCheck, setIsCheck] = useState(true);
    const dataMap = (data: any) => {
        setAddressData({
            province: data.province,
            district: data.district,
            ward: data.ward,
        });
    };
    const handleCreate = async () => {
        const data = {
            ...addressData,
            phone,
        };
        const response = await apiCreateAddress(data);
        if (response.data.success) {
            dispatch(GetOneUser(token));
            toast.success("Add new address successfully");
            setIsCheck(!isCheck);
        } else {
            toast.error("Add new address failed");
        }
    };
    const handleDeleteAddress = async (id: number) => {
        const response = await apiDeleteAddress(id);
        if (response.data.success) {
            dispatch(GetOneUser(token));
            toast.success(" Delete address successfully");
        } else {
            toast.error(" Delete address failed");
        }
    };
    return (
        <div>
            <div className="mt-2">
                <div className="bg-white p-3 shadow-sm border border-collapse rounded-md">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="tracking-wide">Address</span>
                    </div>
                    <div className="text-gray-700">
                        {props?.address?.map((item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className=" flex items-center p-2 text-sm border border-separate my-3 rounded-md"
                                >
                                    <div className="w-[80%]">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">
                                                Province
                                            </div>
                                            <div className="px-4 py-2">
                                                {item.province}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">
                                                District
                                            </div>
                                            <div className="px-4 py-2">
                                                {item.district}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">
                                                Ward
                                            </div>
                                            <div className="px-4 py-2">
                                                {item.ward}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">
                                                Phone
                                            </div>
                                            <div className="px-4 py-2">
                                                {item.phone}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-[10%] px-4 h-[50px]"
                                        onClick={() =>
                                            handleDeleteAddress(item.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                    <Button
                        className={`w-[10%] h-[50px] mr-2 ${
                            isCheck === false ? "hidden" : "block"
                        }`}
                        onClick={() => setIsCheck(!isCheck)}
                    >
                        Add New
                    </Button>
                    {!isCheck ? (
                        <div className="p-3 shadow-sm border border-collapse rounded-md">
                            <MapComponent
                                dataMap={dataMap}
                                setPhone={setPhone}
                            />
                            <Button
                                className={`w-[10%] h-[50px] mr-2 mt-5`}
                                onClick={handleCreate}
                            >
                                Add New
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddressProfile;
