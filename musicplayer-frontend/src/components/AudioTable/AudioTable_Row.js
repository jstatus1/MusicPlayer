import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

class AudioTable_Row extends PureComponent {

    state={
        mouse_in: false,
        current_songPlaying: false
    }

    secondsToHms(d) {

        d = Number(d);
    
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        
        
        return (d < 3600)? ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2) :
        ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }

    audioLogic()
    {
        console.log(this.props.audioSetting)
        this.props.selectSong(this.props.song)
        if(this.state.current_songPlaying)
        {
            
            this.setState({current_songPlaying:false})
            this.props.setAudio(false)
        }else{
            
            this.setState({current_songPlaying:true})
            this.props.setAudio(true)
        }
    }


    render() {
        return(<tr key={this.props.id} className="AudioTable_Row  align-item-center" 
                    onClick={() => this.audioLogic()}
                    onMouseEnter={() => this.setState({mouse_in: true})} 
                    onMouseLeave={() => this.setState({mouse_in: false})} >
                    <td><i class="bi bi-heart"></i></td>
                    <td>
                        <div className="AudioTable_Audio_Artwork">
                        <img className="AudioTable_Audio_Image" src={this.props.song.song_image}></img>
                            {
                                (this.state.mouse_in)?
                                <div className="AudioTable_Playbutton">
                                    <a onClick={() => this.audioLogic()}>
                                        {(this.props.selectedAudio == this.props.song && this.props.audioSetting)?
                                        <i class="bi bi-pause-circle-fill"></i>:
                                        <i class="bi bi-play-circle-fill"></i>
                                        }
                                    </a>
                                </div>:null

                            }
                        </div>
                    </td>
                    <td>{this.props.song.title}</td>
                    <td>{this.props.song.username}</td>
                    <td>{this.props.song.album_title}</td>
                    <td>{this.props.song.release_date}</td>
                    <td>{this.secondsToHms(this.props.song.duration)}</td>
                </tr>)
    }
}


function mapStateToProps(state) {
    return { 
        selectedAudio: state.selected_audio_reducer,
        audioSetting: state.set_audio_reducer,
        fetch_track: state.fetch_track_reducer
     };
}


export default connect(mapStateToProps, actions)(AudioTable_Row)
