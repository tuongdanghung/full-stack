import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
const Download = () => {
    return (
        <Button className="flex items-center gap-3" size="sm">
            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
        </Button>
    );
};

export default Download;
