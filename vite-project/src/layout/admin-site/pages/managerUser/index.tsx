import { useEffect, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/pagination";
import Head from "../../components/layout/Head";
import { GetAllUsersByAdmin } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { apiUpdateUserByAdmin } from "../../../../apis";
import { ToastContainer, toast } from "react-toastify";
const TABLE_HEAD = [
    "Full Name",
    "Email",
    "Role",
    "Account Status",
    "Wallet",
    "",
];

const ManagerUsers = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: any) => state?.userReducer?.users);
    const [data, setData] = useState<any>([]);
    const token = localStorage.getItem("auth");
    useEffect(() => {
        dispatch(GetAllUsersByAdmin(null));
    }, []);
    const handleEdit = async (id: string) => {
        const user = users?.find((user: any) => user._id === id);
        const payload = { isBlocked: !user.isBlocked, id: id, token: token };
        const response = await apiUpdateUserByAdmin(payload);
        if ((response as any).data.success) {
            dispatch(GetAllUsersByAdmin(null));
            toast.success("Updated user successfully");
        } else {
            toast.error("Updated user failed");
        }
    };
    const handlePage = (pagination: any) => {
        setData(pagination);
    };
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Head title={"Manager User"} slug={"manager-user"} />
            </CardHeader>
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-left">
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
                            const isLast = index === data.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={item.id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                alt={item.name}
                                                size="md"
                                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                            />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {item.name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {Number(item.role) === 2 && "user"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={
                                                    item.isBlocked === false
                                                        ? "false"
                                                        : "true"
                                                }
                                                color={
                                                    item.isBlocked === false
                                                        ? "green"
                                                        : "red"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal capitalize"
                                                >
                                                    {item.wallet} $
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        {Number(item.role) === 2 && (
                                            <Button
                                                onClick={() =>
                                                    handleEdit(item._id)
                                                }
                                                className={`${
                                                    item.isBlocked === false
                                                        ? "bg-red-500 hover:bg-red-700"
                                                        : "bg-green-500 hover:bg-green-700"
                                                }   text-white font-bold px-6 py-3 rounded text-lg`}
                                            >
                                                {item.isBlocked === false ? (
                                                    <AiFillUnlock className="h-5 w-6  text-white" />
                                                ) : (
                                                    <AiFillLock className="h-5 w-6 text-lg text-white" />
                                                )}
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center border-t border-blue-gray-50 p-4 justify-center">
                <Pagination data={users} handlePage={handlePage} />
            </CardFooter>
            <ToastContainer />
        </Card>
    );
};

export default ManagerUsers;
