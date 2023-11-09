import { useEffect } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { GetAllFavorite } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
import { apiDeleteFavorite } from "../../../../apis";
import { useDispatch, useSelector } from "react-redux";
const TABLE_HEAD = ["Title", "Image", "Capacity", "Color", ""];

const Favorite = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("auth");
    const favorite = useSelector((state: any) => state?.userReducer?.favorite);
    useEffect(() => {
        dispatch(GetAllFavorite(token));
    }, []);

    const handleDelete = async (id: string) => {
        const response = await apiDeleteFavorite(id);
        if (response.data.success) {
            toast.success("Delete item favorite successfully");
            dispatch(GetAllFavorite(null));
        } else {
            toast.error("Delete item favorite failed");
        }
    };

    return (
        <div>
            {favorite?.length > 0 ? (
                <div>
                    <Card className="w-full text-center">
                        <div className="p-5">
                            <div className="flex-none border border-separate gap-4 w-full p-5">
                                <h2 className="font-semibold text-xl py-4">
                                    Favorite
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
                                        {favorite?.map(
                                            (item: any, index: any) => {
                                                const isLast =
                                                    index ===
                                                    favorite.length - 1;
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
                                                                {
                                                                    item.product
                                                                        .title
                                                                }
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
                                                            <Typography
                                                                as="a"
                                                                href="#"
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-medium"
                                                            >
                                                                {
                                                                    item
                                                                        .capacity
                                                                        .size
                                                                }
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
                                                                {
                                                                    item.color
                                                                        .color
                                                                }
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
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                <p className="text-center">
                    <img
                        width={"100%"}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbflu1tU5bBzFFu5-HqjhX-AbwnC3A31bmQ&usqp=CAU"
                        alt=""
                    />
                    <span>There are no products in the favorite</span>
                </p>
            )}
            <ToastContainer />
        </div>
    );
};

export default Favorite;
