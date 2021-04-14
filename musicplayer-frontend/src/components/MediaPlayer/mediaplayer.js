import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

//css
import "./MediaPlayer.css"

class MediaPlayer extends React.Component
{   
    
    playSong = () =>  {
        let audio = document.getElementById('audio');
        audio.play()
        
    }

    
    renderAudio()
    {
        if(this.props.selectedAudio)
        return(<div class="mediaplayer_container col-12 ">
                <section role="contentinfo" aria-label="miniplayer" class="playControls__inner  d-flex flex-row justify-content-center align-items-center">
                    <audio id="audio" src={this.props.selectedAudio.song_link} ></audio>
                    <div className="mediaplayer_navigation col-2 d-flex flex-row justify-content-end">
                        <button><i class="bi bi-skip-backward-fill"></i></button>
                        <button onClick={() => this.playSong()} ><i class="bi bi-play-fill"></i></button>
                        <button><i class="bi bi-skip-forward-fill"></i></button>
                        <button><i class="bi bi-shuffle"></i></button>
                        <button><i class="bi bi-arrow-repeat"></i></button>
                        <button><i class="bi bi-volume-down-fill"></i></button>
                    </div>
                    <div className="col-4 d-flex flex-row  align-items-center">
                        <t6 className="mediaplayer_timer">0:00</t6>
                        <div class="mediaplayer_progress_container" id="mediaplayer_progress_container">
                            
                            <div class="mediaplayer_progress" id="mediaplayer_progress"></div>
                            
                        </div>
                        <t6 className="mediaplayer_timer">0:00</t6>
                    </div>
                    
                    <div className="col-3 d-flex flex-row mediaplayer_info">
                        <div className="mediaplayer_audio_image_container">
                            <img alt="music_cover" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg" classname="media_image_cover" id="media_image_cover"></img>
                        </div>
                        <div className="flex-column mediaplayer_info_text">
                            <div>
                                <t5 id="mediaplayer_artist truncate">{this.props.selectedAudio.username}</t5>
                                <h6 className="truncate" id="mediaplayer_title">{this.props.selectedAudio.title}</h6>
                            </div>
                        </div>
                            
                        <div>

                        </div>
                    </div>

                    <div className="mediaplayer_extra col-3 d-flex flex-row">
                        <button><i class="bi bi-heart-fill"></i></button>
                        <button><i class="bi bi-person-plus-fill"></i></button>
                        <button><i class="bi bi-music-note-list"></i></button>
                    </div>
                    
                </section>
            </div>)
        else
            return(<div class="mediaplayer_container col-12 ">
            <section role="contentinfo" aria-label="miniplayer" class="playControls__inner  d-flex flex-row justify-content-center align-items-center">
                <audio id="audio" ></audio>
                <div className="mediaplayer_navigation col-2 d-flex flex-row justify-content-end">
                    <button><i class="bi bi-skip-backward-fill"></i></button>
                    <button onClick={() => this.playSong()} ><i class="bi bi-play-fill"></i></button>
                    <button><i class="bi bi-skip-forward-fill"></i></button>
                    <button><i class="bi bi-shuffle"></i></button>
                    <button><i class="bi bi-arrow-repeat"></i></button>
                    <button><i class="bi bi-volume-down-fill"></i></button>
                </div>
                <div className="col-4">
                    <div class="mediaplayer_progress_container" id="mediaplayer_progress_container">
                        <h6>0:00</h6>
                        <div class="mediaplayer_progress" id="mediaplayer_progress"></div>
                        <h6>0:00</h6>
                    </div>
                </div>
                
                <div className="col-3 d-flex flex-row mediaplayer_info">
                    <div className="mediaplayer_audio_image_container">
                        <img alt="music_cover" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg" classname="media_image_cover" id="media_image_cover"></img>
                    </div>
                    <div className="flex-column mediaplayer_info_text">
                        <div>
                            <t5 id="mediaplayer_artist truncate">Artist</t5>
                            <h6 className="truncate" id="mediaplayer_title">Title asdfasdfasdfasdfa sfasdfasdf asasdfasdfasfafafasfsd</h6>
                        </div>
                    </div>
                        
                    <div>

                    </div>
                </div>

                <div className="mediaplayer_extra col-3 d-flex flex-row">
                    <button><i class="bi bi-heart-fill"></i></button>
                    <button><i class="bi bi-person-plus-fill"></i></button>
                    <button><i class="bi bi-music-note-list"></i></button>
                </div>
                
            </section>
        </div>)
    }

   
    render()
    {
        return (<React.Fragment>
            {this.renderAudio()}
        </React.Fragment>)
    }
}

function mapStateToProps(state) {
    return { 
      selectedAudio: state.selected_audio_reducer
     };
}

export default connect(mapStateToProps, actions) (MediaPlayer)