import { useEffect, useState } from "react";
import Carousels from "./Carousel";
import "./index.scss";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoMdCloudDone } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import { FcAssistant } from "react-icons/fc";
import Panel from "./tab/TabPanel";
import Banner from "./banner/index";
import Timer from "./timer/index";
import FeaturedBrand from "./featuredBrand";
import { GetAllProduct } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";

function ParentComponent() {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: any) => state?.productReducer?.products);
    useEffect(() => {
        dispatch(GetAllProduct(null));
    }, []);
    return (
        <div>
            <div className="flex flex-row gap-7">
                <div className="left-content basis-3/5">
                    <Carousels />
                </div>
                <div className="left-content basis-2/5">
                    <img
                        src="https://cf.shopee.vn/file/vn-50009109-5a4aed0e9a4ef43f3eaee2561763e9f8_xhdpi"
                        alt=""
                        className="mb-2"
                    />
                    <img
                        src="https://cf.shopee.vn/file/vn-50009109-9e898dbd5125e869f3c64bb2f4574a12_xhdpi"
                        alt=""
                        className="mb-2"
                    />
                    <img
                        src="https://cf.shopee.vn/file/vn-50009109-e8bee97d5fb118c56292f6e8bedcca44_xhdpi"
                        alt=""
                    />
                </div>
            </div>
            <div className="mt-6 customer-care flex justify-between p-4 bg-white border border-collapse rounded-md">
                <div className="flex">
                    <p className="flex items-center">
                        <IoMdCloudDone />
                        <span className="ml-2">100% genuine product</span>
                    </p>
                    <p className="flex items-center mx-5">
                        <FcAssistant />
                        <span className="ml-2">Personal assistant</span>
                    </p>
                    <p className="flex items-center">
                        <LiaShippingFastSolid />
                        <span className="ml-2">Fast & on time delivery</span>
                    </p>
                </div>
                <div className="flex items-center">
                    <span className="mr-3">Shop with peace of mind</span>
                    <GrNext />
                </div>
            </div>
            <Panel data={data} />
            <Banner />
            {/* <Timer data={data} /> */}
            <FeaturedBrand data={data} />
        </div>
    );
}

export default ParentComponent;
