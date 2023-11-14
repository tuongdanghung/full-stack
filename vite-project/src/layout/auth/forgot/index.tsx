import { useState } from "react";

import { apiForgotPassword } from "../../../apis";
import Swal from "sweetalert2";
import { InputField } from "../../customer-site/components";

const Forgot = () => {
    const [payload, setPayload] = useState({
        email: "",
    });
    const [message, setMessage] = useState("");
    const handleSubmit = async () => {
        const response = await apiForgotPassword(payload);
        if (response.data.success) {
            Swal.fire(
                "Congratulations!",
                (response as any).data.message,
                "success"
            );
            setPayload({
                email: "",
            });
            setMessage("");
        } else Swal.fire("Oops!", (response as any).data.message, "error");
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
