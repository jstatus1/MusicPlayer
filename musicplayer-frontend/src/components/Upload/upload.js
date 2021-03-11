import React, {Component} from 'react'
import './upload.css'


class Upload extends React.Component
{
    state = {
        uploadedSong: []
    }

    musicUpload = (e) => {
        this.setState({uploadedSong: e.target.files})
    }

    render()
    {
        return(<React.Fragment>
        <div className=" row div-wrapper justify-center align-items-center">
            <div className="col-12">
            <h2>Drag Or Drop Track or Song Here:</h2>
            </div>
            <div class="col-12">
                    <input
                        type='file'
                        className="inputFiles"
                        id='uploadFiles'
                        accept="audio/*"
                        onChange={e => this.musicUpload(e)}
                        multiple
                        /> 
            </div>
            <div className="col-12">
                <form>
                    <h2>Privacy:</h2>
                    <div class="form-check">
                        <label class="form-check-label" for="flexRadioDefault1">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                            Public
                        </label>
                        </div>
                        <div class="form-check">
                        <label class="form-check-label" for="flexRadioDefault2">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                            Private
                        </label>
                    </div>
                </form>
            </div>
        </div>
        </React.Fragment>
         )
    }
}

export default Upload;