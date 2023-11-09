import { useState } from "react";
import { SignUpInterface } from "../../../interface/client";
import { InputField, Required, Snipper } from "../../customer-site/components";
import { apiRegister } from "../../../apis";
import Swal from "sweetalert2";

const SignUp = () => {
    const [payload, setPayload] = useState<SignUpInterface>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const [checkValid, setCheckValid] = useState({
        email: false,
        password: false,
        firstName: false,
        lastName: false,
    });
    const [isSnipper, setIsSnipper] = useState(false);
    const resetPayload = () => {
        setPayload({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
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
        if (payload.firstName === "") {
            setCheckValid((prevState) => ({
                ...prevState,
                firstName: true,
            }));
        }
        if (payload.lastName === "") {
            setCheckValid((prevState) => ({
                ...prevState,
                lastName: true,
            }));
        }
        if (
            payload.email !== "" &&
            payload.password !== "" &&
            payload.firstName !== "" &&
            payload.lastName !== ""
        ) {
            setIsSnipper(true);
            const response = await apiRegister(payload);
            if ((response as any).data.success) {
                setIsSnipper(false);
                resetPayload();
                Swal.fire(
                    "Congratulations!",
                    (response as any).data.message,
                    "success"
                );
            } else {
                Swal.fire("Oops!", (response as any).data.message, "error");
            }
        }
    };
    return (
        <div>
            <div>
                {isSnipper ? <Snipper /> : null}
                <form onSubmit={handleSubmit}>
                    <div className="mt-2 flex flex-col gap-4 bg-white">
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
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
                        <div className="mb-2">
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
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                First Name
                            </label>
                            <InputField
                                value={payload.firstName}
                                setValue={setPayload}
                                keywords="firstName"
                            />
                            <Required
                                value={payload.firstName}
                                valid={checkValid.firstName}
                                keywords="firstName"
                                setShow={setCheckValid}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Last Name
                            </label>
                            <InputField
                                value={payload.lastName}
                                setValue={setPayload}
                                keywords="lastName"
                            />
                            <Required
                                value={payload.lastName}
                                valid={checkValid.lastName}
                                keywords="lastName"
                                setShow={setCheckValid}
                            />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded w-[100px] m-auto">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
