import React, { useState } from "react";

type Props = {
    handleBrand: (title: string) => void;
};

const Brand: React.FC<Props> = (props: any) => {
    const [title, setTitle] = useState<string>("");
    const handleChange = (value: string) => {
        setTitle(value);
        props.handleBrand(value);
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
export default Brand;
