import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOneUser } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { Button, Input } from "@material-tailwind/react";
import { apiUpdateUser } from "../../../../apis";
import { ToastContainer, toast } from "react-toastify";
import AddressProfile from "../address";
const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const oneUser = useSelector((state: any) => state?.userReducer.oneUser);
    const [avatar, setAvatar] = useState("");
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const token = localStorage.getItem("auth");
    const [isCheck, setIsCheck] = useState(true);
    useEffect(() => {
        dispatch(GetOneUser(token));
    }, []);
    useEffect(() => {
        setUserData({
            firstName: oneUser?.firstName,
            lastName: oneUser?.lastName,
            email: oneUser?.email,
        });
    }, [oneUser]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };
    const handleUpdate = async () => {
        const newData = {
            ...userData,
            avatar,
        };
        const formData = new FormData();
        for (let i of Object.entries(newData)) formData.append(i[0], i[1]);
        for (let img of avatar) formData.append("avatar", img);
        const response = await apiUpdateUser(formData, token);
        if (response.status === 200) {
            toast.success("User updated successfully");
            dispatch(GetOneUser(token));
            setIsCheck(true);
        } else {
            toast.success("User updated failed");
        }
    };
    return (
        <div className="p-4 border border-collapse rounded-md m-0">
            <ToastContainer />
            <div className="md:flex no-wrap md:-mx-2 ">
                {/* Right Side */}
                <div className="w-full mx-2 h-full">
                    <div className="bg-white flex p-3 shadow-sm border border-collapse rounded-md">
                        <div className=" flex-1 border border-collapse rounded-md overflow-hidden">
                            <img
                                className="w-full h-full"
                                src={`${oneUser?.avatar}`}
                                alt=""
                            />
                        </div>
                        <div className="border border-collapse rounded-md w-[85%] ml-4 p-4">
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            First Name
                                        </div>
                                        <div className="px-4 py-2">
                                            {oneUser?.firstName}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Last Name
                                        </div>
                                        <div className="px-4 py-2">
                                            {oneUser?.lastName}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Email.
                                        </div>
                                        <div className="px-4 py-2">
                                            {oneUser?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => setIsCheck(!isCheck)}>
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {isCheck !== true ? (
                <div className=" border border-collapse rounded-md mt-6 p-5">
                    <div className="grid grid-cols-4 gap-5">
                        <div>
                            <label>First Name</label>
                            <Input
                                type="text"
                                value={userData?.firstName}
                                name="firstName"
                                className="w-full"
                                crossOrigin={undefined}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <Input
                                type="text"
                                value={userData?.lastName}
                                name="lastName"
                                className="w-full"
                                crossOrigin={undefined}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <Input
                                type="text"
                                disabled
                                name="email"
                                value={userData?.email}
                                className="w-full"
                                crossOrigin={undefined}
                            />
                        </div>
                        <input
                            className="rounded-lg mt-4 border border-separate"
                            onChange={(event: any) =>
                                setAvatar(event.target.files)
                            }
                            type="file"
                            multiple
                        />
                    </div>
                    <Button onClick={handleUpdate} className="mt-4">
                        Update
                    </Button>
                </div>
            ) : null}
            <AddressProfile address={oneUser?.addresses} />
        </div>
    );
};

export default Profile;
