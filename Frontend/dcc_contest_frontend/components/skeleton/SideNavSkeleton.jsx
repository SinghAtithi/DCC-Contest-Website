import React from 'react'

export default function SideNavSkeleton() {
    return (
        <>
            <div className="navbar-top-side">
                <div className="navbar-logo-side">
                    <div className="animated-background" style={{ width: "100px", height: "50px" }}></div>
                </div>
                <div className="custom-navbar-items">
                    <div className="animated-background mt-1" style={{ width: "50px", height: "50px", "border-radius": "50%" }}></div>
                </div>
                <div className="mr-2 side-navbar-hamburger">
                    <div className="animated-background" style={{ width: "50px", height: "50px", "border-radius": "0%" }}></div>
                </div>
            </div>
            <nav>
                <ul className="SideNav-container side-navbar-items-offscreen">
                    <li id="nav-li">
                        <div className="animated-background mr-2" style={{ width: "20%", height: "20px" }}></div>
                    </li>
                    {Array.from({ length: 2 }, (_, index) => (
                        <li id="nav-li" key={index}>
                            <span id="nav-items">
                                <span className="animated-background mt-1" style={{ width: "10%", height: "20px" }}></span>
                                <span className="animated-background mt-1" style={{ width: "90%", height: "20px" }}></span>
                            </span>
                        </li>
                    ))}

                    <li className="nav-divider">
                        <hr></hr>
                    </li>

                    <li id="nav-li">
                        <div className="animated-background mt-2" style={{ width: "50%", height: "20px" }}></div>
                    </li>
                    {Array.from({ length: 4 }, (_, index) => (
                        <li id="nav-li" key={index}>
                            <span id="nav-items">
                                <span className="animated-background mt-1" style={{ width: "10%", height: "20px" }}></span>
                                <span className="animated-background mt-1" style={{ width: "90%", height: "20px" }}></span>
                            </span>
                        </li>
                    ))}

                    <li className="nav-divider">
                        <hr></hr>
                    </li>
                    <li id="nav-li">
                        <div className="animated-background mt-2" style={{ width: "50%", height: "20px" }}></div>
                    </li>
                    {Array.from({ length: 6 }, (_, index) => (
                        <li id="nav-li" key={index}>
                            <span id="nav-items">
                                <span className="animated-background mt-1" style={{ width: "10%", height: "20px" }}></span>
                                <span className="animated-background mt-1" style={{ width: "90%", height: "20px" }}></span>
                            </span>
                        </li>
                    ))}

                </ul>
            </nav >

        </>
    )
}
