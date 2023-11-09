import { Button } from "@material-tailwind/react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import * as XLSX from "xlsx";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    active: number;
    stock: number;
    images: Image[];
    category: Category;
    brand: Brand;
    capacities: Capacity[];
    colors: Color[];
}

interface Image {
    id: number;
    src: string;
}

interface Category {
    id: number;
    title: string;
}

interface Brand {
    id: number;
    title: string;
}

interface Capacity {
    id: number;
    size: number;
    percent: number;
}

interface Color {
    id: number;
    color: string;
}

const Download = (props: any) => {
    const exportToExcelProduct = (products: Product[], filename: string) => {
        const data = products.map((product) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            active: product.active,
            stock: product.stock,
            images: product.images.map((image) => image.src).join(", "),
            category: product.category.title,
            brand: product.brand.title,
            capacities: product.capacities
                .map((capacity) => `${capacity.size} (${capacity.percent}%)`)
                .join(", "),
            colors: product.colors.map((color) => color.color).join(", "),
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    const exportToExcelUser = (users: any, filename: string) => {
        const data = users.map((user: any) => ({
            id: user.id,
            firstName: user.lastName,
            lastName: user.lastName,
            avatar: user.avatar,
            email: user.email,
            card_id: user.card_id,
            role: user.role.id,
            status: user.status,
            address: user.addresses
                .map((address: any) => address.id)
                .join(", "),
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    const handleExportClick = () => {
        switch (props.slug) {
            case "manager-user":
                exportToExcelUser(props.data, "user");
                break;
            case "manager-product":
                exportToExcelProduct(props.data, "products");
                break;

            default:
                break;
        }
    };

    return (
        <div>
            <Button
                onClick={handleExportClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-2 rounded text-lg"
            >
                <AiOutlineCloudDownload className="h-6 w-6 text-white" />
            </Button>
        </div>
    );
};

export default Download;
