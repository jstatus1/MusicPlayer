import React, {useState} from 'react'

const Reports = () => {
    const [MockList, setMockList] = useState([{name:'testN', musician:'testM'}]); {
        return (
            <div clasasName="container">
                <h1>Playlist Table</h1>
                <table>
                    <thead>
                        <tr>
                            <th>First Playlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MockList.map(item => {

                            return <>
                                <t2>
                                    {item.name}
                                    {item.musician}
                                </t2>
                            </>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Reports
