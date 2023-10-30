import React, { useEffect, useState } from "react";
import { GetAllBlog } from "../../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
type Props = {
    id: string;
    handleChange: (title: string) => void;
};

const Blog: React.FC<Props> = (props) => {
    const [id, setId] = useState<string>(props.id);
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState<any>({
        title: "",
        description: "",
    });
    const blog = useSelector((state: any) => state?.blogReducer.blogs);
    useEffect(() => {
        dispatch(GetAllBlog(null));
        setId(props.id);
        setTitle(blog.find((item: any) => item._id === id));
    }, [props.id]);
    useEffect(() => {
        props.handleChange(title);
    }, [title]);
    const handleChange = (name: any, value: any) => {
        setTitle((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
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
                <label className="block">Title</label>
                <textarea
                    className="border border-collapse rounded-lg w-full h-[500px]"
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
