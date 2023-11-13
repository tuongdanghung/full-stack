import { useState } from "react";

import { apiResetToken } from "../../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../customer-site/utils/path";
import { InputField } from "../../customer-site/components";

const Forgot = () => {
    const [payload, setPayload] = useState({
        email: "",
        password: "",
        checkPassword: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (payload.password !== payload.checkPassword) {
            return setMessage("password and checkpassword do not match");
        }
        if (payload.password === payload.checkPassword) {
            const response = await apiResetToken(payload);
            if (response.data.success) {
                Swal.fire(
                    "Congratulations!",
                    (response as any).data.message,
                    "success"
                ).then(() => {
                    navigate(`/${path.LOGIN}`);
                });
                setPayload({
                    email: "",
                    password: "",
                    checkPassword: "",
                });
                setMessage("");
            } else Swal.fire("Oops!", (response as any).data.message, "error");
        }
    };
    return (
        <div>
            <div className="col-start-3 col-span-2">
                <div className="mt-8 flex flex-col gap-6">
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-1">
                            Email
                        </label>
                        <InputField
                            value={payload.email}
                            setValue={setPayload}
                            keywords="email"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-1">
                            New password
                        </label>
                        <InputField
                            value={payload.password}
                            setValue={setPayload}
                            keywords="password"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-1">
                            Enter a new password
                        </label>
                        <InputField
                            value={payload.checkPassword}
                            setValue={setPayload}
                            keywords="checkPassword"
                        />
                    </div>
                    <i className="text-red-500">{message}</i>
                    <button
                        onClick={() => handleSubmit()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Forgot password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Forgot;
