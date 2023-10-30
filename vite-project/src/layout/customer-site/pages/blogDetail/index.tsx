import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { GetOneBlog } from "../../../../store/actions";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
    const param = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: any) => state?.blogReducer?.oneBlog);
    useEffect(() => {
        dispatch(GetOneBlog(param));
    }, []);
    return (
        <div>
            <h1 className="text-2xl font-bold">{data?.title}</h1>
            <h1>{data?.description}</h1>
        </div>
    );
};

export default BlogDetail;
