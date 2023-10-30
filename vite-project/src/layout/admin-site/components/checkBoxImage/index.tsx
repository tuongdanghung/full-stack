import React, { ChangeEvent, useEffect, useState } from "react";
import { MdRemoveCircleOutline } from "react-icons/md";

type Props = {
    image: any;
    changeValueImage: any;
};

const CheckBoxImage: React.FC<Props> = (props) => {
    const [image, setImage] = useState(props.image);
    useEffect(() => {
        setImage(props.image);
        props.changeValueImage(props.image);
    }, [props.image]);
    const handleClick = (index: number) => {
        const deleteIem = [...image];
        deleteIem.splice(index, 1);
        props.changeValueImage(deleteIem);
        setImage(deleteIem);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            props.changeValueImage({ image, files });
            setImage([
                ...image,
                ...Array.from(files).map((file) => ({ image: file.name })),
            ]);
        }
    };
    return (
        <div className="mt-4 border border-separate rounded-lg p-4 ">
            <div className="grid grid-cols-5 gap-3 relative">
                {image?.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            style={{ width: "100px", height: "100px" }}
                        >
                            <img
                                src={
                                    item._id
                                        ? item.image
                                        : `../../../../../public/asset/image/product/${item.image}`
                                }
                                style={{ width: "100%", height: "100%" }}
                            />
                            <button
                                className="absolute top-1 text-white text-2xl hover:text-red-600"
                                onClick={() => handleClick(index)}
                            >
                                <MdRemoveCircleOutline />
                            </button>
                        </div>
                    );
                })}
            </div>
            <input
                className="rounded mt-4"
                type="file"
                onChange={handleFileChange}
                multiple
            />
        </div>
    );
};
export default CheckBoxImage;
