import React, { PureComponent } from 'react'

export default class PlaylistModal extends PureComponent {
    render() {
        return (<div class="modal fade" id="playlistModal" tabindex="-1" aria-labelledby="playlistModalLabel" aria-hidden="false">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            <div class="modal-body">
                <div className="container">
                    <div className="PlayistModal_Nav d-flex flex-row">
                        <h2>
                            Add To Playlist
                        </h2>
                        <h2>
                            Create New Playlist
                        </h2>
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
        )
    }
}
