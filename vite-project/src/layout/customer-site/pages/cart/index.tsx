import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import {
    GetAllAddress,
    GetAllCart,
    GetOneUser,
} from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
import { apiDeleteCart, apiCreateOrder } from "../../../../apis";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Distance from "../../components/distance";
import { apiUpdateCart } from "./../../../../apis/user";
import AddressComponent from "../../components/address";
import * as io from "socket.io-client";
import TestPaypal from "./paypal";
import { Link, useNavigate } from "react-router-dom";
import path from "../../utils/path";
const socket = io.connect("http://localhost:5000");
const TABLE_HEAD = [
    "Title",
    "Image",
    "Quantity",
    "Capacity",
    "Color",
    "Total",
    "",
];

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState<any>(0);
    const [shipping, setShipping] = useState(0);
    const [address, setAddress] = useState<any>("");
    const [addressId, setAddressId] = useState("");
    const [isCheck, setIsCheck] = useState(false);
    const [paymentId, setPaymentId] = useState(1);
    const token = localStorage.getItem("auth");
    const cart = useSelector((state: any) => state?.userReducer?.carts);
    const addressArr = useSelector((state: any) => state?.userReducer?.address);
    const data = quantity !== 0 ? quantity : cart;

    useEffect(() => {
        dispatch(GetAllCart(token));
        dispatch(GetAllAddress(token));
    }, [quantity]);

    const handleQuantityChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
        productId: string
    ) => {
        const updatedProducts = cart.map((product: any) => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantity:
                        +event.target.value > product.product.stock
                            ? product.product.stock
                            : +event.target.value,
                };
            }

            return product;
        });

        const req = updatedProducts.find((item: any) => item.id === productId);
        await apiUpdateCart(req.id, { quantity: req.quantity }, token);
        setQuantity(updatedProducts);
    };

    const handleDelete = async (id: string) => {
        const response = await apiDeleteCart(id);
        if (response.data.success) {
            toast.success("Delete item cart successfully");
            dispatch(GetOneUser(token));
            dispatch(GetAllCart(token));
        } else {
            toast.error("Delete item cart failed");
        }
    };

    const handleCheckout = async () => {
        if (address !== "") {
            setIsCheck(false);
            const response = await apiCreateOrder({
                shipping: shipping * 0.5,
                addressId: +addressId,
                paymentId,
            });
            if (response.data.success) {
                Swal.fire(
                    "Congratulations!",
                    "Checkout successfully",
                    "success"
                ).then(() => {
                    navigate(`/${path.HISTORY}`);
                });
                socket.emit("order", "Click!");
                dispatch(GetOneUser(token));
                dispatch(GetAllCart(token));
            } else {
                Swal.fire("Oops!", "Product is out of stock", "error");
            }
        } else {
            setIsCheck(true);
        }
    };

    const distance = (data: any) => {
        setShipping(data);
    };

    const handleDecrease = async (productId: number) => {
        const updatedProducts = data?.map((product: any) => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantity: product.quantity > 1 ? product.quantity - 1 : 1,
                };
            }
            return product;
        });

        const req = updatedProducts.find((item: any) => item.id === productId);
        await apiUpdateCart(req.id, { quantity: req.quantity }, token);
        setQuantity(updatedProducts);
    };

    const handleIncrease = async (productId: string) => {
        const updatedProducts = data?.map((product: any) => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantity:
                        product.quantity > product.product.stock - 1
                            ? product.product.stock
                            : product.quantity + 1,
                };
            }
            return product;
        });

        const req = updatedProducts.find((item: any) => item.id === productId);

        await apiUpdateCart(req.id, { quantity: req.quantity }, token);
        setQuantity(updatedProducts);
    };

    const handleAddressId = (address: any) => {
        setAddressId(address);
    };

    const findAddress = (address: any) => {
        const item = addressArr.find((a: any) => a.id === +address);
        setAddress({
            province: item.province,
            district: item.district,
            ward: item.ward,
        });
    };

    const total = data?.reduce(
        (total: any, item: any) =>
            total +
            item.product.price * item.capacity.percent * item.quantity +
            shipping * 0.5,
        0
    );

    const dataPaypal = {
        shipping: shipping * 0.5,
        addressId: +addressId,
        paymentId,
    };

    const handleCheckoutPaypal = (status: any) => {
        if (status === true) {
            Swal.fire(
                "Congratulations!",
                "Checkout successfully",
                "success"
            ).then(() => {
                navigate(`/${path.HISTORY}`);
            });
            socket.emit("order", "Click!");
            dispatch(GetOneUser(token));
            dispatch(GetAllCart(token));
        } else {
            Swal.fire("Oops!", "Product is out of stock", "error");
        }
    };

    const subTotal = data?.reduce(
        (total: any, item: any) =>
            total + item.product.price * item.capacity.percent * item.quantity,
        0
    );

    return (
        <div>
            {data?.length > 0 ? (
                <div>
                    <Card className="w-full text-center">
                        <div className="p-5">
                            <div className="flex-none border border-separate gap-4 w-full p-5">
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
                                            const total = (
                                                item.product.price *
                                                item.capacity.percent *
                                                item.quantity
                                            ).toLocaleString("en-US");

                                            const isLast =
                                                index === cart.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";
                                            return (
                                                <tr
                                                    key={item.id}
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
                                                                src={`${item.product.images[0]?.src}`}
                                                                alt=""
                                                            />
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="flex justify-center">
                                                            <Button
                                                                onClick={() =>
                                                                    handleDecrease(
                                                                        item.id
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
                                                                        item.id
                                                                    )
                                                                }
                                                            />
                                                            <Button
                                                                onClick={() =>
                                                                    handleIncrease(
                                                                        item.id
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
                                                            {item.capacity.size}
                                                            GB
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
                                                            {item.color.color}
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
                                                            {total} $
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
                                                                        item.id
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
                            <div className="grid grid-cols-2 gap-5">
                                <div className="grow border border-separate gap-4 p-5 mt-5">
                                    {addressArr?.length > 0 ? (
                                        <AddressComponent
                                            handleAddressId={handleAddressId}
                                            findAddress={findAddress}
                                        />
                                    ) : (
                                        <Link to="http://127.0.0.1:3000/profile">
                                            Please add an address to purchase
                                        </Link>
                                    )}

                                    {isCheck === true && (
                                        <i className="mt-4 text-red-500">
                                            You have not selected a delivery
                                            address
                                        </i>
                                    )}
                                </div>
                                <div className="grow border border-separate gap-4 p-5 mt-5">
                                    <div className="mt-6 flex flex-col items-end">
                                        <p className="text-2xl font-bold">
                                            Total:{" "}
                                            <span>
                                                {data
                                                    ?.reduce(
                                                        (
                                                            total: any,
                                                            item: any
                                                        ) =>
                                                            total +
                                                            item.product.price *
                                                                item.capacity
                                                                    .percent *
                                                                item.quantity,
                                                        0
                                                    )
                                                    .toLocaleString()}{" "}
                                                $
                                            </span>
                                        </p>
                                        <Distance
                                            address={address}
                                            distance={distance}
                                        />
                                        <p className="text-2xl font-bold">
                                            Sub Total:{" "}
                                            <span>
                                                {(
                                                    subTotal +
                                                    (shipping * 0.5 > 50
                                                        ? 50
                                                        : shipping * 0.5)
                                                ).toLocaleString()}{" "}
                                                $
                                            </span>
                                        </p>
                                        <div className="flex mt-4">
                                            <div>
                                                <label>
                                                    Payment on delivery
                                                </label>
                                                <input
                                                    className="ml-2"
                                                    value={1}
                                                    onChange={(e) =>
                                                        setPaymentId(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    checked={paymentId === 1}
                                                    type="radio"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <label>Pay with paypal</label>
                                                <input
                                                    className="ml-2"
                                                    value={2}
                                                    onChange={(e) =>
                                                        setPaymentId(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    checked={paymentId === 2}
                                                    type="radio"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            {paymentId === 1 ? (
                                                <Button
                                                    onClick={handleCheckout}
                                                    className="mt-4 border border-separate rounded-lg px-4 py-3 hover:text-white hover:bg-gray-900"
                                                >
                                                    Checkout
                                                </Button>
                                            ) : (
                                                <TestPaypal
                                                    total={total}
                                                    dataPaypal={dataPaypal}
                                                    handleCheckoutPaypal={
                                                        handleCheckoutPaypal
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

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
