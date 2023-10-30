import React, { useEffect, useState } from "react";
import { Collapse, Button } from "@material-tailwind/react";
import { TextInput } from "flowbite-react";
import { BiSearch } from "react-icons/bi";
import {
    GetAllProduct,
    GetBrand,
    GetColor,
    GetRam,
} from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";

interface DataItem {
    id: number;
    title?: string;
    color?: string;
    size?: number;
}

interface CollectionItem {
    id: number;
    title: string;
}

const Collection: CollectionItem[] = [
    {
        id: 1,
        title: "brand",
    },
    {
        id: 2,
        title: "color",
    },
    {
        id: 3,
        title: "ram",
    },
];

const FilterProduct = () => {
    const [value, setValue] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const brand = useSelector((state: any) => state?.productReducer.brand);
    const color = useSelector((state: any) => state?.productReducer.color);
    const [inputValue, setInputValue] = useState("");
    const [isParams, setIsParam] = useState<any>("");
    const ram = useSelector((state: any) => state?.productReducer.ram);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedRam, setSelectedRam] = useState<string | null>(null);
    const dataMap: { [key: string]: DataItem[] } = {
        brand,
        color,
        ram,
    };

    const [openCollapseMap, setOpenCollapseMap] = useState<{
        [key: number]: boolean;
    }>({});

    useEffect(() => {
        dispatch(GetBrand(null));
        dispatch(GetColor(null));
        dispatch(GetRam(null));
    }, []);
    useEffect(() => {
        dispatch(GetAllProduct(isParams));
    }, [inputValue]);

    const toggleOpen = (id: number) => {
        setOpenCollapseMap((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Đảo trạng thái mở/đóng của collapse có id tương ứng
        }));
    };

    const handleSearchTextInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValue(e.target.value);
        dispatch(GetAllProduct({ title: e.target.value }));
    };

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        dataItem: any
    ) => {
        const collectionTitle = e.target.getAttribute("data-type");
        const isChecked = e.target.checked;
        if (collectionTitle === "brand") {
            setSelectedBrand(isChecked ? dataItem.title : null);
            setSelectedRam(null);
            setSelectedColor(null);
            setInputValue(dataItem.title);
            setIsParam({ brand: dataItem.title });
        } else if (collectionTitle === "color") {
            setSelectedColor(isChecked ? dataItem.color : null);
            setSelectedBrand(null);
            setSelectedRam(null);
            setInputValue(dataItem.color);
            setIsParam({ color: dataItem.color });
        } else if (collectionTitle === "ram") {
            setSelectedRam(isChecked ? dataItem.size : null);
            setSelectedColor(null);
            setSelectedBrand(null);
            setInputValue(dataItem.size);
            setIsParam({ ram: dataItem.size });
        }
    };

    return (
        <div className="p-4 border border-collapse rounded-md m-0 top-7">
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-3 grid grid-cols-5 gap-5">
                    {Collection.map((collectionItem) => {
                        const collectionTitle = collectionItem.title;
                        const correspondingData = dataMap[collectionTitle];

                        return (
                            <div key={collectionItem.id}>
                                <Button
                                    onClick={() =>
                                        toggleOpen(collectionItem.id)
                                    }
                                >
                                    {collectionTitle.charAt(0).toUpperCase() +
                                        collectionTitle.slice(1)}
                                </Button>
                                <Collapse
                                    open={openCollapseMap[collectionItem.id]}
                                >
                                    {correspondingData?.map((dataItem: any) => {
                                        return (
                                            <div key={dataItem._id}>
                                                <input
                                                    type="checkbox"
                                                    data-type={collectionTitle}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(
                                                            e,
                                                            dataItem
                                                        )
                                                    }
                                                    checked={
                                                        collectionTitle ===
                                                        "brand"
                                                            ? dataItem.title ===
                                                              selectedBrand
                                                            : collectionTitle ===
                                                              "color"
                                                            ? dataItem.color ===
                                                              selectedColor
                                                            : collectionTitle ===
                                                              "ram"
                                                            ? dataItem.size ===
                                                              selectedRam
                                                            : false
                                                    }
                                                />
                                                <span className="ml-3">
                                                    {dataItem.title ||
                                                        dataItem.color ||
                                                        dataItem.size}
                                                    {dataItem.size
                                                        ? "GB"
                                                        : null}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </Collapse>
                            </div>
                        );
                    })}
                </div>
                <div className="col-span-2">
                    <div>
                        <div className="max-w-md">
                            <TextInput
                                value={value}
                                onChange={handleSearchTextInputChange}
                                placeholder="search product"
                                required
                                rightIcon={BiSearch}
                                type="email"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterProduct;
