import React from 'react'

//css
import "./MediaPlayer.css"

class MediaPlayer extends React.Component
{
    render()
    {
        return(<div class="playControls col-12 ">
                <section role="contentinfo" aria-label="miniplayer" class="playControls__inner d-flex justify-content-around">
                    <audio class="col-4" controls>
                        <source src={this.props.selectedAudio.song_link} type="audio/mpeg"/>
                    </audio>
                </section>
        </div>)
    }
}


export default MediaPlayer