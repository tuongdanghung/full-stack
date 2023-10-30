import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { GetOneUser } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
import { apiDeleteCart, apiCreateOrder } from "../../../../apis";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import MapComponent from "../../components/map";
import Distance from "../../components/distance";
const TABLE_HEAD = ["Title", "Image", "Quantity", "Total", ""];

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState<any>(0);
    const [shipping, setShipping] = useState(0);
    const [address, setAddress] = useState("");
    const [isCheck, setIsCheck] = useState(false);
    const token = localStorage.getItem("auth");
    const cart = useSelector((state: any) => state?.userReducer?.oneUser?.cart);
    const data = quantity !== 0 ? quantity : cart;
    useEffect(() => {
        dispatch(GetOneUser(token));
    }, [quantity]);
    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        productId: string
    ) => {
        const updatedProducts = cart.map((product: any) => {
            const newQuantity =
                parseInt(event.target.value, 10) < product.product.quantity
                    ? parseInt(event.target.value, 10)
                    : product.product.quantity;
            if (product._id === productId) {
                // Cập nhật giá trị quantity cho sản phẩm tương ứng
                return {
                    ...product,
                    quantity: newQuantity,
                };
            }
            return product;
        });
        setQuantity(updatedProducts);
    };
    const handleDelete = async (id: string) => {
        const response = await apiDeleteCart({ id, token });
        if (response.data.success) {
            toast.success("Delete item cart successfully");
            dispatch(GetOneUser(token));
        } else {
            toast.error("Delete item cart failed");
        }
    };
    const handleCheckout = async () => {
        if (address !== "") {
            setIsCheck(false);
            const response = await apiCreateOrder({
                token,
                shipping: shipping * 0.5,
                address,
            });
            if (response.data.success) {
                Swal.fire(
                    "Congratulations!",
                    "Checkout successfully",
                    "success"
                );
                dispatch(GetOneUser(token));
            } else {
                Swal.fire("Oops!", "Checkout fail", "error");
            }
        } else {
            setIsCheck(true);
        }
    };
    const dataMap = (data: any) => {
        setAddress(data);
    };
    const distance = (data: any) => {
        setShipping(data);
    };
    const handleDecrease = (productId: string) => {
        if (quantity !== 0) {
            const updatedProducts = quantity.map((product: any) => {
                const newQuantity =
                    product.quantity > 1 ? product.quantity - 1 : 1;
                if (product._id === productId) {
                    // Cập nhật giá trị quantity cho sản phẩm tương ứng
                    return {
                        ...product,
                        quantity: newQuantity,
                    };
                }
                return product;
            });
            setQuantity(updatedProducts);
        } else {
            const updatedProducts = cart.map((product: any) => {
                const newQuantity =
                    product.quantity > 1 ? product.quantity - 1 : 1;
                if (product._id === productId) {
                    console.log(product.quantity);
                    // Cập nhật giá trị quantity cho sản phẩm tương ứng
                    return {
                        ...product,
                        quantity: newQuantity,
                    };
                }
                return product;
            });
            setQuantity(updatedProducts);
        }
    };
    const handleIncrease = (productId: string) => {
        if (quantity !== 0) {
            const updatedProducts = quantity.map((product: any) => {
                const newQuantity =
                    product.quantity < product.product.quantity
                        ? product.quantity + 1
                        : product.product.quantity;
                // ;
                if (product._id === productId) {
                    // Cập nhật giá trị quantity cho sản phẩm tương ứng
                    return {
                        ...product,
                        quantity: newQuantity,
                    };
                }
                return product;
            });
            setQuantity(updatedProducts);
        } else {
            const updatedProducts = cart.map((product: any) => {
                const newQuantity =
                    product.quantity < product.product.quantity
                        ? product.quantity + 1
                        : product.product.quantity;
                if (product._id === productId) {
                    console.log(product.quantity);
                    // Cập nhật giá trị quantity cho sản phẩm tương ứng
                    return {
                        ...product,
                        quantity: newQuantity,
                    };
                }
                return product;
            });
            setQuantity(updatedProducts);
        }
    };
    return (
        <div>
            {data?.length > 0 ? (
                <div>
                    <Card className="w-full text-center">
                        <div className="flex">
                            <div className="flex-none border border-separate gap-4 w-[60%] p-5">
                                <h2 className="font-semibold text-xl py-4">
                                    Cart
                                </h2>
                                <table className="w-full table-auto text-center">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((item: any, index: any) => {
                                            const formattedTotal =
                                                item.totalPrice.toLocaleString();
                                            const isLast =
                                                index === cart.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";
                                            return (
                                                <tr
                                                    key={item._id}
                                                    className="m-auto"
                                                >
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {item.product.title}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            <img
                                                                className="m-auto"
                                                                width={80}
                                                                src={`${item.product.image[0]?.image}`}
                                                                alt=""
                                                            />
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="flex justify-center">
                                                            <Button
                                                                onClick={() =>
                                                                    handleDecrease(
                                                                        item._id
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </Button>
                                                            <input
                                                                className="w-[100px] rounded-md mx-3"
                                                                type="number"
                                                                value={
                                                                    item.quantity
                                                                }
                                                                onChange={(e) =>
                                                                    handleQuantityChange(
                                                                        e,
                                                                        item._id
                                                                    )
                                                                }
                                                            />
                                                            <Button
                                                                onClick={() =>
                                                                    handleIncrease(
                                                                        item._id
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            as="a"
                                                            href="#"
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-medium"
                                                        >
                                                            {formattedTotal} $
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            as="a"
                                                            href="#"
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-medium"
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item._id
                                                                    )
                                                                }
                                                                className="bg-[#ea4335] hover:bg-[#a03329] text-xs"
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="grow border border-separate gap-4 p-5 ml-5">
                                <MapComponent dataMap={dataMap} />
                                {isCheck === true && (
                                    <i className="mt-4 text-red-500">
                                        You have not selected a delivery address
                                    </i>
                                )}
                            </div>
                        </div>
                    </Card>
                    <div className="mt-6 flex flex-col items-end">
                        <p className="text-2xl font-bold">
                            Total:{" "}
                            <span>
                                {data
                                    ?.reduce(
                                        (total: any, item: any) =>
                                            total +
                                            item.product.price *
                                                item.capacity.percent *
                                                item.quantity,
                                        0
                                    )
                                    .toLocaleString()}{" "}
                                $
                            </span>
                        </p>
                        <Distance address={address} distance={distance} />
                        <p className="text-2xl font-bold">
                            Total:{" "}
                            <span>
                                {data
                                    ?.reduce(
                                        (total: any, item: any) =>
                                            total +
                                            item.product.price *
                                                item.capacity.percent *
                                                item.quantity +
                                            shipping * 0.5,
                                        0
                                    )
                                    .toLocaleString()}{" "}
                                $
                            </span>
                        </p>
                        <Button
                            onClick={handleCheckout}
                            className="mt-4 border border-separate rounded-lg px-4 py-3 hover:text-white hover:bg-gray-900"
                        >
                            Checkout
                        </Button>
                    </div>
                    <ToastContainer />
                </div>
            ) : (
                <p className="text-center">
                    <img
                        width={"100%"}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbflu1tU5bBzFFu5-HqjhX-AbwnC3A31bmQ&usqp=CAU"
                        alt=""
                    />
                    <span>There are no products in the cart</span>
                </p>
            )}
        </div>
    );
};

export default Cart;
