import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import axios from 'axios'

import './PlaylistModal.css'


import PlaylistModalRow from './PlaylistModalRow'
class PlaylistModal extends PureComponent {
    
    state = {
        currentpage: "AddToPlaylist"
    }

    onClickFunction(e)
    {
       this.setState({currentpage: e.target.value})
    }

    renderUsersPlaylist()
    {
        return this.props.fetch_playlist.map((data)=> {
            return <PlaylistModalRow></PlaylistModalRow>
        })
    }
    
    renderPlayistNav()
    {
        return(<div className="container">
                            <div className="PlayistModal_Nav_Header d-flex flex-row justify-content-start">
                                <div className="library_header mt-4">
                                    <div className="library_label_group">   
                                        <button onClick={e=>{this.onClickFunction(e)}} value="AddToPlaylist" className={`btn  PlaylistModal_Label ${this.state.currentpage==("AddToPlaylist")? 'active': null}`}>Add To Playlist</button>
                                    </div>
                                </div>
                                <div className="library_header mt-4">
                                    <div className="library_label_group">   
                                        <button onClick={e=>{this.onClickFunction(e)}} value="CreateAPlaylist" className={`btn  PlaylistModal_Label ${this.state.currentpage==("CreateAPlaylist")? 'active': null}`}>Create New Playlist</button>
                                    </div>
                                </div>
                            </div>

                            <div>

                            </div>
                </div>)
    }

    componentDidMount()
    {

    }

    render() {
        return (<div class="modal fade" id="playlistModal" tabindex="-1" aria-labelledby="playlistModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-body">
                        {this.renderPlayistNav()}

                        <div className="d-flex flex-column">
                            {this.renderUsersPlaylist()}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        fetch_playlist: state.fetch_playlists_reducer
     };
}


export default connect(mapStateToProps, actions) (PlaylistModal)


