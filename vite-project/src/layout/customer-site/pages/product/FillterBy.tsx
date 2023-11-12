import React, { useEffect, useState } from "react";
import { Collapse, Button } from "@material-tailwind/react";
import { TextInput } from "flowbite-react";
import { BiSearch } from "react-icons/bi";
import { GetAllProduct, GetBrand } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";

interface DataItem {
    id: number;
    title?: string;
    color?: string;
    size?: number;
    data?: string;
}

interface CollectionItem {
    id: number;
    title: string;
    data?: string;
}

const Collection: CollectionItem[] = [
    {
        id: 1,
        title: "brand",
    },
];

const FilterProduct = (props: any) => {
    const [value, setValue] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const brand = useSelector((state: any) => state?.productReducer.brand);
    const color = useSelector((state: any) => state?.productReducer.color);
    const [inputValue, setInputValue] = useState("");
    const [isParams, setIsParam] = useState<any>("");
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const dataMap: { [key: string]: DataItem[] } = {
        brand,
        color,
    };

    const [openCollapseMap, setOpenCollapseMap] = useState<{
        [key: number]: boolean;
    }>({});

    useEffect(() => {
        dispatch(GetBrand(null));
    }, []);
    useEffect(() => {
        dispatch(GetAllProduct(isParams));
    }, [inputValue]);

    const toggleOpen = (id: number) => {
        setOpenCollapseMap((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
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
            const newData = props?.data?.filter(
                (item: any) => item.brand.title === dataItem.title
            );
            props.filterData(newData);
            setInputValue(dataItem.title);
            setIsParam({ brand: dataItem.title });
        }
    };
    const handleAll = () => {
        props.filterData(props?.data);
        setInputValue("");
        setSelectedBrand(null);
        setIsParam("");
    };

    return (
        <div className="p-4 border border-collapse rounded-md m-0 top-7">
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-3 grid grid-cols-5 gap-5">
                    <Button className="h-[40px]" onClick={handleAll}>
                        All
                    </Button>

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
                                    open={
                                        openCollapseMap[collectionItem.id] ||
                                        false
                                    }
                                >
                                    {correspondingData?.map((dataItem: any) => {
                                        return (
                                            <div key={dataItem.id}>
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
