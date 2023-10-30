import React, { ChangeEvent, useEffect, useState } from "react";
import { getBase64 } from "../../utils/helper";
import { apiCreateProduct } from "../../../../apis";
const Context = () => {
    const [title, setTitle] = useState<any>("xxxxx");
    const [price, setPrice] = useState<any>(100004);
    const [description, setDescription] = useState<any>("xxxxx");
    const [category, setCategory] = useState<any>("xxxxx");
    const [brand, setBrand] = useState<any>("xxxxx");
    const [color, setColor] = useState<any>([
        { color: "red" },
        { color: "green" },
    ]);
    const [ram, setRam] = useState<any>([{ size: 32 }, { size: 64 }]);
    const [capacity, setCapacity] = useState<any>([{ size: 32 }, { size: 64 }]);
    const [watch, setWatch] = useState<any>("listen");
    const [file, setFile] = useState<any>([]);
    const [image, setImage] = useState<any>([]);
    const handleSubmit = async () => {
        const data = {
            title,
            description,
            price,
            category,
            brand,
            ram: JSON.stringify(ram),
            capacity: JSON.stringify(capacity),
            color: JSON.stringify(color),
        };
        const formData = new FormData();
        for (let i of Object.entries(data)) formData.append(i[0], i[1]);
        for (let img of image) formData.append("image", img);
        const response = await apiCreateProduct(formData);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files);
        setImage(event.target.files);
        toBase64(event.target.files);
    };

    const toBase64 = async (watch: any) => {
        const newFileArray = [];
        if (watch !== "listen") {
            for (let item of watch) {
                const base64Data = await getBase64(item);
                newFileArray.push({ name: item.name, image: base64Data });
            }
        }
        setFile(newFileArray);
    };

    useEffect(() => {
        toBase64(watch);
    }, [watch]);
    const handleDelete = (name: string) => {
        if (file?.some((fileItem: any) => fileItem.name === name)) {
            const updatedFile = file.filter(
                (fileItem: any) => fileItem.name !== name
            );
            setFile(updatedFile);
        }
    };
    return (
        <div>
            title
            <input type="text" />
            Price
            <input type="number" />
            desc
            <input type="desc" />
            title
            <input type="text" />
            category
            <input type="text" />
            brand
            <input type="text" />
            category
            <input onChange={handleFileChange} type="file" multiple />
            <button onClick={handleSubmit}>han</button>
            <div>
                {file && Array.isArray(file) && file.length > 0 && (
                    <div>
                        {file.map((item: any, index: number) => (
                            <div>
                                <img
                                    key={index}
                                    width={100}
                                    src={item.image}
                                    alt=""
                                />
                                <button onClick={() => handleDelete(item.name)}>
                                    delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Context;
