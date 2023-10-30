import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Head from "../../components/layout/Head";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
} from "@material-tailwind/react";
export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];
const TABLE_HEAD = ["Full Name", "Email", "Role"];

const TABLE_ROWS = [
    {
        name: "Hung 1",
        email: "tuongdanghung37@gmail.com",
        amount: "$2,500",
        role: "admin",
        expiry: "06/2026",
    },
    {
        name: "Hung 2",
        amount: "$5,000",
        email: "tuongdanghung37@gmail.com",
        role: "user",
        account: "master-card",
        expiry: "06/2026",
    },
    {
        name: "Hung 3",
        amount: "$3,400",
        email: "tuongdanghung37@gmail.com",
        role: "user",
        account: "master-card",
        expiry: "06/2026",
    },
    {
        name: "Hung 4",
        amount: "$1,000",
        email: "tuongdanghung37@gmail.com",
        role: "user",
        account: "visa",
        expiry: "06/2026",
    },
    {
        name: "Hung 5",
        amount: "$14,000",
        email: "tuongdanghung37@gmail.com",
        role: "user",
        account: "visa",
        expiry: "06/2026",
    },
];
function Charts() {
    return (
        <div className="mt-9">
            <div className="flex flex-row gap-10 m-10">
                <div className="basis-1/2 border border-spacing-1 border-current">
                    <div className="p-4">
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="400px"
                            data={data}
                        />
                    </div>
                </div>
                <div className="basis-1/2 border border-spacing-1 border-current">
                    <div className="p-4">
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="400px"
                            data={data}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-10 m-10">
                <div className="basis-1/2 border border-spacing-1 border-current">
                    <Card className="h-full w-full">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            className="rounded-none"
                        >
                            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                <Head title={"Manager Brand"} />
                            </div>
                        </CardHeader>
                        <CardBody className="px-0">
                            <table className="w-full min-w-max table-auto text-center">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {TABLE_ROWS.map(
                                        ({ name, email, role }, index) => {
                                            const isLast =
                                                index === TABLE_ROWS.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={name}>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3 justify-center">
                                                            <Avatar
                                                                alt={name}
                                                                size="md"
                                                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                            />
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-bold"
                                                            >
                                                                {name}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {role}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </div>
                <div className="basis-1/2 border border-spacing-1 border-current">
                    <div className="p-4">
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="400px"
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Charts;
