import { useState } from "react";
import * as XLSX from "xlsx";
import { apiCreateUer } from "../../../../apis";
import { GetAllUsersByAdmin } from "../../../../store/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { Button } from "@material-tailwind/react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const ExcelImporter = (props: any) => {
    const [convertedData, setConvertedData] = useState<any[]>([]);

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const convertedData = convertExcelDataToObject(jsonData);
            setConvertedData(convertedData);
        };
        reader.readAsBinaryString(file);
    };

    const convertExcelDataToObject = (data: any[]) => {
        const headers = data[0];
        const userData = data.slice(1);

        const convertedData: any[] = [];

        userData.forEach((userValues: any) => {
            const userObject: any = {};
            headers.forEach((header: any, index: any) => {
                const key = header.toLowerCase();
                userObject[key] = userValues[index];
            });
            convertedData.push(userObject);
        });

        return convertedData;
    };
    const handleClick = async () => {
        const dispatch = useDispatch<AppDispatch>();
        const newArray = convertedData?.filter(
            (item) =>
                !props?.data?.some(
                    (element: any) => element.email === item.email
                )
        );

        for (const item of newArray) {
            const data = {
                firstName: item.firstname,
                lastName: item.lastname,
                email: item.email,
                password: item.password ? item.password : 123456,
            };
            const response = await apiCreateUer(data);
            if (response.status === 200) {
                dispatch(GetAllUsersByAdmin(null));
            }
        }
    };

    return (
        <div>
            <input
                className=" w-[100px] h-[50px] mx-3"
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
            />
            <Button
                className="text-white mt-[-4px] font-bold px-6 py-3 rounded text-lg bg-green-500 hover:bg-green-700"
                onClick={handleClick}
            >
                <AiOutlineCloudUpload />
            </Button>
        </div>
    );
};

export default ExcelImporter;
