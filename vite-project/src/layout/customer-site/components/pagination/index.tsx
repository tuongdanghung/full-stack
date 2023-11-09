import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { PaginationInterface } from "../../../../interface/client";

const Pagination: React.FC<PaginationInterface> = (props) => {
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = props?.data?.slice(startIndex, endIndex);
        props.handlePage(currentPageData);
    }, [props.data, currentPage]);

    useEffect(() => {
        const initialData = props?.data?.slice(0, itemsPerPage);
        props.handlePage(initialData);
    }, [props.data]);

    const totalPages = Math.ceil(props?.data?.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            <div className="flex items-center gap-2">
                {pageNumbers.map((pageNumber) => (
                    <IconButton
                        key={pageNumber}
                        variant={
                            pageNumber === currentPage ? "outlined" : "text"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </IconButton>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
