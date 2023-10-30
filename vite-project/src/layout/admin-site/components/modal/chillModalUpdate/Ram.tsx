import React, { useEffect, useState } from "react";
import { GetRam } from "../../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
type Props = {
    id: string;
    handleChange: (title: string) => void;
};

const Ram: React.FC<Props> = (props) => {
    const [id, setId] = useState<string>(props.id);
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState<any>({ size: "" });

    const handleChange = (value: string) => {
        setTitle(value);
        props.handleChange(value);
    };
    const ram = useSelector((state: any) => state?.productReducer.ram);
    const token = localStorage.getItem("auth");
    useEffect(() => {
        dispatch(GetRam(null));
        setId(props.id);
        setTitle(ram.find((item: any) => item._id === id));
    }, [props.id]);
    return (
        <div>
            <label className="block">Title</label>
            <input
                className="border border-collapse rounded-lg w-full"
                type="number"
                value={title.size}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};
export default Ram;
