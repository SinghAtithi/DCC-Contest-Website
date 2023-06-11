import { useState } from "react";
import ViewSubmissionModal from "./ViewSubmissionModal";

export default function SubmissionTable(props) {

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [ques_name, setQuesName] = useState("");
  const [code_error, setCodeError] = useState("");

  return (
    <>
      <ViewSubmissionModal open={open} setOpen={setOpen} code={code} ques_name={ques_name} code_error={code_error} test={"/mnt"}/>
      <div className="overflow-x-auto">
        <table className="table w-full custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Submitted At</th>
              <th>Name</th>
              <th>Verdict</th>
              <th>Time Taken</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.data && props.data.length != 0 ? props.data.map((submission, index) => (
              <tr key={submission._id} className="hover cursor-pointer">
                <th>{index + 1}</th>
                <td>{submission.time_stamp}</td>
                <td>{submission.ques_name}</td>
                {submission.verdict === "Accepted" ? <td className="text-green-600">{submission.verdict}</td> : <td className="text-red-700">{submission.verdict}</td>}
                {["Accepted", "Time Limit Exceeded"].includes(submission.verdict) ? <td>{parseFloat(submission.time_taken).toFixed(3)}{" ms"}</td> : <td>N/A</td>}
                <td>
                  <button className="btn btn-outline btn-info w-40 min-h-8 h-8" onClick={() => {
                    setCode(submission.code);
                    setCodeError(submission.error);
                    setQuesName(submission.ques_name);
                    setOpen(true);
                  }}>
                    View Details
                  </button>
                </td>
              </tr>
            )) : <tr>
              <th>-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}