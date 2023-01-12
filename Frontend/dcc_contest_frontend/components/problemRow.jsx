import Link from "next/link";

const ProblemRow=({props})=>{
    return(
        <>
            <div className="border grid grid-cols-6 gap-4 justify-between items-center h-22 py-4 border-gray-500">
                {/* <div style={{"boxShadow": "green 0px 30px 60px -12px inset, lightGreen 0px 18px 36px -18px inset"}} className="px-6 text-left">{props.ques_no}</div> */}
                <div className="px-6 text-left">{props.ques_no}</div>
                <div className="col-span-3 px-6">{props.name}</div>
                <div className="px-6">{props.topics}</div>
                <Link href={`/problems/${props.ques_no}`} target= "_blank">
                <div className="px-6  max-w-sm  ">
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