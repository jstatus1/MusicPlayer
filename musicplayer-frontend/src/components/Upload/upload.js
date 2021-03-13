import React, {Component} from 'react'
import Progress from './progress';
import axios from 'axios'
import './upload.css'


class Upload extends React.Component
{
    state = {
        uploadedSong: null,
        public: true,
        playlist: false,
        errMessage: null,
        successMessage: null,
        uploadPercentage: 0,
        uploadedFileLocation: {}
    }

    musicUpload = (e) => {
        this.setState({uploadedSong: Array.from(e.target.files)})
    }

    onSubmit= async (e) =>
    {
        e.preventDefault()
        let formData = new FormData()

        console.log(this.state.uploadedSong.length)
        for(let i = 0; i < this.state.uploadedSong.length; i++)
        {
            console.log(this.state.uploadedSong[i])
            formData.append("musicUploads", this.state.uploadedSong[i]); 
        }


        try{
            const res = await axios.post('/api/music_upload/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                //Progress Loading
                onUploadProgress: progressEvent => {
                  this.setState({uploadPercentage:  parseInt(
                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  )})
        
                  // Clear percentage
                  setTimeout(() => this.setState({uploadPercentage: 0}), 10000);
                }
              });
        
              //const { fileName, filePath } = res.data;
              console.log(res.data)
            //   this.setState({uploadedFileLocation: { fileName, filePath }});
            //   this.setState({successMessage: 'Your Files Have Been Uploaded'})
        }catch(err)
        {
            if(err.response.status === 500)
                this.setState({errMessage: 'There  was a problem with the server'})
            else
                this.setState({errMessage: err.response.data.msg})
        }
    }
    
    onSubmitSingle = async(e) => 
    {
        e.preventDefault()
        let formData = new FormData()
        formData.append("musicUploads", this.state.uploadedSong[0]); 

        try{
            const res = await axios.post('/api/SingleUpload/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                //Progress Loading
                onUploadProgress: progressEvent => {
                  this.setState({uploadPercentage:  parseInt(
                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  )})
        
                  // Clear percentage
                  setTimeout(() => this.setState({uploadPercentage: 0}), 10000);
                }
              });
        
              //const { fileName, filePath } = res.data;
              console.log(res.data)
            //   this.setState({uploadedFileLocation: { fileName, filePath }});
            //   this.setState({successMessage: 'Your Files Have Been Uploaded'})
        }catch(err)
        {
            if(err.response.status === 500)
                this.setState({errMessage: 'There  was a problem with the server'})
            else
                this.setState({errMessage: err.response.data.msg})
        }
    }

    checkAlert(){
        if(this.state.errMessage != null)
        {
            return <div class="alert alert-danger alert-dismissible fade show" role="alert">
             <strong>Holy guacamole!</strong> {this.state.errMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => this.setState({errMessage:null})}></button>
            </div>
        }

        if(this.state.successMessage != null)
        {
            return <div class="alert alert-success alert-dismissible fade show" role="alert">
             <strong>Great!</strong> {this.state.successMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => this.setState({successMessage:null})}></button>
            </div>
        }
    }

    render()
    {
        return(<React.Fragment>
        {this.checkAlert()}
        
        <div className=" row div-wrapper justify-center align-items-center">
            <form onSubmit={e=>this.onSubmit(e)}>
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
                <button
                    type='submit'
                    value='Upload'
                    className='btn btn-danger mt-5'
                >
                    Submit Upload
                </button>
                
            </form>
            <Progress percentage={this.state.uploadPercentage} />
            <p>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. <a target="_blank" href="https://help.soundcloud.com/hc/en-us/articles/115003452847-Uploading-requirements#typeOfFile">Learn more about lossless HD.</a></p>
        </div>
        </React.Fragment>
         )
    }
}

export default Upload;