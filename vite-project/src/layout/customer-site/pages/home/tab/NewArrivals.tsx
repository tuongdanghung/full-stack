import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "../index.scss";
import "swiper/css";
import path from "../../../utils/path";
import { Link } from "react-router-dom";
const getRandomItems = (items: any[], count: number) => {
    if (items?.length === 0) {
        return [];
    }
    const shuffled: any =
        items !== null && [...items]?.sort(() => 0.5 - Math.random());
    return (
        shuffled !== false && shuffled?.slice(0, Math.min(count, items?.length))
    );
};
const NewArrivals = (props: any) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        setProduct(props.product);
    }, [props]);
    const randomItems = getRandomItems(product, 4);
    return (
        <div className="grid grid-cols-1 gap-5">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    "@0.00": {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    "@0.75": {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    "@1.00": {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    "@1.50": {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {randomItems !== false &&
                    randomItems?.map((item: any, index: any) => {
                        return (
                            <SwiperSlide key={index}>
                                <Card className="mt-6 border border-collapse">
                                    <CardBody>
                                        <Typography
                                            variant="h5"
                                            color="blue-gray"
                                            className="mb-2"
                                        >
                                            <img
                                                src={item.image[0].image}
                                                alt=""
                                            />
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
                                            to={`/${path.PRODUCTS}/${item.category}/${item._id}`}
                                        >
                                            Read More
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
};

export default NewArrivals;
