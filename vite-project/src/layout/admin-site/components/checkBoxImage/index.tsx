import React, { useEffect, useState } from "react";
import { MdRemoveCircleOutline } from "react-icons/md";
import {
    apiCreateImage,
    apiDeleteImage,
    apiUpdateImage,
} from "../../../../apis";
import "./index.scss";
type Props = {
    image: any;
    handleUpdateImage(id: any): void;
    id: number;
};

const CheckBoxImage: React.FC<Props> = (props: any) => {
    const [image, setImage] = useState<any>(props.image);
    useEffect(() => {
        setImage(props.image);
    }, [props.image]);

    const handleDelete = async (id: number) => {
        await apiDeleteImage(id);
        props.handleUpdateImage(id);
    };

    const handleFileChange = (id: number) => {
        return async (event: React.ChangeEvent<HTMLInputElement>) => {
            const formData = new FormData();
            const files = event.target.files;
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formData.append("src", files[i]);
                }
                try {
                    await apiUpdateImage(formData, id);
                    props.handleUpdateImage(id);
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        };
    };
    const handleAddFileChange = () => {
        return async (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;
            const newData = {
                productId: props.id,
                src: files,
            };

            const formData = new FormData();
            for (let i of Object.entries(newData)) formData.append(i[0], i[1]);
            if (newData.src) {
                for (let img of newData.src) formData.append("src", img);
                try {
                    await apiCreateImage(formData);
                    props.handleUpdateImage(1);
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        };
    };
    return (
        <div className="mt-4 border border-separate rounded-lg p-4 ">
            <div className="grid grid-cols-5 gap-3 relative">
                {image?.map((item: any, index: number) => {
                    return (
                        <div key={index} className="h-[157px]">
                            <img
                                src={item.src}
                                style={{ width: "114px", height: "114px" }}
                            />
                            <button
                                className="absolute top-1 text-white text-2xl hover:text-red-600"
                                onClick={() => handleDelete(item.id)}
                            >
                                <MdRemoveCircleOutline />
                            </button>
                            <input
                                className="mt-4 w-[120px]"
                                type="file"
                                id="file-upload-button"
                                onChange={(event) =>
                                    handleFileChange(item.id)(event)
                                }
                                multiple
                            />
                        </div>
                    );
                })}
                <div className="w-[114px] h-[114px] border border-collapse">
                    <img
                        src="https://w7.pngwing.com/pngs/268/723/png-transparent-add-and-files-folder-folders-files-and-folders-icon-thumbnail.png"
                        alt=""
                    />
                    <input
                        className="w-[112px] mt-[69px]"
                        id="file-upload-button"
                        type="file"
                        onChange={handleAddFileChange()}
                        multiple
                    />
                </div>
            </div>
        </div>
    );
};
export default CheckBoxImage;
