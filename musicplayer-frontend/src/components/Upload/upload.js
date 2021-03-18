import React, {Component} from 'react'
import Progress from './progress';
import axios from 'axios'
import { io } from "socket.io-client";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



//local imports
import SongForm from './song-form'
import './upload.css'


let socket = io('http://localhost:5000')

class Upload extends React.Component
{
    state = {
        uploadedSong: null,
        errMessage: null,
        successMessage: null,
        uploadPercentage: 0,
        uploadedFileLocation: {},
        metadata: {
            userid: null,
            public: true,
            playlist: false,
        },
        song_data: []
    }

    
    

   
    musicUpload = (e) => {
        if(e.target.files.length != 0)
            this.setState({uploadedSong: Array.from(e.target.files)})
    }

    onSubmit= async (e) =>
    {
        e.preventDefault()
        let formData = new FormData()

        //append metadata
        formData.append("metadata", )

        
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

    publicOrPrivate () {
        return(<React.Fragment>
                                <h2>Privacy:</h2>
                               
                                    <div class="form-check">
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={e=> {this.setState({metadata: {...this.state.metadata, public:true}})}} checked={this.state.metadata.public}/>
                                                Public
                                            </label>
                                    </div>
                                    <div class="form-check">
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={e=> {this.setState({metadata: {...this.state.metadata, public:false}})}} checked={!this.state.metadata.public}/>
                                                Private
                                            </label>
                                    </div>
            </React.Fragment>
        )
    }

    removeSong(e)
    {
        let updatedSongList = this.state.uploadedSong.filter(
            (song) => {
                return song !== e;
            }
        );

        this.setState({
            uploadedSong : updatedSongList,
        });
    }

    renderUploadDialog()
    {
            if(this.state.uploadedSong == null)
            {
                return(
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
                                        <input class="form-check-input me-5" type="checkbox" value="" id="flexCheckDefault"  onChange={e=> {this.setState({metadata: {...this.state.metadata, playlist:!(this.state.metadata.playlist)}})}} checked={this.state.metadata.playlist}/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Make a playlist when multiple files are selected
                                        </label>
                                    {this.publicOrPrivate()}
                            </div>
                            
                        </form>
                        {/* <Progress percentage={this.state.uploadPercentage} /> */}
                        <p>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. <a target="_blank" href="https://help.soundcloud.com/hc/en-us/articles/115003452847-Uploading-requirements#typeOfFile">Learn more about lossless HD.</a></p>
                    </div>
                )
            }else{
                return (<React.Fragment>
                            <div class="card">
                                <div class="card-header ">
                                 Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. Learn more about lossless HD. No file chosen
                                 <button type="button " className=" ms-4">
                                        <label for="uploadFiles">
                                            Replace File
                                        </label>
                                        <input
                                        type='file'
                                        className="inputFiles sc-visuallyhidden"
                                        id='uploadFiles'
                                        accept="audio/*"
                                        onChange={e => this.musicUpload(e)}
                                        multiple
                                        /> 
                                </button>   
                                </div>
                                <div class="card-body">
                                        {this.state.uploadedSong.map((song,index) => {
                                    return (<SongForm key={index} id={index} song={song} removeSong={this.removeSong.bind(this)}></SongForm>)
                                    })}
                                </div>

                                <button className="btn btn-dark " onClick={e=>this.onSubmit(e)}>Submit</button>
                        </div>
                </React.Fragment>
                )
            }
        
    }

    componentDidMount()
    {
        //set up user metadata
        if(!this.props.auth)
        {
            return <Redirect to="/"></Redirect>
        }else{
            
        
            this.setState({metadata: {
                userid: this.props.auth.uid,
                public: true,
                playlist: false,
            }})

        }
    }

    

    render()
    {
        return(<React.Fragment>
                {this.checkAlert()}

                <div className="mt-5">
                    {this.renderUploadDialog()}
                </div>
            </React.Fragment>
         )
    }
}

function mapStateToProps(state) {
    return { 
      auth: state.auth_reducer
     };
  }

export default connect(mapStateToProps)(Upload);