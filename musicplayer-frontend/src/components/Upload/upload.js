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
            <form>
                <h1 className="mb-5">Drag Or Drop Track or Song Here:</h1>
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
                            <input class="form-check-input me-5" type="checkbox" value="" id="flexCheckDefault"/>
                            <label class="form-check-label" for="flexCheckDefault">
                                Make a playlist when multiple files are selected
                            </label>
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
                </div>
            </form>
            <p>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. <a target="_blank" href="https://help.soundcloud.com/hc/en-us/articles/115003452847-Uploading-requirements#typeOfFile">Learn more about lossless HD.</a></p>
        </div>
        </React.Fragment>
         )
    }
}

export default Upload;