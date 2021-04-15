import React from 'react'

import Banner from '../../Banner/Banner'
import AudioTable from '../../AudioTable/AudioTable'
import "./Tracks.css"

class Tracks extends React.Component
{
   
    render()
    {
        return(<React.Fragment>
                <Banner></Banner>
                <div className="col-12 ">
                    <AudioTable></AudioTable>
                </div>
            </React.Fragment>)
    }
}


export default Tracks