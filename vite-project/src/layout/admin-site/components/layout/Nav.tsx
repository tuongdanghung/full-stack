import { useState } from "react";
import { adminNavigation } from "../../utils/nav";
import clsx from "clsx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Button } from "flowbite-react";
import path from "../../../customer-site/utils/path";
const activeStyle =
    "px-4 py-2 flex items-center gap-2 bg-gray-500 text-gray-200 rounded rounded-lg";
const notActiveStyle =
    "px-4 py-2 flex items-center gap-2 hover:bg-gray-600 text-gray-200 rounded rounded-lg";

const Nav = () => {
    const [actived, setActived] = useState<number[]>([]);
    const handleShowTabs = (tabId: number) => {
        if (actived.some((el) => el === tabId)) {
            setActived((prev) => prev.filter((el) => el !== tabId));
        } else {
            setActived((prev) => [...prev, tabId]);
        }
    };
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("auth");
        navigate(`${`/${path.LOGIN}`}`);
    };
    return (
        <div className="p-4 bg-gray-900 text-white h-screen">
            <div className="flex flex-col items-center py-4 justify-center">
                <Link to={"/"}>
                    <img
                        className="m-auto"
                        width="25%"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt=""
                    />
                </Link>
                <h2>Admin</h2>
            </div>
            <ul>
                {adminNavigation.map((item, index) => (
                    <li key={index}>
                        {item.type === "single" && (
                            <NavLink
                                className={({ isActive }) =>
                                    clsx(
                                        isActive && activeStyle,
                                        !isActive && notActiveStyle
                                    )
                                }
                                to={`${item.path}`}
                            >
                                {item.icon}
                                {item.value}
                            </NavLink>
                        )}
                        {item.type === "parent" && (
                            <div
                                onClick={() => handleShowTabs(+item.id)}
                                className="flex flex-col text-gray-200 cursor-pointer"
                            >
                                <div className="px-4 py-2 flex items-center gap-2 text-gray-200 rounded rounded-lg hover:bg-gray-600">
                                    <AiOutlineCaretDown />
                                    {item.value}
                                </div>
                                {actived.some((id) => +id === +item.id) && (
                                    <div className="px-4">
                                        {item.submenu?.map((item) => (
                                            <NavLink
                                                key={item.path}
                                                className={({ isActive }) =>
                                                    clsx(
                                                        isActive && activeStyle,
                                                        !isActive &&
                                                            notActiveStyle
                                                    )
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                to={`${item.path}`}
                                            >
                                                {item.icon}
                                                {item.value}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
                <li className="mt-4">
                    <Button
                        onClick={() => handleLogOut()}
                        className={"w-full bg-gray-600"}
                    >
                        Log out
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default Nav;
