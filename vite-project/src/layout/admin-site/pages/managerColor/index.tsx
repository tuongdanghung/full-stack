import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import Pagination from "../../components/pagination";
import Head from "../../components/layout/Head";
import { GetColor } from "../../../../store/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { apiDeleteColor } from "../../../../apis";
import DialogComponent from "../../components/modal/modalUpdate";
import { ToastContainer, toast } from "react-toastify";
const TABLE_HEAD = ["Title", ""];

const ManagerColor: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("auth");
    const color = useSelector((state: any) => state?.productReducer.color);
    const [id, setId] = useState<string>("");
    useEffect(() => {
        dispatch(GetColor(null));
    }, []);
    const handleDelete = async (id: string) => {
        const payload = { id, token: token };
        const response = await apiDeleteColor(payload);
        if (response.data.success) {
            dispatch(GetColor(null));
            toast.success("Delete color successfully");
        } else {
            toast.error("Delete color failed");
        }
    };
    const handleOpen = (id: string) => {
        setOpen(!open);
        setId(id);
    };
    const handleClose = (close: boolean) => {
        setOpen(close);
    };
    const handlePage = (pagination: any) => {
        setData(pagination);
    };
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Head title={"Color"} slug={"manager-color"} />
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
                            const isLast = index === item.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={item.id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3 justify-center">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {item.color}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className=" flex justify-end">
                                            <Button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="bg-red-500  hover:bg-red-700 text-white font-bold px-6 py-3 rounded text-lg mr-2"
                                            >
                                                <AiFillDelete className="h-5 w-6 text-lg text-white" />
                                            </Button>

                                            <Button
                                                onClick={() => {
                                                    handleOpen(item.id);
                                                }}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-3 rounded text-lg"
                                            >
                                                <AiFillEdit className="h-5 w-6 text-white" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center border-t border-blue-gray-50 p-4 justify-center">
                <Pagination data={color} handlePage={handlePage} />
            </CardFooter>
            <DialogComponent
                id={id}
                open={open}
                slug={"manager-color"}
                title={"Edit Color"}
                handleClose={handleClose}
            />
            <ToastContainer />
        </Card>
    );
};

export default ManagerColor;
