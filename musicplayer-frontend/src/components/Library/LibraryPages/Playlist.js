import React, { PureComponent } from 'react'

class Playlist extends PureComponent {

    

    render() {
        return (<React.Fragment>
                
                <div className="d-flex col-12 flex-column align-items-center">
                <div>
                    <h6>Hear your own playlists and the playlists you’ve liked: </h6>
                </div>
                    <div>
                        <button className="btn btn-outline-dark"><i class="bi bi-plus-circle-fill"></i> New Playlist</button>
                    </div>
                </div>
            </React.Fragment>)
    }
}

export default Playlist
