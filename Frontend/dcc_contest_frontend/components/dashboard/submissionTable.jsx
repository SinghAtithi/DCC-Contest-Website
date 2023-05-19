export default function SubmissionTableDashboard(props) {

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Submitted At</th>
              <th>Name</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {props.data && props.data.length != 0 ? props.data.map((submission, index) => (
              <tr key={submission._id} className="hover cursor-pointer">
                <th>{index + 1}</th>
                <td>{submission.time_stamp}</td>
                <td>{submission.ques_name}</td>
                {submission.verdict === "Accepted" ? <td className="text-green-600">{submission.verdict}</td> : <td className="text-red-700">{submission.verdict}</td>}
              </tr>
            )) : <tr>
              <th>-</th>
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