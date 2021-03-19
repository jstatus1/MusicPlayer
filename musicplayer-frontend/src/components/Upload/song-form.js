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
        caption: null,
        genre: {
            0: ["None", "Custom"],
            "Music": ["Alternative Rock", "Ambient", "Classical", "Country", "Dance & EDM", "Dancehall", 
                        "Deep House", "Disco", "Drum & Bass", "Dubstep", "Electronic",  "Folk & Singer-Songwriter", "Hip Hop & Rap", "House", "Indie",
                    "Jazz & Blues", "Latin", "Metal", "Piano", "Pop", "R&B & Soul", "Reggae", "Reggaeton", "Rock", "Soundtrack", "Techno", "Trance", 
                    "Trap", "Triphop", "World"],
            "Audio":["Audiobooks", "Business", "Comedy", "Entertainment", "Learning", "News & Politics", "Religion & Spirituality", "Science", "Sports", "Storytelling", "Technology"]
        }
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

    renderGenreList()
    {
        var list = [];
        list.push('<div className="g-scrollable-inner"> ')
        for (const key in this.state.genre) 
        {

            list.push('<section className="section_group" id="linkMenu__group"><ul className= "sc-list-nostyle ' + `${key}-list` + '">')
           
            if(key != 0)
            {
               
                list.push('<h3 className="sc-border-light-bottom linkMenu__groupTitle sc-type-light" id="linkMenu__groupTitle">' + key + '</h3>')
            
            }

            for (var value in this.state.genre[key]) {
                list.push('<li id="linkMenu__item"> <a class="dropdown-item">' + this.state.genre[key][value] + '</a></li>')
            }
                
            list.push('</ul></section>')
        }

        list.push('</div>')
            
        

        document.getElementsByClassName("dropdown-menu genre-drowdown-menu")
        
        return {__html:  list.join('') }
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
                                
                                <div class="dropdown linkMenu__list g-scrollable linkMenu__scrollable g-scrollable-v" id="linkMenu__list">
                                    
                                            <button class="btn btn-secondary  btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                               Genre
                                            </button>
                                            
                                                <div className="dropdown-menu genre-drowdown-menu" aria-labelledby="dropdownMenuButton1" dangerouslySetInnerHTML={this.renderGenreList()}>
                                        
                                    </div>
                                </div>

                                <div class="mb-3 mt-3">
                                    <label for="tag-input" class="form-label">Additional Tags</label>
                                    <input type="email" class="form-control tag-input"  placeholder="Add tags to describe the genre and mood of your track" />
                                </div>


                                <div class="mb-3 mt-3 ">
                                    <label for="description-textarea" class="form-label">Description</label>
                                    <textarea class="form-control floatingTextarea2 description-textarea" placeholder="Leave a comment here" ></textarea>       
                                </div>

                                <div class="mb-3 mt-3">
                                <label for="exampleFormControlInput1" class="form-label">Caption</label>
                                    <textarea class="form-control floatingTextarea2 description-textarea" placeholder="Add a caption to you post (optional)" ></textarea>  
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


