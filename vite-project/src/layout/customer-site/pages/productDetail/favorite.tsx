import { ToastContainer, toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { apiCreateFavorite } from "../../../../apis";
import { GetAllFavorite } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { useEffect } from "react";
type Props = {
    productId: number;
    capacityId: number;
    colorId: number;
};

const Favorite = (props: Props) => {
    const token = localStorage.getItem("auth");
    const favorite = useSelector((state: any) => state?.userReducer?.favorite);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(GetAllFavorite(token));
    }, []);

    const active = favorite?.find(
        (item: any) => item.productId === props.productId
    );

    const handleAddFavorite = async () => {
        const response = await apiCreateFavorite({
            colorId: props.colorId,
            capacityId: props.capacityId,
            productId: props.productId,
        });
        if ((response as any).data.success) {
            toast.success("update favorite successfully");
            dispatch(GetAllFavorite(token));
        } else {
            toast.error("update favorite failed");
        }
    };

    return (
        <div>
            {active ? (
                <AiFillHeart className="text-3xl text-red-600" />
            ) : (
                <AiOutlineHeart
                    className="text-3xl"
                    onClick={handleAddFavorite}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default Favorite;
