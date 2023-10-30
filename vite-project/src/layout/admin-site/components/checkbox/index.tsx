import { useEffect, useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import "./index.scss";

const CheckBoxComponent = (props: any) => {
    const [ram, setRam] = useState(props.ram);
    const [capacity, setCapacity] = useState(props.capacity);
    const [color, setColor] = useState(props.color);
    const [itemCheckBox, setItemCheckBox] = useState(props.itemCheckBox);
    const [itemValueRam, setItemValueRam] = useState(props.itemCheckBox.ram);
    const [itemValueColor, setItemValueColor] = useState(
        props.itemCheckBox.color
    );
    const [itemValueCapacity, setItemValueCapacity] = useState(
        props.itemCheckBox.capacity
    );
    useEffect(() => {
        setItemCheckBox(props.itemCheckBox);
        setItemValueRam(props.itemCheckBox.ram);
        setItemValueCapacity(props.itemCheckBox.capacity);
        setItemValueColor(props.itemCheckBox.color);
        setRam(props.ram);
        setColor(props.color);
        setCapacity(props.capacity);
        props.changeValueRam(props.itemCheckBox.ram);
        props.changeValueCapacity(props.itemCheckBox.capacity);
    }, [props.itemCheckBox, props.ram, props.capacity]);
    const uniqueSizesRam = Array.from(
        new Set(ram.map((ramItem: any) => ramItem.size))
    );
    const uniqueSizesCapacity = Array.from(
        new Set(capacity.map((capacityItem: any) => capacityItem.size))
    );
    const uniqueSizesColor = Array.from(
        new Set(color.map((colorItem: any) => colorItem.color))
    );
    const handleCheckboxRamChange = (size: any) => {
        const updatedCheckBoxSizes = [...itemValueRam];
        const sizeIndex = updatedCheckBoxSizes.findIndex(
            (selectItem) => selectItem.size === size
        );

        if (sizeIndex !== -1) {
            updatedCheckBoxSizes.splice(sizeIndex, 1); // Loại bỏ nếu đã tồn tại
        } else {
            updatedCheckBoxSizes.push({ size: size }); // Thêm nếu chưa tồn tại
        }
        props.changeValueRam(updatedCheckBoxSizes);
        setItemValueRam(updatedCheckBoxSizes);
    };
    const handleCheckboxCapacityChange = (size: any) => {
        const updatedCheckBoxSizes = [...itemValueCapacity];
        const sizeIndex = updatedCheckBoxSizes.findIndex(
            (selectItem) => selectItem.size === size
        );
        if (sizeIndex !== -1) {
            updatedCheckBoxSizes.splice(sizeIndex, 1);
        } else {
            updatedCheckBoxSizes.push({ size: size });
        }
        const result = capacity
            .filter((itemA: any) =>
                updatedCheckBoxSizes?.some(
                    (itemB: any) => itemA.size === itemB.size
                )
            )
            .map(
                ({ _id, ...rest }: { id: string; [key: string]: any }) => rest
            );
        props.changeValueCapacity(result);
        setItemValueCapacity(result);
    };
    const handleCheckboxColorChange = (color: any) => {
        const updatedCheckBoxColor = [...itemValueColor];
        const colorIndex = updatedCheckBoxColor.findIndex(
            (selectItem) => selectItem.color === color
        );
        if (colorIndex !== -1) {
            updatedCheckBoxColor.splice(colorIndex, 1);
        } else {
            updatedCheckBoxColor.push({ color: color });
        }
        props.changeValueColor(updatedCheckBoxColor);
        setItemValueColor(updatedCheckBoxColor);
    };
    return Object.keys(itemCheckBox).map((key: any, index: any) => (
        <div className="mt-4 border border-separate rounded-lg p-4" key={index}>
            <label>{key.replace(/^\w/, (c: string) => c.toUpperCase())}</label>
            {key === "ram" && (
                <div className="grid grid-cols-3 gap-5">
                    {uniqueSizesRam?.map((size: any, index) => {
                        const isSizeInSelect = itemValueRam?.some(
                            (selectItem: any) => selectItem.size === size
                        );
                        return (
                            <div
                                key={index}
                                className="flex items-center checked-button"
                            >
                                <label className="label-css">{size}GB</label>
                                <Checkbox
                                    value={size}
                                    onChange={() =>
                                        handleCheckboxRamChange(size)
                                    }
                                    checked={isSizeInSelect}
                                    crossOrigin={undefined}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {key === "capacity" && (
                <div className="grid grid-cols-3 gap-5">
                    {uniqueSizesCapacity?.map((size: any, index) => {
                        const isSizeInSelect = itemValueCapacity?.some(
                            (selectItem: any) => selectItem.size === size
                        );
                        return (
                            <div
                                key={index}
                                className="flex items-center checked-button"
                            >
                                <label className="label-css">{size}GB</label>
                                <Checkbox
                                    value={size}
                                    onChange={() =>
                                        handleCheckboxCapacityChange(size)
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
                    {uniqueSizesColor?.map((color: any, index) => {
                        const isSizeInSelect = itemValueColor?.some(
                            (selectItem: any) => selectItem.color === color
                        );
                        return (
                            <div
                                key={index}
                                className="flex items-center checked-button"
                            >
                                <label className="label-css">{color}</label>
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
