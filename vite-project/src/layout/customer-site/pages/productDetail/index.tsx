import { useEffect, useState } from "react";
import {
    GetProductDetail,
    GetOneUser,
    GetOneOrder,
    GetAllCart,
} from "../../../../store/actions";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { apiCreateCart, apiUpdateCart } from "../../../../apis";
import { ToastContainer, toast } from "react-toastify";
import Favorite from "./favorite";
const ProductDetail = () => {
    const params = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState(1);
    const detail = useSelector((state: any) => state?.productReducer.detail);
    const oneUser = useSelector((state: any) => state?.userReducer.oneUser);
    const cart = useSelector((state: any) => state?.userReducer.carts);
    const [capacity, setCapacity] = useState([]);
    const token = localStorage.getItem("auth");
    const [activeCapacity, setActiveCapacity] = useState(0);
    const [activeColor, setActiveColor] = useState(0);

    const handleButtonCapacity = (index: any) => {
        setActiveCapacity(index);
        setCapacity(detail?.capacities[index]);
    };
    const handleButtonColor = (index: any) => {
        setActiveColor(index);
    };

    const dataCapacity =
        capacity && !Array.isArray(capacity)
            ? capacity
            : detail.capacities !== undefined && detail?.capacities[0];
    useEffect(() => {
        setCapacity(detail?.capacities);
        dispatch(GetProductDetail(params.id));
        dispatch(GetOneUser(token));
        dispatch(GetOneOrder(token));
        dispatch(GetAllCart(null));
    }, []);

    const handleAddToCart = async () => {
        const colorId = detail.colors[activeColor].id;
        const capacityId = detail.capacities[activeCapacity].id;
        const result = cart?.find((item: any) => {
            return (
                item.colorId === colorId &&
                item.productId === detail.id &&
                item.capacityId === capacityId
            );
        });

        if (!result) {
            const data = {
                productId: detail.id,
                quantity,
                colorId,
                capacityId,
            };
            const response = await apiCreateCart(data);
            if (response.data.success) {
                toast.success("Add to cart successfully");
                dispatch(GetOneUser(token));
                dispatch(GetAllCart(null));
            } else {
                toast.error("Add to cart failed");
            }
        } else {
            const data = {
                quantity: result.quantity + quantity,
            };
            const response = await apiUpdateCart(result.id, data);
            if (response.data.success) {
                toast.success("update cart successfully");
                dispatch(GetOneUser(token));
                dispatch(GetAllCart(null));
            } else {
                toast.error("update cart failed");
            }
        }
    };
    const formattedNumber = (
        detail?.price * dataCapacity?.percent
    ).toLocaleString();

    return (
        <div>
            <div className="p-4 border border-collapse rounded m-0">
                <div className="grid grid-cols-3 gap-5">
                    <div className="col">
                        <img
                            style={{ width: "100%", maxHeight: "72%" }}
                            src={
                                detail?.images !== undefined &&
                                detail?.images[0].src
                            }
                            alt=""
                        />
                        <ul className="grid grid-cols-3 gap-5 mt-3">
                            {detail?.images?.map((item: any) => {
                                return (
                                    <li key={item.id}>
                                        <img src={item.src} alt="" />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="col">
                        <h1 className="text-4xl font-bold mb-4">
                            Title: {detail.title}{" "}
                        </h1>
                        <Favorite
                            productId={detail.id}
                            capacityId={
                                detail?.capacities !== undefined &&
                                detail?.capacities[0]?.id
                            }
                            colorId={
                                detail?.colors !== undefined &&
                                detail?.colors[0]?.id
                            }
                        />
                        <h1 className="text-xl font-bold mb-4">
                            Price: {formattedNumber} ${" "}
                        </h1>

                        <p>Technology: {detail?.brand?.title}</p>
                        <div className="mt-4 flex">
                            <span className="w-[100px] block">Capacity</span>
                            {detail?.capacities?.map(
                                (item: any, index: any) => {
                                    return (
                                        <button
                                            key={index}
                                            className={`border border-collapse py-1 px-3 ml-2 rounded ${
                                                activeCapacity === index
                                                    ? "bg-gray-900 text-white"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleButtonCapacity(index)
                                            }
                                        >
                                            {item.size} GB
                                        </button>
                                    );
                                }
                            )}
                        </div>
                        <div className="mt-2 flex">
                            <span className="w-[100px] block">Color</span>
                            {detail?.colors?.map((item: any, index: number) => {
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleButtonColor(index)}
                                        className={`border border-collapse py-1 px-3 ml-2 rounded ${
                                            activeColor === index
                                                ? "bg-gray-900 text-white"
                                                : ""
                                        }`}
                                    >
                                        {item.color}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-2 flex">
                            <span className="w-[100px] block">Quantity</span>
                            <p className="ml-2">{detail.stock} pcs</p>
                        </div>
                        {token !== null ? (
                            <div>
                                {detail.stock > 0 ? (
                                    <div>
                                        <div className="mt-2 flex">
                                            <span className="w-[100px] block">
                                                Enter
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setQuantity(
                                                        quantity - 1 <= 0
                                                            ? 1
                                                            : quantity - 1
                                                    )
                                                }
                                                className="border h-[30px] border-collapse py-1 px-3 ml-2"
                                            >
                                                -
                                            </button>
                                            <input
                                                className="w-[150px] h-[30px] ml-2"
                                                type="number"
                                                value={quantity ? quantity : 1}
                                                onChange={(e) =>
                                                    setQuantity(
                                                        Number(e.target.value) >
                                                            detail.stock
                                                            ? detail.stock
                                                            : Number(
                                                                  e.target.value
                                                              )
                                                    )
                                                }
                                            />
                                            <button
                                                onClick={() =>
                                                    setQuantity(
                                                        quantity + 1 >
                                                            detail.stock
                                                            ? detail.stock
                                                            : quantity + 1
                                                    )
                                                }
                                                className="border h-[30px] border-collapse py-1 px-3 ml-2"
                                            >
                                                +
                                            </button>
                                        </div>
                                        {oneUser?.status === "false" ? (
                                            <i className="text-red-500">
                                                Your account is so bad that you
                                                can't buy the product
                                            </i>
                                        ) : (
                                            <button
                                                onClick={handleAddToCart}
                                                className=" bg-red-500 hover:bg-red-600 text-white border border-collapse mt-6 px-3 py-2 w-full"
                                            >
                                                Add to cart
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-red-500">out of stock</p>
                                )}
                            </div>
                        ) : (
                            <p className="mt-4">
                                Please log in{" "}
                                <Link
                                    className="text-red-500 hover:text-light-blue-900"
                                    to={"/login"}
                                >
                                    here
                                </Link>{" "}
                                to purchase
                            </p>
                        )}
                    </div>
                    <div className="col">3</div>
                </div>
                <div className="mt-6">
                    <h1 className="text-3xl font-bold mb-4">Description</h1>
                    <p>{detail.description}</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductDetail;
