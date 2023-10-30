import React from "react";

const Required = (props: any) => {
    return (
        <div>
            {props.valid === true ? (
                <span className="invalid text-red-500 block mt-2 italic text-[14px]">
                    {" "}
                    {props.keywords} required
                </span>
            ) : null}
        </div>
    );
};

export default Required;
