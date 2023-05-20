import React from 'react'

export default function CreateContestSkeleton() {
    return (
        <div className="data-area">
            <div className="contest_container">
                <div className="contest_details_area">
                    <div id="contest_area_section">
                        <div className="animated-background mt-1" style={{ width: "30%", height: "30px" }}></div>
                        <div className="animated-background mt-2" style={{ width: "50%", height: "10px" }}></div>
                        <div className="animated-background mt-1" style={{ width: "40%", height: "10px" }}></div>
                        <div className="animated-background mt-1" style={{ width: "100%", height: "45px" }}></div>
                    </div>
                    <br />
                    <div id="contest_area_section">
                        <div className="animated-background mt-1" style={{ width: "30%", height: "30px" }}></div>
                        <div className="animated-background mt-1" style={{ width: "100%", height: "45px" }}></div>
                    </div>
                    <br />
                    <div id="contest_area_section">
                        <div className="animated-background mt-1" style={{ width: "30%", height: "30px" }}></div>
                        <div className="animated-background mt-2" style={{ width: "50%", height: "10px" }}></div>
                        <div className="animated-background mt-1" style={{ width: "100%", height: "45px" }}></div>
                    </div>
                    <br />
                    <div id="contest_area_section">
                        <div className="animated-background mt-1" style={{ width: "30%", height: "30px" }}></div>
                        <div className="animated-background mt-1" style={{ width: "100%", height: "45px" }}></div>
                    </div>
                    <br />
                    <div id="contest_area_section">
                        <div className="animated-background mt-1" style={{ width: "30%", height: "30px" }}></div>
                    </div>

                </div>
                <div className="add_problem_area">
                    <div className="flex flex-col w-full items-center justify-center">
                        <div className="animated-background mt-1" style={{ width: "40%", height: "30px" }}></div>
                        <div className="animated-background mt-1" style={{ width: "70%", height: "20px" }}></div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="flex flex-col w-full items-center justify-center">
                        <div className="animated-background mt-1" style={{ width: "40%", height: "30px" }}></div>
                        <div className="animated-background mt-1" style={{ width: "70%", height: "20px" }}></div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
