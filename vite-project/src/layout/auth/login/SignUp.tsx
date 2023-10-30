import { useState } from "react";
import { SignUpInterface } from "../../../interface/client";
import { InputField, Required, Snipper } from "../../customer-site/components";
import { apiRegister } from "../../../apis";
import Swal from "sweetalert2";
import Dialog from "../../customer-site/components/dialog";

const SignUp = () => {
    const [payload, setPayload] = useState<SignUpInterface>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        mobile: 0,
    });

    const [checkValid, setCheckValid] = useState({
        email: false,
        password: false,
        firstName: false,
        lastName: false,
        mobile: false,
    });
    const [isShow, setIsShow] = useState(false);
    const [isSnipper, setIsSnipper] = useState(false);
    const resetPayload = () => {
        setPayload({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            mobile: 0,
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
        if (payload.mobile === 0) {
            setCheckValid((prevState) => ({
                ...prevState,
                mobile: true,
            }));
        }
        if (
            payload.email !== "" &&
            payload.password !== "" &&
            payload.firstName !== "" &&
            payload.lastName !== "" &&
            payload.mobile !== 0
        ) {
            setIsSnipper(true);
            const response = await apiRegister(payload);
            if ((response as any).data.success) {
                setIsShow(true);
                setIsSnipper(false);
                resetPayload();
            } else {
                Swal.fire("Oops!", (response as any).data.message, "error");
                setIsSnipper(false);
            }
        }
    };

    const setCheckShow = (result: boolean) => {
        setIsShow(result);
    };
    return (
        <div>
            <div>
                {isSnipper ? <Snipper /> : null}
                {isShow && (
                    <Dialog isShow={isShow} setCheckShow={setCheckShow} />
                )}
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
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <InputField
                                value={payload.mobile}
                                setValue={setPayload}
                                keywords="mobile"
                            />
                            <Required
                                value={payload.mobile}
                                valid={checkValid.mobile}
                                keywords="mobile"
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
