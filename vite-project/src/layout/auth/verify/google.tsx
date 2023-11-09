import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const VerifyGoogle = () => {
    const params = useParams();
    const { token }: any = params;
    useEffect(() => {
        socket.emit("message", "Click!");
    }, []);
    setTimeout(() => {
        localStorage.setItem("auth", token);
        window.close();
    }, 1000);
    return <div></div>;
};

export default VerifyGoogle;
