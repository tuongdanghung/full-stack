import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { CheckValidInterface, ModalCreate } from "../../../../interface/client";
import "./index.scss";
import { ToastContainer, toast } from "react-toastify";
import {
    apiUpdateBrand,
    apiUpdateCategory,
    apiEditColor,
    apiEditCapacity,
    apiEditRam,
    apiUpdateBlog,
} from "../../../../apis";
import Brand from "./chillModalUpdate/Brand";
import Required from "../required";
import {
    GetBrand,
    GetCategory,
    GetColor,
    GetRam,
    GetCapacity,
    GetAllBlog,
} from "../../../../store/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import Category from "./chillModalUpdate/Category";
import Color from "./chillModalUpdate/Color";
import Ram from "./chillModalUpdate/Ram";
import Capacity from "./chillModalUpdate/Capacity";
import Blog from "./chillModalUpdate/Blog";
const DialogComponent: React.FC<ModalCreate> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [slug, setSlug] = useState<string>(props.slug);
    const [id, setId] = useState<any>(props.id);
    const [title, setTitle] = useState<any>();
    const [checkValid, setCheckValid] = useState<CheckValidInterface>({
        title: false,
    });
    const token = localStorage.getItem("auth");
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        setOpen(props.open);
        setSlug(props.slug);
        setId(props.id);
    }, [props.open]);
    const handleClose = () => {
        props.handleClose(false);
    };

    const handleChange = (data: any) => {
        setTitle(data);
    };
    const handleCreate = async () => {
        if (title === "") {
            setCheckValid((prevState) => ({
                ...prevState,
                title: true,
            }));
        }
        if (slug === "manager-brand") {
            if (title !== "") {
                const response = await apiUpdateBrand({
                    title,
                    id: id,
                    token,
                });
                if (response.data.success) {
                    dispatch(GetBrand(null));
                    toast.success("Update brand successfully");
                } else {
                    toast.error("Update brand failed");
                }
                props.handleClose(false);
            }
        }
        if (slug === "manager-category") {
            if (title !== "") {
                const response = await apiUpdateCategory({
                    title,
                    id: id,
                    token,
                });
                if (response.data.success) {
                    dispatch(GetCategory(null));
                    toast.success("Update category successfully");
                } else {
                    toast.error("Update category failed");
                }
                props.handleClose(false);
            }
        }
        if (slug === "manager-color") {
            if (title !== "") {
                const response = await apiEditColor({
                    color: title,
                    id: id,
                    token,
                });
                if (response.data.success) {
                    dispatch(GetColor(null));
                    toast.success("Update color successfully");
                } else {
                    toast.error("Update color failed");
                }
                props.handleClose(false);
            }
        }
        if (slug === "manager-ram") {
            if (title !== "") {
                const response = await apiEditRam({
                    size: title,
                    id: id,
                    token,
                });
                if (response.data.success) {
                    dispatch(GetRam(null));
                    toast.success("Update ram successfully");
                } else {
                    toast.error("Update ram failed");
                }
                props.handleClose(false);
            }
        }
        if (slug === "manager-capacity") {
            if (title !== "") {
                const response = await apiEditCapacity({
                    size: Number(title.size),
                    percent: Number(title.percent),
                    id: id,
                });
                if (response.data.success) {
                    dispatch(GetCapacity(null));
                    toast.success("Update ram successfully");
                } else {
                    toast.error("Update ram failed");
                }
                props.handleClose(false);
            }
        }
        if (slug === "manager-blog") {
            if (title !== "") {
                const response = await apiUpdateBlog(title);
                if (response.data.success) {
                    dispatch(GetAllBlog(null));
                    toast.success("Update blog successfully");
                } else {
                    toast.error("Update blog failed");
                }
                props.handleClose(false);
            }
        }
    };
    return (
        <Dialog
            className="modal-dialog"
            open={open}
            handler={props.handleClose}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader>{props.title}</DialogHeader>
            <DialogBody divider>
                {slug === "manager-brand" && (
                    <div>
                        <Brand id={id} handleChange={handleChange} />
                        <Required
                            value={title}
                            valid={checkValid.title}
                            keywords="Title"
                            setShow={setCheckValid}
                        />
                    </div>
                )}
                {slug === "manager-category" && (
                    <div>
                        <Category id={id} handleChange={handleChange} />
                        <Required
                            value={title}
                            valid={checkValid.title}
                            keywords="Title"
                            setShow={setCheckValid}
                        />
                    </div>
                )}
                {slug === "manager-color" && (
                    <div>
                        <Color id={id} handleChange={handleChange} />
                        <Required
                            value={title}
                            valid={checkValid.title}
                            keywords="Color"
                            setShow={setCheckValid}
                        />
                    </div>
                )}
                {slug === "manager-ram" && (
                    <div>
                        <Ram id={id} handleChange={handleChange} />
                        <Required
                            value={title}
                            valid={checkValid.title}
                            keywords="Ram"
                            setShow={setCheckValid}
                        />
                    </div>
                )}
                {slug === "manager-capacity" && (
                    <div>
                        <Capacity id={id} handleChange={handleChange} />
                        <Required
                            value={title}
                            valid={checkValid.title}
                            keywords="Capacity"
                            setShow={setCheckValid}
                        />
                    </div>
                )}
                {slug === "manager-blog" && (
                    <div>
                        <Blog id={id} handleChange={handleChange} />
                        <Required
                            value={title}
                            valid={checkValid.title}
                            keywords="Blog"
                            setShow={setCheckValid}
                        />
                    </div>
                )}
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
                <Button variant="gradient" color="green" onClick={handleCreate}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
            <ToastContainer />
        </Dialog>
    );
};

export default DialogComponent;
