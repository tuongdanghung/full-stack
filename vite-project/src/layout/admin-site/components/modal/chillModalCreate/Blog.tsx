import React, { useEffect, useState } from "react";

type Props = {
    handleData: (title: string) => void;
};

const Blog: React.FC<Props> = (props: any) => {
    const [title, setTitle] = useState<any>({
        title: "",
        description: "",
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
                    type="text"
                    value={title.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />
            </div>
            <div>
                <label className="block">Description</label>
                <input
                    className="border border-collapse rounded-lg w-full"
                    type="text"
                    value={title.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
            </div>
        </div>
    );
};
export default Blog;
