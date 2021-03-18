import React from 'react'
import './song-form.css'

export default class SongForm extends React.Component
{
    state= {
        title: this.props.song.name,
        song_image: null,
        genre: null,
        tags: [],
        description: null,
        caption: null
    }

    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            this.setState({song_image: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
    };


    renderSongUploadButton()
    {
        if(this.state.song_image == null)
        {
            return(<div className="image-button"> 
                <button type="button">
                <i class="bi bi-camera-fill me-2"></i>
                    <label for={this.props.id}>
                        Upload Image
                    </label>
                    <input type="file" id={this.props.id} className="sc-visuallyhidden" onChange={this.imageHandler} accept="image/jpeg,image/pjpeg,image/gif,image/png"/>
                </button>   
            </div>)
        }else{
           return( <div className="image-button-x"> 
                <button type="button" onClick={e=> this.setState({song_image: null})} className=" btn btn-danger">
                    <label>
                        X
                    </label>
                </button>   
            </div>)
        }
            
    }

    renderSongImage()
    {
        return(
            <div className="image-box">
                <div className="image-container">
                    <span className="upload-artwork-img">
                        {(this.state.song_image != null)? <img className="image" src={this.state.song_image}></img>: ''}
                        
                    </span>
                </div>
                {this.renderSongUploadButton()}
                               
            </div>
        )
    }

    render()
    {
        return(<React.Fragment>
                    <form className="card mt-5 mb-5">
                        <div class="card-body row ">
                            <div className="col-5 ">
                                    {this.renderSongImage()}
                                </div>
                            
                            <div className="col-7">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Title *</label>
                                    <input type="email" class="form-control"  onChange={e => this.setState({title:e.target.value})} value={this.state.title} placeholder={"Name Your Track"}/>
                                </div>
                                
                                <div class="dropdown">
                                    <button class="btn btn-secondary  btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Genre
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item">Rap</a></li>
                                        <li><a class="dropdown-item">Rock</a></li>
                                        <li><a class="dropdown-item">Taco</a></li>
                                    </ul>
                                </div>

                                <div class="mb-3 mt-3">
                                    <label for="exampleFormControlInput1" class="form-label">Additional Tags</label>
                                    <input type="email" class="form-control"  />
                                </div>


                                <div class="mb-3 mt-3 ">
                                    <label for="exampleFormControlInput1" class="form-label">Description</label>
                                    <textarea class="form-control floatingTextarea2 description-textarea" placeholder="Leave a comment here" ></textarea>
                                        
                                </div>

                                <div class="mb-3 mt-3">
                                    <label for="    exampleFormControlInput1" class="form-label">Caption</label>
                                    <input type="email" class="form-control"  placeholder="Add a caption to your post(optional)"/>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-danger" onClick={this.handleDelete}>Remove</button>
                    </form>
            </React.Fragment>)
        
    }

    handleDelete = () => {
        this.props.removeSong(this.props.song)
    }
}


