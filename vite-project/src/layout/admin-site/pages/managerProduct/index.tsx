import {
    AiFillDelete,
    AiFillEdit,
    AiFillLock,
    AiFillUnlock,
} from "react-icons/ai";
import {
    Card,
    CardHeader,
    Button,
    CardBody,
    CardFooter,
    Chip,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/pagination";
import Head from "../../components/layout/Head";
import {
    GetAllProduct,
    GetBrand,
    GetCategory,
    GetCapacity,
    GetColor,
} from "../../../../store/actions";
import { apiDeleteProduct, apiEditStatusProduct } from "../../../../apis";
import { AppDispatch } from "../../../../store";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ModalEditProduct from "../../components/modal/ModalEditProduct";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const TABLE_HEAD = [
    "Title",
    "Price",
    "Quantity",
    "Category",
    "Brand",
    "Image",
    "Status",
    "",
];
const ManagerProduct = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<any>([]);
    const product = useSelector(
        (state: any) => state?.productReducer?.products
    );
    const item = useSelector((state: any) => state?.productReducer.detail);
    const brand = useSelector((state: any) => state?.productReducer.brand);
    const color = useSelector((state: any) => state?.productReducer.color);
    const capacity = useSelector(
        (state: any) => state?.productReducer.capacity
    );
    const category = useSelector(
        (state: any) => state?.productReducer.category
    );

    useEffect(() => {
        dispatch(GetAllProduct(null));
        dispatch(GetCapacity(null));
        dispatch(GetColor(null));
    }, [item]);

    const handleDelete = async (id: number) => {
        const response = await apiDeleteProduct(id);
        if (response.data.success) {
            dispatch(GetAllProduct(null));
            toast.success("Delete product successfully");
        } else {
            toast.error("Delete product failed");
        }
    };

    const handleOpen = (id: any) => {
        setId(id);
        dispatch(GetBrand(null));
        dispatch(GetCategory(null));
        setOpen(!open);
    };

    const handleClose = (close: boolean) => {
        setOpen(close);
    };

    const handlePage = (pagination: any) => {
        setData(pagination);
    };

    const editStatusProduct = async (id: number) => {
        const itemProduct = product.find((item: any) => item.id === id);
        if (itemProduct) {
            const active = itemProduct.active === 1 ? 2 : 1;
            const response = await apiEditStatusProduct(id, active);
            if ((response as any).data.success) {
                dispatch(GetAllProduct(null));
                toast.success("Updated user successfully");
                socket.emit("blockProduct", "Click!");
            } else {
                toast.error("Updated user failed");
            }
        }
    };

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Head
                    title={"Manager Product"}
                    slug={"manager-product"}
                    data={product}
                />
            </CardHeader>
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-center">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item: any, index: any) => {
                            const isLast = index === product.length - 1;
                            const price: number = item.price;
                            const quantity: number = item?.stock;
                            const formattedPrice: string = price
                                .toLocaleString("en-US")
                                .replace(/,/g, ".");
                            const formattedQuantity: string = quantity
                                .toLocaleString("en-US")
                                .replace(/,/g, ".");
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={item.id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3 justify-center">
                                            {item.title}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        {formattedPrice} $
                                    </td>
                                    <td className={classes}>
                                        {formattedQuantity}
                                    </td>
                                    <td className={classes}>
                                        {item.category.title}
                                    </td>
                                    <td className={classes}>
                                        {item.brand.title}
                                    </td>
                                    <td className={classes}>
                                        <img
                                            style={{
                                                width: "100px",
                                                margin: "auto",
                                            }}
                                            src={item.images[0]?.src}
                                            alt=""
                                        />
                                    </td>
                                    <td className={`${classes}`}>
                                        <Chip
                                            size="sm"
                                            variant="ghost"
                                            value={
                                                item.active === 2
                                                    ? "block"
                                                    : "unblock"
                                            }
                                            color={
                                                item.active === 2
                                                    ? "red"
                                                    : "green"
                                            }
                                        />
                                    </td>
                                    <td className={`${classes}`}>
                                        <Button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="bg-red-500  hover:bg-red-700 text-white font-bold px-6 py-3 rounded text-lg "
                                        >
                                            <AiFillDelete className="h-5 w-6 text-lg text-white" />
                                        </Button>

                                        <Button
                                            onClick={() => handleOpen(item.id)}
                                            className="bg-green-500 mx-2 hover:bg-green-700 text-white font-bold px-6 py-3 rounded text-lg"
                                        >
                                            <AiFillEdit className="h-5 w-6 text-white" />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                editStatusProduct(item.id)
                                            }
                                            className={`${
                                                item.active === 2
                                                    ? "bg-red-500 hover:bg-red-700"
                                                    : "bg-green-500 hover:bg-green-700"
                                            }   text-white font-bold px-6 py-3 rounded text-lg`}
                                        >
                                            {item.active === 2 ? (
                                                <AiFillLock className="h-5 w-6 text-lg text-white" />
                                            ) : (
                                                <AiFillUnlock className="h-5 w-6  text-white" />
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center border-t border-blue-gray-50 p-4 justify-center">
                <Pagination data={product} handlePage={handlePage} />
            </CardFooter>
            <ModalEditProduct
                open={open}
                id={id}
                brand={brand}
                color={color}
                capacity={capacity}
                category={category}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
            <ToastContainer />
        </Card>
    );
};

export default ManagerProduct;
