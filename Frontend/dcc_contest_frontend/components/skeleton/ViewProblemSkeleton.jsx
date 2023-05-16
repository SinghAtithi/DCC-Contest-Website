import React from 'react'

export default function ViewProblemSkeleton() {
    return (
        <div className="admin-container">
            <div className="data-area">
                <div className="view-problem-container">
                    <div className="search-bar-container">
                        <div className="search-bar-filter">
                            <div className="animated-background" style={{ width: "100%", height: "48px" }}></div>
                        </div>
                        <div className="search-bar-text-area">
                            <div className="animated-background" style={{ width: "100%", height: "48px" }}></div>
                        </div>
                        <div className="search-bar-icon">
                            <div className="animated-background" style={{ width: "100%", height: "48px" }}></div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="animated-background" style={{ width: "31%", height: "58px" }}></div>
                    </div>

                </div>
            </div>
        </div>
    )
}
