const QuestionSkeleton = () => {
    return (
        <div className="flex flex-col w-full justify-start ">
            <div className="flex flex-col w-full items-center justify-center">
                <div className="animated-background mt-1" style={{width: "70%", height: "30px"}}></div>
                <div className="animated-background mt-1" style={{width: "40%", height: "20px"}}></div>
                <div className="animated-background mt-1" style={{width: "30%", height: "20px"}}></div>
            </div>
            <br></br>
            <br></br>
            <div className="flex flex-col w-full">
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>

                <br></br>
                <div className="animated-background mt-1" style={{width: "35%", height: "30px"}}></div>
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>

                <br></br>
                <div className="animated-background mt-1" style={{width: "35%", height: "30px"}}></div>
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>

                <br></br>
                <div className="animated-background mt-1" style={{width: "35%", height: "30px"}}></div>
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>
                
                <br></br>
                <div className="animated-background mt-1" style={{width: "35%", height: "30px"}}></div>
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>
                <div className="animated-background mt-1" style={{width: "100%", height: "20px"}}></div>
            </div>

        </div>

    )
}
export default QuestionSkeleton;