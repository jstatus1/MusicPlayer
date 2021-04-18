import React, { PureComponent } from 'react'

import './PlaylistModalRow.css'

export default class PlaylistModalRow extends PureComponent {

    render() {
        return (
                <React.Fragment>
                    <div className="PlaylistModalRow"> 
                        <div className="d-flex flex-row">
                            <div className="col-2 PlaylistModalRow-Image-Container ">
                                <img className="PlaylistModalRow-Image-Image" src={this.props.playlist.playlist_art}></img>
                            </div>
                            <div className="col-6">
                            <t6>{this.props.playlist.playlist_name}</t6>
                                
                            </div>
                            <div className="col-4">
                                <button>Add To Playlist</button>
                            </div>
                        </div>
                    
                        <hr></hr>
                    </div>
                </React.Fragment>
        )
    }
}
