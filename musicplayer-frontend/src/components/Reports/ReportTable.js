import React from 'react'

const ReportTable = () => {
        const columns = React.useMemo(() => [
            {
                Header: 'Column 1',
                accessor: 'col1',
            },
            {
                Header: 'Column 2',
                accessor: 'col2'
            }
        ], [])
        


    return (
        <div>
            
        </div>
    )
}

export default ReportTable
