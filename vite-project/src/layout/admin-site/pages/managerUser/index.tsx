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
    "Avatar",
    "Full Name",
    "Email",
    "Role",
    "Account Status",
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
        const user = users?.find((user: any) => user.id === id);
        const payload = {
            status: user.status === "true" ? "false" : "true",
            id: id,
            token: token,
        };
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
                <Head
                    title={"Manager User"}
                    slug={"manager-user"}
                    data={users}
                />
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
                                                src={item.avatar}
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
                                            {item.firstName} {item.lastName}
                                        </Typography>
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
                                            {item.role.code}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={
                                                    item.status === "false"
                                                        ? "false"
                                                        : "true"
                                                }
                                                color={
                                                    item.status === "true"
                                                        ? "green"
                                                        : "red"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        {Number(item.role.id) === 1 && (
                                            <Button
                                                onClick={() =>
                                                    handleEdit(item.id)
                                                }
                                                className={`${
                                                    item.status === "false"
                                                        ? "bg-red-500 hover:bg-red-700"
                                                        : "bg-green-500 hover:bg-green-700"
                                                }   text-white font-bold px-6 py-3 rounded text-lg`}
                                            >
                                                {item.status === "false" ? (
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
