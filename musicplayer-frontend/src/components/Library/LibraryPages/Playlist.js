import React, { PureComponent } from 'react'
import CreatePlaylistModal from './components/CreatePlaylistModal'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import './Playlist.css'

class Playlist extends PureComponent {

    renderPlaylistRow()
    {
        try{
            return this.props.fetch_playlist.map((playlist) => {
               return(<div className="col-3 playlist-album-art">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <div className="col-12 mr-5">
                                    <span  className="upload-artwork-img">
                                        <img id="Playlist_Upload_Image" className="image" src={(playlist.playlist_art != null)?playlist.playlist_art:null}></img>
                                    </span>
                                </div>
                                <div className="col-12 text-center">
                                    <t6 >{playlist.playlist_name}</t6>
                                </div>
                            </div>
                        </div>)
             })
        }catch(err)
        {
            return null
        }
    }
    
    render() {
        return (<React.Fragment>
                
                <div className="d-flex flex-row  mt-5 d-flex justify-content-between">
                    <div>
                        <h6>Hear your own playlists and the playlists you’ve liked: </h6>
                    </div>
                    <div>
                        <button  data-bs-toggle="modal" data-bs-target="#CreatePlaylistModal"><i class="bi bi-plus-circle-fill"></i> New Playlist</button>
                    </div>
                </div>
                <div className="Playlist_Container container mt-5 mb-5">
                    <div className="row">
                        {this.renderPlaylistRow()}
                    </div>
                </div>
                <CreatePlaylistModal></CreatePlaylistModal>
            </React.Fragment>)
    }
}

function mapStateToProps(state) {
    return { 
      fetch_playlist: state.fetch_playlists_reducer
     };
}


export default connect(mapStateToProps, actions) (Playlist)
