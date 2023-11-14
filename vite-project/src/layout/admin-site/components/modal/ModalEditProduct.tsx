import React, { ChangeEvent, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Modal } from "../../../../interface/client";
import { ToastContainer, toast } from "react-toastify";
import CheckBoxComponent from "../checkbox";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProduct, GetProductDetail } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { apiEditProduct } from "../../../../apis";
import CheckBoxImage from "../checkBoxImage";
const ModalEditProduct: React.FC<Modal> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState<boolean>(false);
    const [item, setItem] = useState<any>(props.id);
    const [itemCheckBox, setItemCheckBox] = useState<any>({});
    const productDetail = useSelector(
        (state: any) => state?.productReducer.detail
    );
    const [payload, setPayload] = useState<any>({
        title: "",
        price: 0,
        stock: 0,
        description: "",
    });
    const [itemSelect, setItemSelect] = useState<any>({});
    const [brand, setBrand] = useState<object[]>(props.brand);
    const [isCheckImage, setIsCheckImage] = useState<boolean>(false);
    const [image, setImage] = useState<boolean>(productDetail.images);
    const [capacity, setCapacity] = useState<object[]>(props.capacity);
    const [category, setCategory] = useState<object[]>(props.category);
    const [color, setColor] = useState<object[]>(props.color);
    const token = localStorage.getItem("auth");
    useEffect(() => {
        setOpen(props.open);
        setItem(props.id);
        setPayload({
            title: productDetail.title,
            price: productDetail.price,
            stock: productDetail.stock,
            description: productDetail.description,
        });
        setItemSelect({
            category: productDetail?.category?.id,
            brand: productDetail?.brand?.id,
        });
        setItemCheckBox({
            color: productDetail.colors,
            capacity: productDetail.capacities,
        });
        setBrand(props.brand);
        setCategory(props.category);
        setCapacity(props.capacity);
        setColor(props.color);
        setImage(productDetail.images);
    }, [props]);
    useEffect(() => {
        dispatch(GetProductDetail(item));
        setImage(productDetail.images);
    }, [item, isCheckImage]);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = event.target;
        if (name === "category") {
            setItemSelect((prevData: any) => ({
                ...prevData,
                category: +value,
            }));
        }
        if (name === "brand") {
            setItemSelect((prevData: any) => ({ ...prevData, brand: +value }));
        }
    };
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPayload({
            ...payload,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdateImage = () => {
        setIsCheckImage(!isCheckImage);
    };
    const handleClose = () => {
        props.handleClose(false);
    };
    const handleEdit = async (id: number) => {
        const data = {
            ...payload,
            categoryId: itemSelect.category,
            brandId: itemSelect.brand,
        };

        const response = await apiEditProduct(id, data, token);
        if (response.data.success) {
            props.handleClose(false);
            dispatch(GetAllProduct(null));
            dispatch(GetProductDetail(item));
            toast.success("Updated product successfully");
        } else {
            toast.error("Updated product failed");
        }
    };
    const renderSelect = () => {
        return Object.keys(itemSelect).map((key: any, index: any) => (
            <div key={index}>
                <label className="block">
                    {key.replace(/^\w/, (c: string) => c.toUpperCase())}
                </label>
                {key === "brand" ? (
                    <select
                        className="border border-collapse rounded-lg w-full"
                        value={itemSelect.brand}
                        name={key}
                        onChange={handleSelectChange}
                    >
                        {brand?.map((brandItem: any) => (
                            <option key={brandItem.id} value={brandItem.id}>
                                {brandItem.title}
                            </option>
                        ))}
                    </select>
                ) : (
                    <select
                        className="border border-collapse rounded-lg w-full"
                        value={itemSelect.category}
                        name={key}
                        onChange={handleSelectChange}
                    >
                        {category?.map((categoryItem: any) => (
                            <option
                                key={categoryItem.id}
                                value={categoryItem.id}
                            >
                                {categoryItem.title}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        ));
    };

    return (
        <div>
            <Dialog
                className="modal-dialog"
                open={open}
                handler={props.handleClose}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Product detail</DialogHeader>
                <DialogBody divider>
                    <div>
                        <label className="block"> Title</label>
                        <input
                            className="border border-collapse rounded-lg w-full"
                            type="text"
                            name="title"
                            value={payload.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block"> Price</label>
                        <input
                            className="border border-collapse rounded-lg w-full"
                            type="text"
                            name="price"
                            value={payload.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block"> Stock</label>
                        <input
                            className="border border-collapse rounded-lg w-full"
                            type="text"
                            name="stock"
                            value={payload.stock}
                            onChange={handleInputChange}
                        />
                    </div>
                    {renderSelect()}
                    <div>
                        <CheckBoxComponent
                            productId={productDetail.id}
                            itemCheckBox={itemCheckBox}
                            color={color}
                            capacity={capacity}
                        />
                    </div>
                    <div className="mt-4 border border-separate rounded-lg p-4">
                        <label className="block">Description</label>
                        <textarea
                            className="border border-separate rounded-lg w-full h-[400px]"
                            value={payload.description}
                            name="description"
                            onChange={handleInputChange}
                        />
                    </div>
                    <CheckBoxImage
                        image={image}
                        id={productDetail.id}
                        handleUpdateImage={handleUpdateImage}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleClose}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => handleEdit(productDetail.id)}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </div>
    );
};

export default ModalEditProduct;
