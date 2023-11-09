import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { Search } from "../../../../interface/client";
import {
    GetAllProduct,
    GetAllUsersByAdmin,
    GetBrand,
    GetCategory,
    GetCapacity,
    GetColor,
} from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";

const SearchComponent: React.FC<Search> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = useState("");
    useEffect(() => {
        switch (props.slug) {
            case "manager-product":
                dispatch(GetAllProduct({ title: value }));
                break;
            case "manager-user":
                dispatch(GetAllUsersByAdmin(value));
                break;
            case "manager-brand":
                dispatch(GetBrand({ title: value }));
                break;
            case "manager-category":
                dispatch(GetCategory({ title: value }));
                break;
            case "manager-color":
                dispatch(GetColor({ color: value }));
                break;
            case "manager-capacity":
                dispatch(GetCapacity({ size: value }));
                break;
            default:
                break;
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="w-full md:w-72">
            <Input
                label="Search"
                value={value}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                crossOrigin={undefined}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchComponent;
