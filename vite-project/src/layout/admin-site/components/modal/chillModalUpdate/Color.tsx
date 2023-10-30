import React, { useEffect, useState } from "react";
import { GetColor } from "../../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
type Props = {
    id: string;
    handleChange: (title: string) => void;
};

const Category: React.FC<Props> = (props) => {
    const [id, setId] = useState<string>(props.id);
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState<any>({ color: "" });

    const handleChange = (value: string) => {
        setTitle(value);
        props.handleChange(value);
    };
    const color = useSelector((state: any) => state?.productReducer.color);
    useEffect(() => {
        dispatch(GetColor(null));
        setId(props.id);
        setTitle(color.find((item: any) => item._id === id));
    }, [props.id]);
    return (
        <div>
            <label className="block">Title</label>
            <input
                className="border border-collapse rounded-lg w-full"
                type="text"
                value={title.color}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};
export default Category;
