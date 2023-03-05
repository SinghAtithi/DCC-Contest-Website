import Navbar from "../components/Navbar";

const problems = [
    {
        name: "abc",
        ques_no: 1,
        topics: "a b c",
        ques_status: false,
    },
    {
        name: "abc",
        ques_no: 1,
        topics: "d e f",
        ques_status: false,
    },
    {
        name: "abc",
        ques_no: 1,
        topics: "g h i",
        ques_status: true,
    },
    {
        name: "abc",
        ques_no: 1,
        topics: "j k l",
        ques_status: false,
    },
    {
        name: "abc",
        ques_no: 1,
        topics: "m n o",
        ques_status: false,
    },
    {
        name: "abc",
        ques_no: 1,
        topics: "p q r",
        ques_status: false,
    },
    {
        name: "abc",
        ques_no: 1,
        topics: "s t u",
        ques_status: true,
    }
]

export default function test() {
    return (
        <>
            <Navbar />
            <div className="TableDiv bg-white">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ques No</th>
                            <th>Topics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem, index) => (
                            <tr className="hover" onClick={()=>{
                                alert(`Hello from ${index}`);
                            }}>
                                <td>{problem.name}</td>
                                <td>{problem.ques_no}</td>
                                <td>{problem.topics}</td>
                                

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>

    )
}