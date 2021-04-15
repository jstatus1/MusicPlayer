import React from 'react'
import axios from 'axios'

import SimpleAudioContainer from '../containers/SimpleAudioContainer'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import "./Overview.css"

class Overview extends React.Component
{
    
    

    componentDidMount()
    {

    }

    renderSongItems()
    {
       
        return this.props.fetch_track.map((song, index) => {
            return (<SimpleAudioContainer id={index} song={song}></SimpleAudioContainer>)
        }) 
        
    }
   

    render()
    {
        return(<div>
           { (this.props.fetch_track)?
                <div>
                    <h2 className="sub_titles">Tracks</h2>
                    <div className="wrapper pb-4">
                        {this.renderSongItems()}
                    </div>
                </div>:null
            }
        </div>)
    }
}

function mapStateToProps(state) {
    return { 
      fetch_track: state.fetch_track_reducer
     };
}


export default connect(mapStateToProps, actions)(Overview)