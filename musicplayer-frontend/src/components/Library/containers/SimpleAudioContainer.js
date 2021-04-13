import React from 'react'
import './SimpleAudioContainer.css'

import {connect} from 'react-redux'
import {selectSong} from '../../../store/actions'

class SimpleAudioContainer extends React.Component
{
    state={
        mouse_in: false
    }

    render()
    {
        return(
            <div class="badge_items mr-3" key={this.props.id}>
                <div className="audio_artwork" onMouseEnter={() => this.setState({mouse_in:true})} onMouseLeave={() => this.setState({mouse_in:false})}>
                    
                    <span class="sc-artwork sc-artwork-placeholder-3  
                    image__full g-opacity-transition"  aria-role="img">
                        <img className="audio_image" src={this.props.song.song_image}></img>
                    </span>

                    {
                        (this.state.mouse_in)?
                        <div className="playbutton">
                            <a onClick={() => this.props.selectSong(this.props.song)}>
                                <i class="bi bi-play-circle-fill"></i>
                                {/* <i class="bi bi-pause-circle-fill"></i> */}

                            </a>
                         </div>:null

                    }
                    
                </div>


                <div className="audio_description">
                    <t5 className="song_heading truncate">{this.props.song.title}</t5>
                    <div className="playableTile__usernameHeadingContainer">
                        <t6>{this.props.song.username}</t6>
                    </div>
                </div>
            </div>
        )
    }
}



export default connect(null, {selectSong}) (SimpleAudioContainer)