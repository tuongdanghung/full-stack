import path from "./path";
import {
    UserCircleIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
} from "@heroicons/react/24/outline";
export const navigation = [
    {
        id: 1,
        label: "HOME",
        path: `/${path.HOME}`,
        icon: UserCircleIcon,
    },
    {
        id: 3,
        label: "BLOG",
        path: `/${path.BLOG}`,
        icon: UserCircleIcon,
    },
    {
        id: 4,
        label: "CONTACT",
        path: `/${path.OUR_SERVICES}`,
        icon: UserCircleIcon,
    },
    {
        id: 5,
        label: "FAQ",
        path: `/${path.FAQ}`,
        icon: UserCircleIcon,
    },
];

export const profileMenuItems = [
    {
        label: "My Profile",
        path: `/${path.MYPROFILE}`,
        icon: UserCircleIcon,
    },
    {
        label: "History order",
        path: `${path.HISTORY}`,
        icon: InboxArrowDownIcon,
    },
    {
        label: "Sign Out",
        path: `/${path.LOGIN}`,
        icon: PowerIcon,
    },
];
