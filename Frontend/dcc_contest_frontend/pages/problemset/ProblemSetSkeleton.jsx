import React from 'react';
import TableSkeleton from '../../skeleton/TableSkeleton';

export default function ProblemSetSkeleton() {
  return (
    <div className="mx-4">
      <div className="text-3xl m-4 flex items-center justify-center font-serif">
        Problem Set
      </div>
      <TableSkeleton rows={3} table_headers={["", "#", "Name", "Topics", "Action"]} />
      <PageButtonSkeleton />
    </div>
  )
}

function PageButtonSkeleton() {
  return (
    <div className="my-2 flex justify-center">
      <div className='skeleton-button'></div>
      <div className='skeleton-button'></div>
      <div className='skeleton-button'></div>
    </div>
  )
}
