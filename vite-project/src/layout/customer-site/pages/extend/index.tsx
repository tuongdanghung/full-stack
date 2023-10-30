import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";
import Brand from "../../components/layout/Brand";
const Extend = () => {
    return (
        <div>
            <Header />
            <div className="max-w-[1400px] m-auto mt-6">
                <div className="flex flex-row gap-7">
                    <div className="left-content basis-1/5 relative">
                        <Brand />
                    </div>
                    <div className="content basis-4/5">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Extend;
