import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { InputField, Required } from "../../customer-site/components";
import { apiLogin } from "../../../apis";
import { useNavigate } from "react-router-dom";
import path from "../../customer-site/utils/path";
import pathAdmin from "../../admin-site/utils/path";
import Swal from "sweetalert2";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
import {
    SignInInterface,
    CheckValidInterface,
} from "../../../interface/client/login";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
    const [payload, setPayload] = useState<SignInInterface>({
        email: "",
        password: "",
    });

    const [checkValid, setCheckValid] = useState<CheckValidInterface>({
        email: false,
        password: false,
    });
    const navigate = useNavigate();
    useEffect(() => {
        socket.on("message", (newMessage) => {
            setTimeout(() => {
                navigate(`/${path.HOME}`);
            }, 1000);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const handleLogin = async () => {
        if (payload.email === "") {
            setCheckValid((prevState) => ({
                ...prevState,
                email: true,
            }));
        }
        if (payload.password === "") {
            setCheckValid((prevState) => ({
                ...prevState,
                password: true,
            }));
        }
        if (payload.email !== "" && payload.password !== "") {
            const response = await apiLogin(payload);
            if ((response as any).data.success) {
                localStorage.setItem(
                    "auth",
                    (response as any).data.access_token
                );

                navigate(
                    `${
                        Number(response.data.data.roleId) === 1
                            ? `/${path.HOME}`
                            : `/admin/${pathAdmin.DASHBOARD}`
                    }`
                );
                window.location.reload();
            } else {
                Swal.fire("Oops!", (response as any).message, "error");
            }
        }
    };

    const handleClick = async () => {
        window.open(
            "http://localhost:5000/api/v1/auth/google",
            "mywindow",
            "width=600,height=400,location=no,menubar=no,scrollbars=yes,status=no,titlebar=no"
        );
    };

    return (
        <div className="mt-8 flex flex-col">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <InputField
                    value={payload.email}
                    setValue={setPayload}
                    keywords="email"
                />
                <Required
                    value={payload.email}
                    valid={checkValid.email}
                    keywords="email"
                    setShow={setCheckValid}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <InputField
                    value={payload.password}
                    setValue={setPayload}
                    keywords="password"
                    type="password"
                />
                <Required
                    value={payload.password}
                    valid={checkValid.password}
                    keywords="password"
                    setShow={setCheckValid}
                />
            </div>
            <div className="flex justify-center gap-2">
                <Button
                    onClick={() => {
                        handleLogin();
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded w-[100px]"
                >
                    Login
                </Button>
                <Button
                    onClick={() => {
                        handleClick();
                    }}
                    className="bg-white border border-collapse hover:bg-gray-200 text-white font-bold py-3 px-9 rounded w-[100px]"
                >
                    <FcGoogle className="text-2xl" />
                </Button>
            </div>
        </div>
    );
};

export default Signin;
