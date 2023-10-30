import React, { useEffect, useState } from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { BiSolidDiscount } from "react-icons/bi";
import { MdFiberNew, MdFeaturedPlayList } from "react-icons/md";
import Seller from "./Seller";
import NewArrivals from "./NewArrivals";
import FeaturedProducts from "./FeaturedProducts";
interface Product {
    id?: number;
    title?: string;
    price?: number;
    image?: string;
    data?: any;
}
const Panel: React.FC<Product> = (props) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        setProduct(props.data);
    }, [props]);
    const data = [
        {
            label: "BEST SELLER",
            value: "bestSeller",
            icon: BiSolidDiscount,
            desc: <Seller product={product} />,
        },
        {
            label: "NEW ARRIVALS",
            value: "newArrivals",
            icon: MdFiberNew,
            desc: <NewArrivals product={product} />,
        },
        {
            label: "FEATURED PRODUCTS",
            value: "featuredProducts",
            icon: MdFeaturedPlayList,
            desc: <FeaturedProducts product={product} />,
        },
    ];
    return (
        <Tabs
            value="bestSeller"
            className="mt-6 border border-collapse p-6 rounded-md "
        >
            <TabsHeader>
                {data.map(({ label, value, icon }, index) => (
                    <Tab key={index} value={value}>
                        <div className="flex items-center gap-2">
                            {React.createElement(icon, {
                                className: "w-5 h-5",
                            })}
                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, desc }, index) => (
                    <TabPanel key={index} value={value} className="p-0">
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
};

export default Panel;
