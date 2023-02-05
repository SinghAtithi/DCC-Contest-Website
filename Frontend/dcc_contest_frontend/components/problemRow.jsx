import Link from "next/link";
import React, { useEffect } from "react";
// import { CgToggleOff } from "react-icons/cg";
// import { CgToggleOn } from "react-icons/cg";
const ProblemRow = ({ props }) => {
    const [status, setStatus] = React.useState("False");
    useEffect(() => {
        // setStatus(props.ques_status);
        setStatus("False");
    })

    return (
        <>
            <div className="border-b-2 border-slate-500 grid grid-cols-7 h-20 gap-4 justify-between items-center py-1 text-slate-50">
                {status == "True" ? <div className="px-6 text-left">
                    <input type="checkbox" checked className="checkbox checkbox-success" disabled />
                </div>
                    : <div className="px-6 text-left">


                        <input type="checkbox" className="checkbox" disabled />
                    </div>}
                <div className="px-6 text-left">{props.ques_no}</div>
                <div className="col-span-3 px-6  hover:text-green-500">{props.name}</div>
                <div className="px-6">{props.topics}</div>
                <Link href={`/problems/${props.ques_no}`} target="_blank">
                    <div className="px-2">
                        <button className="btn btn-outline btn-success w-40">
                            Solve{" "}
                        </button>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ProblemRow;