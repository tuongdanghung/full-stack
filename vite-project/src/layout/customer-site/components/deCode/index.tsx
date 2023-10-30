import React, { useState } from "react";
import InputField from "../InputField";
const DeCode = () => {
    const [payload, setPayload] = useState({
        email: "",
    });
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 w-[450px]">
                <h4>Enter your code</h4>
                <InputField
                    value={payload.email}
                    setValue={setPayload}
                    keywords="enter your code"
                />
                <button
                    className="bg-blue-500
                       hover:bg-blue-700
                       text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default DeCode;
