
export default function TableSkeleton({ table_heading, table_headers, rows }) {
    return (
        <div id="contest-section">
            <h2 id="contest-heading">{table_heading}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full custom-table">
                    <thead>
                        <tr>
                            {table_headers.map((head) => (
                                <th>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: rows }, () => (
                            <tr>
                                {Array.from({ length: table_headers.length }, () => (<td className="skeleton-table-data"><div className="skeleton-table-item"></div></td>))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}