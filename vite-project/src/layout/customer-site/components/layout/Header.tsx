import React, { useEffect, useState } from "react";
import { profileMenuItems, navigation } from "../../utils/nav";
import { useNavigate } from "react-router-dom";

import {
    Navbar,
    Collapse,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    RocketLaunchIcon,
    Bars2Icon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import "./index.scss";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { GetOneUser } from "../../../../store/actions";

const ProfileMenu = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("auth");
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const closeMenu = (path: any) => {
        navigate(path);
        if (path === "/login") {
            localStorage.removeItem("auth");
        }
        setIsMenuOpen(false);
    };
    useEffect(() => {
        dispatch(GetOneUser(token));
    }, []);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-blue-500 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, path }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => closeMenu(path)}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${
                                    isLastItem ? "text-red-500" : ""
                                }`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

// nav list menu

const NavListMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <>
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md"
                    >
                        <RocketLaunchIcon
                            strokeWidth={1}
                            className="h-28 w-28"
                        />
                    </Card>
                </MenuList>
            </Menu>
        </>
    );
};

// nav list component
const activeStyle =
    "px-4 py-2 flex items-center gap-2 bg-gray-300 text-gray-800 rounded-full";
const notActiveStyle =
    "px-4 py-2 flex items-center gap-2 hover:bg-gray-600 rounded-full hover:text-white";
const NavList = () => {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu />
            {navigation.map(({ label, icon, path }) => (
                <NavLink
                    key={label}
                    to={path}
                    color="blue-gray"
                    className={({ isActive }) =>
                        clsx(
                            isActive && activeStyle,
                            !isActive && notActiveStyle
                        )
                    }
                >
                    <div className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, {
                            className: "h-[18px] w-[18px]",
                        })}{" "}
                        {label}
                    </div>
                </NavLink>
            ))}
        </ul>
    );
};

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);
    const oneUser = useSelector((state: any) => state?.userReducer.oneUser);
    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:px-6">
            <div className="relative mx-auto flex justify-between items-center text-blue-gray-900">
                <NavLink
                    to="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    Material Tailwind
                </NavLink>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                <div className="flex w-[100px] items-center cursor-pointer">
                    <Link to={path.CART} className="relative">
                        <span className="text-red-500 font-bold absolute top-[-12px] right-0">
                            {oneUser?.cart?.length}
                        </span>
                        <ShoppingCartIcon className="h-7 w-7" />
                    </Link>
                    <ProfileMenu />
                </div>
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse>
        </Navbar>
    );
};
export default Header;
