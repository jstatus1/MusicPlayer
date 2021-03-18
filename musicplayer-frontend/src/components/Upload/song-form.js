import React from 'react'
import './song-form.css'

export default class SongForm extends React.Component
{
    state= {
        title: this.props.song.name
    }

    render()
    {
        return(<React.Fragment>
                <form id = {this.props.id} className="card mt-5 mb-5">
                    <div class="card-body row">
                        <div className="col-5">
                            <div className="upload-artwork-box">
                                <span className="upload-artwork-img">
                                    <h1>Image Box</h1>
                                </span>
                            </div>
                        </div>
                        <div className="col-7">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Title *</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" onChange={e => this.setState({title:e.target.value})} value={this.state.title} placeholder={"Name Your Track"}/>
                            </div>
                            
                            <div class="dropdown">
                                <button class="btn btn-secondary  btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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
                                <input type="email" class="form-control" id="exampleFormControlInput1" />
                            </div>


                            <div class="mb-3 mt-3">
                                <label for="exampleFormControlInput1" class="form-label">Description</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Describe your track"/>
                            </div>

                            <div class="mb-3 mt-3">
                                <label for="exampleFormControlInput1" class="form-label">Caption</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Add a caption to your post(optional)"/>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>)
        
    }
}


