import React from 'react'

import Banner from '../../Banner/Banner'
import AudioTable from '../../AudioTable/AudioTable'
import { Link } from 'react-router-dom';


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
                <div className="col-12 Track_Footer d-flex flex-column align-items-center">
                    <h3>
                        More uploads =  More Listener 
                    </h3>
                    <Link to="/upload">
                        <button className="btn btn-outline-dark">Upload More</button>
                    </Link>
                </div>
            </React.Fragment>)
    }
}


export default Tracks