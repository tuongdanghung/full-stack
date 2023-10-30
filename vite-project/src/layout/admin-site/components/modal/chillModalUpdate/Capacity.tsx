import React, { useEffect, useState } from "react";
import { GetCapacity } from "../../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
type Props = {
    id: string;
    handleChange: (title: string) => void;
};

const Capacity: React.FC<Props> = (props) => {
    const [id, setId] = useState<string>(props.id);
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState<any>({
        title: 0,
        percent: 0,
    });

    const capacity = useSelector(
        (state: any) => state?.productReducer.capacity
    );
    useEffect(() => {
        dispatch(GetCapacity(null));
        setId(props.id);
        setTitle(capacity.find((item: any) => item._id === id));
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
