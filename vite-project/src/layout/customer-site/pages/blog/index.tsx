import { Link, useParams } from "react-router-dom";
import FilterProduct from "./FillterBy";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { GetAllBlog } from "../../../../store/actions";
import Pagination from "../../components/pagination";
import path from "../../utils/path";
import { AppDispatch } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const BLog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [newData, setNewData] = useState([]);
    const data = useSelector((state: any) => state?.blogReducer?.blogs);
    const [blog, setBlogs] = useState([]);
    useEffect(() => {
        dispatch(GetAllBlog(null));
    }, []);
    useEffect(() => {
        setBlogs(data);
    }, [data]);

    const handlePage = (dataPagination: any) => {
        setNewData(dataPagination);
    };
    return (
        <div>
            <FilterProduct />
            <div className="p-4 border border-collapse rounded-md m-0 mt-6">
                <div className="grid grid-cols-4 gap-5">
                    {newData?.map((item: any, index: any) => {
                        return (
                            <Card
                                key={index}
                                className="mt-6 border border-collapse"
                            >
                                <CardBody>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="mb-2"
                                    >
                                        {/* <img src={item.image[0].image} alt="" /> */}
                                    </Typography>
                                    <Typography className="m-auto">
                                        <span className="text-2xl font-bold">
                                            {item.title}
                                        </span>{" "}
                                        <br />
                                        <span>Price: {item.price}$</span>
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Link
                                        className="border border-separate py-2 px-4 rounded-lg hover:text-white hover:bg-blue-gray-900"
                                        to={`/${path.BLOG}/${item._id}`}
                                    >
                                        Read More
                                    </Link>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
                <div className="mt-5 flex items-center">
                    <Pagination handlePage={handlePage} data={blog} />
                </div>
            </div>
        </div>
    );
};

export default BLog;
