const QuestionSkeleton = () => {
    return (
        <div className="flex flex-col w-full justify-start ">
            <div className="flex flex-col w-full items-center justify-center">
                <div className="animated-background" style={{width: "70%", height: "25px"}}>
                    <p className="background-masker" ></p>
                </div>

                <div className="animated-background mt-1" style={{width: "40%", height: "25px"}}>
                    <p className="background-masker"></p>
                </div>

                <div className="animated-background mt-1" style={{width: "40%", height: "25px"}}>
                    <p className="background-masker"></p>
                </div>

                <div className="animated-background mt-4" style={{width: "100%", height: "30vh"}}>
                    <p className="background-masker"></p>
                </div>
            </div>

        </div>

    )
}
export default QuestionSkeleton;