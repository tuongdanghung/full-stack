import React, { useState } from "react";

type Props = {
    handleData: (title: string) => void;
};

const Ram = (props: Props) => {
    const [title, setTitle] = useState<string>("");
    const handleChange = (value: string) => {
        setTitle(value);
        props.handleData(value);
    };
    return (
        <div>
            <label className="block">Title</label>
            <input
                className="border border-collapse rounded-lg w-full"
                type="text"
                value={title}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default Ram;
