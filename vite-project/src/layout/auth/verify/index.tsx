import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFinalRegister } from "../../../apis";
import Swal from "sweetalert2";
import { Snipper } from "../../customer-site/components";
const Verify = () => {
    const params = useParams();
    const [isSnipper, setIsSnipper] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiFinalRegister(params.id);
            setIsSnipper(true);
            if (response.data.success) {
                setIsSnipper(false);
                Swal.fire(
                    "Congratulations!",
                    (response as any).data.message,
                    "success"
                ).then(() => {
                    window.location.replace("http://127.0.0.1:3000/login");
                });
            }
        };

        fetchData();
    }, []);

    return <div>{isSnipper ? <Snipper /> : null}</div>;
};

export default Verify;
