import React, { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { BiSearch } from "react-icons/bi";
import { GetAllBlog } from "../../../../store/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
const FilterProduct = () => {
    const [value, setValue] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(GetAllBlog(null));
    }, []);

    const handleSearchTextInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValue(e.target.value);
        dispatch(GetAllBlog({ title: e.target.value }));
    };

    return (
        <div className="p-4 border border-collapse rounded-md m-0 top-7">
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-2">
                    <div>
                        <div className="max-w-md">
                            <TextInput
                                value={value}
                                onChange={handleSearchTextInputChange}
                                placeholder="search product"
                                required
                                rightIcon={BiSearch}
                                type="email"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterProduct;
