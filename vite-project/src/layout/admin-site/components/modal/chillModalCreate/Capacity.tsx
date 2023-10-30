import React, { useEffect, useState } from "react";

type Props = {
    handleData: (title: string) => void;
};

const Capacity = (props: Props) => {
    const [title, setTitle] = useState<any>({
        size: "",
        percent: "",
    });
    const handleChange = (name: any, value: any) => {
        setTitle((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(() => {
        props.handleData(title);
    }, [title]);
    return (
        <div>
            <div>
                <label className="block">Title</label>
                <input
                    className="border border-collapse rounded-lg w-full"
                    type="number"
                    value={title.size}
                    onChange={(e) => handleChange("size", e.target.value)}
                />
            </div>
            <div>
                <label className="block">Percent</label>
                <input
                    className="border border-collapse rounded-lg w-full"
                    type="number"
                    value={title.percent}
                    onChange={(e) => handleChange("percent", e.target.value)}
                />
            </div>
        </div>
    );
};

export default Capacity;
