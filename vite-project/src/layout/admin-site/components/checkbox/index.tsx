import { useEffect, useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import "./index.scss";
import {
    apiCreateProductCapacity,
    apiCreateProductColor,
    apiDeleteProductCapacity,
    apiDeleteProductColor,
} from "../../../../apis";

const CheckBoxComponent = (props: any) => {
    const [capacity, setCapacity] = useState(props.capacity);
    const [color, setColor] = useState<any>(props.color);
    const [productsId, setProductsId] = useState<any>(props.productId);
    const [itemCheckBox, setItemCheckBox] = useState(props.itemCheckBox);
    const [itemValueColor, setItemValueColor] = useState(
        props.itemCheckBox.color
    );
    const [itemValueCapacity, setItemValueCapacity] = useState(
        props.itemCheckBox.capacity
    );

    useEffect(() => {
        setColor(props.color);
        setCapacity(props.capacity);
        setProductsId(props.productId);
        setItemCheckBox(props.itemCheckBox);
        setItemValueCapacity(props.itemCheckBox.capacity);
        setItemValueColor(props.itemCheckBox.color);
    }, [props.itemCheckBox, props.ram, props.capacity]);

    const handleCheckboxCapacityChange = async (size: any) => {
        const updatedCheckBoxSizes = [...itemValueCapacity];
        const sizeIndex = updatedCheckBoxSizes.findIndex((selectItem) => {
            return selectItem.id === size.id;
        });
        if (sizeIndex !== -1) {
            updatedCheckBoxSizes.splice(sizeIndex, 1);
            await apiDeleteProductCapacity({
                capacitiesId: size.id,
                productsId: productsId,
            });
        } else {
            updatedCheckBoxSizes.push(size);
            await apiCreateProductCapacity({
                capacitiesId: size.id,
                productsId: productsId,
            });
        }

        setItemValueCapacity(updatedCheckBoxSizes);
    };
    const handleCheckboxColorChange = async (color: any) => {
        const updatedCheckBoxColor = [...itemValueColor];
        const colorIndex = updatedCheckBoxColor.findIndex(
            (selectItem) => selectItem.id === color.id
        );

        if (colorIndex !== -1) {
            updatedCheckBoxColor.splice(colorIndex, 1);
            await apiDeleteProductColor({
                colorsId: color.id,
                productsId: productsId,
            });
        } else {
            updatedCheckBoxColor.push(color);
            await apiCreateProductColor({
                colorsId: color.id,
                productsId: productsId,
            });
        }

        setItemValueColor(updatedCheckBoxColor);
    };
    return Object.keys(itemCheckBox).map((key: any, index: any) => (
        <div className="mt-4 border border-separate rounded-lg p-4" key={index}>
            <label>{key.replace(/^\w/, (c: string) => c.toUpperCase())}</label>

            {key === "capacity" && (
                <div className="grid grid-cols-3 gap-5">
                    {capacity?.map((capacity: any, index: number) => {
                        const isSizeInSelect = itemValueCapacity?.some(
                            (selectItem: any) => selectItem.id === capacity.id
                        );

                        return (
                            <div
                                key={index}
                                className="flex items-center checked-button"
                            >
                                <label className="label-css">
                                    {capacity.size}GB
                                </label>
                                <Checkbox
                                    value={capacity.id}
                                    onChange={() =>
                                        handleCheckboxCapacityChange(capacity)
                                    }
                                    checked={isSizeInSelect}
                                    crossOrigin={undefined}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {key === "color" && (
                <div className="grid grid-cols-3 gap-5">
                    {color?.map((color: any, index: number) => {
                        const isSizeInSelect = itemValueColor?.some(
                            (selectItem: any) => selectItem.id === color.id
                        );
                        return (
                            <div
                                key={index}
                                className="flex items-center checked-button"
                            >
                                <label className="label-css">
                                    {color.color}
                                </label>
                                <Checkbox
                                    value={color}
                                    onChange={() =>
                                        handleCheckboxColorChange(color)
                                    }
                                    checked={isSizeInSelect}
                                    crossOrigin={undefined}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    ));
};

export default CheckBoxComponent;
