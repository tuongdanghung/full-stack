import React, { useState } from "react";
import { apiForgotPassword } from "../../../apis/user";
import Swal from "sweetalert2";
import { InputField } from "../../customer-site/components";
const ResetPassword = () => {
    const [payload, setPayload] = useState({
        email: "",
    });
    const [checkvalid, setCheckvalid] = useState({
        email: false,
    });

    const [validate, setValidate] = useState(false);

    const handleSubmit = async () => {
        if (payload.email === "") {
            setCheckvalid((prevState) => ({
                ...prevState,
                email: true,
            }));
            setValidate(true);
        }
        if (validate === false) {
            const response = await apiForgotPassword(payload);
            if (response.status === 200) {
                Swal.fire(
                    "Congratulations!",
                    (response as any).message,
                    "success"
                ).then(() => {
                    setPayload({
                        email: "",
                    });
                    window.location.replace("https://mail.google.com");
                });
            } else Swal.fire("Oops!", (response as any).message, "error");
        } else {
            return validate;
        }
    };

    return (
        <div className="mt-8 flex flex-col">
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
                </div>

                <button
                    onClick={() => handleSubmit()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Send mail
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
