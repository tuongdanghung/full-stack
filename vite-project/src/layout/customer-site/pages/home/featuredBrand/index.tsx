import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import path from "../../../utils/path";
import { Link } from "react-router-dom";
const FeaturedBrand = (props: any) => {
    const [filterData, setFilterdata] = useState<any>([]);
    useEffect(() => {
        setFilterdata(
            props.data?.filter((data: any) => data.brand === "Samsung")
        );
    }, [props]);
    return (
        <div className="mt-6 customer-care p-6 bg-white border border-collapse rounded-md">
            <div className="flex">
                <h1>
                    Featured Brand :{" "}
                    <span className="text-red-700 font-bold">SAMSUNG</span>
                </h1>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {filterData?.map((item: any, index: any) => {
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
                                    <img
                                        src={
                                            "https://salt.tikicdn.com/cache/280x280/ts/product/ca/0d/b0/e183f5f1d1e66d8c402b50b476e4a486.jpg.webp"
                                        }
                                        alt=""
                                    />
                                </Typography>
                                <Typography className="m-auto">
                                    <span className="text-2xl font-bold">
                                        {item.title}
                                    </span>{" "}
                                    <br />
                                    <span> {item.price}</span>
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0 m-auto">
                                <Link
                                    className="border border-separate py-2 px-4 rounded-lg hover:text-white hover:bg-blue-gray-900"
                                    to={`/${path.PRODUCTS}/${item.category}/${item._id}`}
                                >
                                    Read More
                                </Link>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedBrand;
