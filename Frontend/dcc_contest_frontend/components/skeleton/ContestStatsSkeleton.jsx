import React from 'react'

export default function ContestStatsSkeleton() {
    return (
        <div className='data-area'>
            <h2 className="stats-heading">Contest Details</h2>
            <div className='contest-stats p-2'>
                <div className="card-component">
                    <div className="animated-background mt-1" style={{ width: "100%", height: "120px" }}></div>
                </div>
                <div className="card-component">
                    <div className="animated-background mt-1" style={{ width: "100%", height: "120px" }}></div>
                </div>
                <div className="card-component">
                    <div className="animated-background mt-1" style={{ width: "100%", height: "120px" }}></div>
                </div>
                <div className="card-component">
                    <div className="animated-background mt-1" style={{ width: "100%", height: "120px" }}></div>
                </div>
            </div>

            <h2 className="stats-heading">Statistics</h2>
            <div className='contest-stats p-2'>
                <div className="card-component">
                <div className="animated-background mt-1" style={{ width: "100%", height: "120px" }}></div>
                </div>
                <div className="card-component">
                <div className="animated-background mt-1" style={{ width: "100%", height: "120px" }}></div>
                </div>
                <div className="card-component">
                <div className="animated-background mt-1" style={{ width: "100%", height: "120px" }}></div>
                </div>

            </div>

            <div className='contest-stats p-2'>
                <div className="card-component">
                    {/* <h2 className="stats-sub-heading">Question wise Submission</h2> */}
                    <div className="animated-background mt-1" style={{ width: "100%", height: "240px" }}></div>                </div>
                <div className="card-component">
                    {/* <h2 className="stats-sub-heading">Question wise Acceptance rate</h2> */}
                    <div className="animated-background mt-1" style={{ width: "100%", height: "240px" }}></div>                </div>

            </div>
            <div className='contest-stats p-2'>
                <div className="card-component">
                    {/* <h2 className="stats-sub-heading">Time wise Submission Stats</h2> */}
                    <div className="animated-background mt-1" style={{ width: "100%", height: "480px" }}></div>
                </div>
            </div>
        </div>
    )
}
