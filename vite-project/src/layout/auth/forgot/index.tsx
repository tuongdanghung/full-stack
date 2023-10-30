import React, { useState } from "react";

import { apiResetToken } from "../../../apis";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../customer-site/utils/path";
import { InputField } from "../../customer-site/components";

const Forgot = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        token: params.token,
        password: "",
    });
    const handleSubmit = async () => {
        const response = await apiResetToken(payload);
        if (response.status === 200) {
            Swal.fire(
                "Congratulations!",
                (response as any).message,
                "success"
            ).then(() => {
                navigate(`/${path.LOGIN}`);
            });
        } else Swal.fire("Oops!", (response as any).message, "error");
    };

    return (
        <div className="grid grid-cols-6 gap-5">
            <div className="col-start-3 col-span-2">
                <div className="mt-8 flex flex-col gap-6">
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
