import React, { useState } from "react";
import { InputField } from "../../customer-site/components";
import Swal from "sweetalert2";
import { apiResetToken } from "./../../../apis/user";
import { useNavigate } from "react-router-dom";
import path from "../../customer-site/utils/path";

type Props = {};

const ResetPassword = (props: Props) => {
    const navigate = useNavigate();

    const [payload, setPayload] = useState({
        card_id: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        const response = await apiResetToken(payload);
        if (response.data.success) {
            Swal.fire(
                "Congratulations!",
                (response as any).data.message,
                "success"
            ).then(() => {
                navigate(`${`/${path.LOGIN}`}`);
            });
            setPayload({
                card_id: "",
                password: "",
            });
            setMessage("");
        } else Swal.fire("Oops!", (response as any).data.message, "error");
    };
    return (
        <div className="w-[300px] m-auto pt-9">
            <h1 className="text-2xl mt-9 text-center mb-3">Reset password</h1>
            <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                    Code
                </label>
                <InputField
                    value={payload.card_id}
                    setValue={setPayload}
                    keywords="card_id"
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                    Password
                </label>
                <InputField
                    value={payload.password}
                    setValue={setPayload}
                    keywords="password"
                />
            </div>
            <i className="text-red-500">{message}</i>
            <button
                onClick={() => handleSubmit()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Reset
            </button>
        </div>
    );
};

export default ResetPassword;
