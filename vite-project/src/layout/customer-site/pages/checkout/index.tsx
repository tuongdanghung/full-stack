import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import path from "../../utils/path";
const TABLE_HEAD = ["Title", "Image", "Quantity", "Total"];
const TABLE_ROWS = [
    {
        name: "John Michael",
        date: "23/04/18",
        image: "https://salt.tikicdn.com/cache/280x280/ts/product/ca/0d/b0/e183f5f1d1e66d8c402b50b476e4a486.jpg.webp",
    },
    {
        name: "Alexa Liras",
        date: "23/04/18",
        image: "https://salt.tikicdn.com/cache/280x280/ts/product/ca/0d/b0/e183f5f1d1e66d8c402b50b476e4a486.jpg.webp",
    },
];

const Checkout = () => {
    return (
        <div className="mt-6 customer-care p-4 bg-white border border-collapse rounded-md">
            <div className="grid grid-cols-2 gap-5">
                <div className="border border-collapse rounded-md p-4">
                    <h1 className="text-2xl">Personal Details</h1>
                    <div className="my-6">
                        <label
                            color="blue-gray"
                            className="mb-2 block font-medium"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="mt-6">
                        <label
                            color="blue-gray"
                            className="mb-2 block font-medium"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="address"
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="mt-6">
                        <label
                            color="blue-gray"
                            className="mb-2 block font-medium"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="address"
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="mt-6">
                        <label
                            color="blue-gray"
                            className="mb-2 block font-medium"
                        >
                            Payment method
                        </label>
                        <Button>Cash</Button>
                        <Button className="ml-4">Cart</Button>
                    </div>
                </div>
                <div className="border border-collapse rounded-md p-4">
                    <Card className="text-center">
                        <table className="min-w-max table-auto text-center">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                                    ({ name, image, date }, index) => {
                                        const isLast =
                                            index === TABLE_ROWS.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={name} className="m-auto">
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        <img
                                                            className="m-auto"
                                                            width={80}
                                                            src={`${image}`}
                                                            alt=""
                                                        />
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        as="a"
                                                        href="#"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium"
                                                    >
                                                        qty
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        as="a"
                                                        href="#"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium"
                                                    >
                                                        total
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </Card>
                    <div className="mt-6 flex flex-col items-end">
                        <p>
                            SubTotal: <span>xxxxxxx</span>
                        </p>
                        <Link to={`/${path.CHECKOUT}`} className="mt-4">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
