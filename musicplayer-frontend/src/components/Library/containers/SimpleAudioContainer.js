import React from 'react'
import './SimpleAudioContainer.css'


class SimpleAudioContainer extends React.Component
{
    state={
        mouse_in: false
    }

    render()
    {
        // return(<div className="badge_items">
        //     <div className="audio_artwork">
        //         <span class="sc-artwork sc-artwork-placeholder-3  
        //         image__full g-opacity-transition"  aria-role="img">
        //             <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg"></img>
        //         </span>
        //     </div>
        //     <div className="audio_description">

        //     </div>
        // </div>)

        return(
            <div class="badge_items mr-3">
                <div className="audio_artwork" onMouseEnter={() => this.setState({mouse_in:true})} onMouseLeave={() => this.setState({mouse_in:false})}>
                    
                    <span class="sc-artwork sc-artwork-placeholder-3  
                    image__full g-opacity-transition"  aria-role="img">
                        <img className="audio_image" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg"></img>
                    </span>

                    {
                        (this.state.mouse_in)?
                        <div className="playbutton">
                            <a>
                                <i class="bi bi-play-circle-fill"></i>
                                {/* <i class="bi bi-pause-circle-fill"></i> */}

                            </a>
                         </div>:null

                    }
                    
                </div>


                <div className="audio_description">
                    <t5 class="song_heading">Lights</t5>
                    <div className="playableTile__usernameHeadingContainer">
                        <t6>Han Solo</t6>
                    </div>
                </div>
            </div>
        )
    }
}

export default SimpleAudioContainer