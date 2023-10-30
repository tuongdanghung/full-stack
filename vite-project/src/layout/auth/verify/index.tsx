import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiFinalRegister } from "../../../apis";
const Verify = () => {
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiFinalRegister(params.id);
            if (response.data.success) {
                window.close();
            }
        };

        fetchData();
    }, []);

    return <div>Verify</div>;
};

export default Verify;
