import React from 'react'
import axios from 'axios'

import SimpleAudioContainer from '../containers/SimpleAudioContainer'

import "./Overview.css"

class Overview extends React.Component
{
    
    state={
        songs: []
    }

    componentDidMount()
    {
        let result = axios.get('/api/get/tracks')
        result.then(songs => {
            this.setState({songs:songs.data})
        })
    }

    renderSongItems()
    {
        return this.state.songs.map((song, index) => {
            return (<SimpleAudioContainer id={index} song={song}></SimpleAudioContainer>)
        }) 
    }
   

    render()
    {
        return(<div>
            <div>
                <h2 className="sub_titles" onClick={() => this.props.updateCurrentPage("tracks")}>Tracks</h2>
                <div className="wrapper pb-4">
                    {this.renderSongItems()}
                </div>
            </div>
        </div>)
    }
}


export default Overview