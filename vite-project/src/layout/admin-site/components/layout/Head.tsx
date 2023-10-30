import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { AiFillFolderAdd } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import SearchComponent from "../search";
import Download from "../download";
import ModalCreateComponent from "../modal/create";
type Props = {
    title: string;
    slug: string;
};
const Head: React.FC<Props> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const handleClose = (close: boolean) => {
        setOpen(close);
    };
    return (
        <div className="px-10 flex justify-between gap-8 md:items-center">
            <Typography variant="h5" color="blue-gray">
                {props.title}
            </Typography>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
                <SearchComponent slug={props.slug} />
                {props.slug !== "manager-order" &&
                props.slug !== "manager-comment" &&
                props.slug !== "manager-user" ? (
                    <Button
                        onClick={() => handleOpen()}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-2 rounded text-lg"
                    >
                        <AiFillFolderAdd className="h-5 w-6 text-white" />
                    </Button>
                ) : null}

                {/* <Download /> */}
            </div>
            <ModalCreateComponent
                open={open}
                slug={props.slug}
                title={props.title}
                handleClose={handleClose}
            />
        </div>
    );
};

export default Head;
