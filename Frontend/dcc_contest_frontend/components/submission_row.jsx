import { useRouter } from 'next/router';
import React from 'react';


const submissionRow = {
    "border-radius" : "5px",
    "box-shadow": "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
}



export default function SubmissionRow(props){
    const router = useRouter();
    return(
        <div className="dashboard_submission_row" style={submissionRow} onClick={()=>{
            router.push(`/submissions/${props.submission_id}`);
        }}> 
            <div>{props.index + 1}</div>
            <div>{props.ques_no}</div>
            <div className='col-span-2'>{props.submission_time}</div>
            <div className='col-span-2'>{props.verdict}</div>
        </div>
    )
}