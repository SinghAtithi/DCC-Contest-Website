import React from 'react';
import Navbar from '../components/Navbar';
import TableSkeleton from '../skeleton/TableSkeleton';

const test = () => {
    return (
        <>
            <Navbar />

            <div className="content-area-top">
                <h1 id="contest-main-heading">CONTESTS</h1>
                <TableSkeleton rows={2} table_heading="Upcoming Contests" table_headers={["SL. NO.", "Contest Name", "Start", "Length", "Registration Closes in", "Action"]} />
                <TableSkeleton rows={2} table_heading="OngoingContests" table_headers={["SL. NO.", "Contest Name", "Start", "Length", "Contest Ends In", "Action"]} />
                <TableSkeleton rows={2} table_heading="PastContests" table_headers={["SL. No.", "Contest Name", "Start", "Length", "Actions"]} />
            </div>
        </>
    )

};


export default test;
