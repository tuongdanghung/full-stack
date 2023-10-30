import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
const CountdownTimer = (props: any) => {
    const initialTargetTime = new Date().getTime() + 3600000; // 1 hour in milliseconds
    const targetTimeStored = localStorage.getItem("targetTime");
    const [targetTime, setTargetTime] = useState<number>(
        targetTimeStored ? parseInt(targetTimeStored, 10) : initialTargetTime
    );
    const [remainingTime, setRemainingTime] = useState<number>(
        targetTime - new Date().getTime()
    );
    useEffect(() => {
        localStorage.setItem("targetTime", targetTime.toString());

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const newRemainingTime = targetTime - currentTime;

            if (newRemainingTime <= 0) {
                setTargetTime(initialTargetTime); // Reset targetTime to initial value
                setRemainingTime(initialTargetTime - currentTime);
            } else {
                setRemainingTime(newRemainingTime);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime, initialTargetTime]);
    const hours = Math.floor(remainingTime / 3600000);
    const minutes = Math.floor((remainingTime % 3600000) / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    return (
        <div className="mt-6 customer-care p-6 bg-white border border-collapse rounded-md">
            <div className="flex">
                <h1>Hot deal : </h1>
                <div className="ml-2">
                    <span className="bg-red-500 p-1 text-white rounded">
                        {hours.toString().padStart(2, "0")}
                    </span>
                    :
                    <span className="bg-red-500 p-1 text-white rounded">
                        {minutes.toString().padStart(2, "0")}
                    </span>
                    :
                    <span className="bg-red-500 p-1 text-white rounded">
                        {seconds.toString().padStart(2, "0")}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-5">
                <Card className="mt-6 border border-collapse">
                    <CardBody>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2 relative"
                        >
                            <img
                                src={
                                    "https://salt.tikicdn.com/cache/280x280/ts/product/ca/0d/b0/e183f5f1d1e66d8c402b50b476e4a486.jpg.webp"
                                }
                                alt=""
                            />
                        </Typography>
                        <Typography className="m-auto">
                            <span className="text-2xl font-bold">xxxxx</span>{" "}
                            <br />
                            <span>Price: 123$</span>
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button>Read More</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default CountdownTimer;
