import pathAdmin from "./path";
import { GrProductHunt } from "react-icons/gr";
import { TbBrandAppleArcade } from "react-icons/tb";
import { PiUsersFourDuotone } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFillDiagram3Fill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { MdReduceCapacity } from "react-icons/md";
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineComment,
} from "react-icons/ai";

interface MenuItem {
    id: number;
    submenu?: SubMenuItem[];
    value: string;
    type: string;
    path?: string;
    icon?: React.ReactNode;
}

interface SubMenuItem {
    path: string;
    value: string;
    icon?: React.ReactNode;
}

export const adminNavigation: MenuItem[] = [
    {
        id: 1,
        value: "Dashboard",
        icon: <AiOutlineDashboard />,
        type: "single",
        path: `${pathAdmin.DASHBOARD}`,
    },
    {
        id: 2,
        value: "Manage Users",
        icon: <PiUsersFourDuotone />,
        type: "single",
        path: `${pathAdmin.MANAGER_USER}`,
    },
    {
        id: 3,
        value: "Warehouse",
        type: "parent",
        submenu: [
            {
                value: "Manage Products",
                icon: <GrProductHunt />,
                path: `${pathAdmin.MANAGER_PRODUCT}`,
            },
            {
                value: "Manage Brand",
                icon: <TbBrandAppleArcade />,
                path: `${pathAdmin.MANAGER_BRAND}`,
            },
            {
                value: "Manage Category",
                icon: <BiCategoryAlt />,
                path: `${pathAdmin.MANAGER_CATEGORY}`,
            },
            {
                value: "Color",
                icon: <IoIosColorPalette />,
                path: `${pathAdmin.MANAGER_COLOR}`,
            },
            {
                value: "Capacity",
                icon: <MdReduceCapacity />,
                path: `${pathAdmin.MANAGER_CAPACITY}`,
            },
        ],
    },
    {
        id: 4,
        icon: <AiOutlineShoppingCart />,
        value: "Manage Orders",
        type: "single",
        path: `${pathAdmin.MANAGER_ORDER}`,
    },
    {
        id: 5,
        icon: <AiOutlineComment />,
        value: "Manage Blog",
        type: "single",
        path: `${pathAdmin.MANAGER_BLOG}`,
    },
];
