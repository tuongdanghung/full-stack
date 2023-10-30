import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { GetCategory } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
const Brand = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("auth");
    const category = useSelector(
        (state: any) => state?.productReducer.category
    );
    useEffect(() => {
        dispatch(GetCategory(null));
    }, []);
    return (
        <div className="p-4 sticky border border-collapse rounded-md m-0 top-7">
            <h1 className="text-2xl text-center font-semibold mb-5">
                Category
            </h1>
            <ul className="max-w-md list-none list-inside">
                {category.map((item: any) => {
                    return (
                        <li key={item._id} className="mb-4">
                            <Link
                                className="text-gray-900 hover:text-blue-500 flex items-center"
                                to={`/${path.PRODUCTS}/${item.title}`}
                            >
                                <img
                                    src={item.img}
                                    width="50px"
                                    className="mr-3"
                                    alt=""
                                />
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Brand;
