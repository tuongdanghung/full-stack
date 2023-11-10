import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../../components";
import { AppDispatch } from "../../../../store";
import { GetAllOrder, GetOneUser } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const ExtendAdmin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("auth");
    const user = useSelector((state: any) => state?.userReducer?.oneUser);
    useEffect(() => {
        dispatch(GetOneUser(token));
        socket.on("message", (newMessage) => {
            dispatch(GetAllOrder(token));
            if ("Notification" in window) {
                if (Notification.permission === "granted") {
                    new Notification("New Message", {
                        body: "You have a new message!",
                    });
                } else if (Notification.permission !== "denied") {
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            new Notification("New Message", {
                                body: "You have a new message!",
                            });
                        }
                    });
                }
            }
        });
    }, []);

    return (
        <>
            {user?.role.id === 2 ? (
                <div className="flex w-full">
                    <div className="w-1/6">
                        <Nav />
                    </div>
                    <div className="w-5/6">
                        <Outlet />
                    </div>
                </div>
            ) : (
                navigate("/")
            )}
        </>
    );
};

export default ExtendAdmin;
