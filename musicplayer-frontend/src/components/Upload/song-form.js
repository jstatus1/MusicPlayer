import React from 'react'
import './song-form.css'

export default class SongForm extends React.Component
{
    state= {
        basic_info:{
            title: this.props.song.name,
            selected_genre:null,
            additional_tag: null,
            description: null,
            caption: null,
            song_image: null
        },
        metadata:{
            contains_music: true,
            artist: null,
            publisher: null,
            isrc: null,
            composer: null,
            release_title: null,
            buy_link: null,
            album_title: null,
            record_label:null,
            release_data:null,
            barcode: null,
            iswc: null,
            p_line: null,
            explicit_content: false
        },
        genre: {
            0: ["None", "Custom"],
            "Music": ["Alternative Rock", "Ambient", "Classical", "Country", "Dance & EDM", "Dancehall", 
                        "Deep House", "Disco", "Drum & Bass", "Dubstep", "Electronic",  "Folk & Singer-Songwriter", "Hip Hop & Rap", "House", "Indie",
                    "Jazz & Blues", "Latin", "Metal", "Piano", "Pop", "R&B & Soul", "Reggae", "Reggaeton", "Rock", "Soundtrack", "Techno", "Trance", 
                    "Trap", "Triphop", "World"],
            "Audio":["Audiobooks", "Business", "Comedy", "Entertainment", "Learning", "News & Politics", "Religion & Spirituality", "Science", "Sports", "Storytelling", "Technology"]
        },
        currentPage: "Basic Info"
    }

    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            this.setState(prevState => ({basic_info: {...prevState.basic_info, song_image:reader.result}}))
          }
        }
        reader.readAsDataURL(e.target.files[0])
    };


    renderSongUploadButton()
    {
        if(this.state.basic_info.song_image == null)
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
                <button type="button" onClick={e=> this.setState(prevState => ({basic_info: {...prevState.basic_info, song_image:null}}))} className=" btn btn-danger">
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
                        {(this.state.basic_info.song_image != null)? <img className="image" src={this.state.basic_info.song_image}></img>: ''}
                        
                    </span>
                </div>
                {this.renderSongUploadButton()}
                               
            </div>
        )
    }

    setGenre(e)
    {
       this.setState(prevState => ({basic_info: {...prevState.basic_info, selected_genre:e.target.value}}))
    }

    renderGenreList()
    {
        var list = [];


        list.push('')
        for (const key in this.state.genre) 
        {

            list.push('<section className="section_group" id="linkMenu__group"><ul className= "sc-list-nostyle ' + `${key}-list` + '">')
           
            if(key != 0)
            {
               
                list.push('<h3 className="sc-border-light-bottom linkMenu__groupTitle sc-type-light" id="linkMenu__groupTitle">' + key + '</h3>')
            
            }

            for (var value in this.state.genre[key]) {
                list.push('<li id="linkMenu__item"> <option class="dropdown-item" value='+  this.state.genre[key][value] +'>' + this.state.genre[key][value] + '</option></li>')
            }
                
            list.push('</ul></section>')
        }
          

        document.getElementById("genre-selector")
        
        return {__html:  list.join('') }
    }

    updateCurrentPage = (e, page) => 
    {
        e.preventDefault()
        this.setState({currentPage: page})
    }

    renderHeader()
    {
        switch(this.state.currentPage)
        {
            case("Basic Info"):
                return(
                    <div className="card-header">
                            <div class="btn-group" role="group">    
                                <button className='btn btn-dark'  onClick={e=> this.updateCurrentPage(e, "Basic Info")}>
                                    <h5>Basic Info</h5>
                                </button>
                                <button className='btn btn-outline-dark' onClick={e =>  this.updateCurrentPage(e, "Metadata")}>
                                    <h5>Metadata</h5>
                                </button>
                                <button className='btn btn-outline-dark' onClick={e =>  this.updateCurrentPage(e, "Permissions")}>
                                    <h5>Permissions</h5>
                                </button>
                            </div>
                        </div>
                )
            case("Metadata"):
                return(
                    <div className="card-header">
                            <div class="btn-group" role="group">    
                                <button className='btn btn-outline-dark' onClick={e=> this.updateCurrentPage(e, "Basic Info")}>
                                    <h5>Basic Info</h5>
                                </button>
                                <button className='btn btn-dark'  onClick={e=> this.updateCurrentPage(e, "Metadata")}>
                                    <h5>Metadata</h5>
                                </button>
                                <button className='btn btn-outline-dark' onClick={e=> this.updateCurrentPage(e, "Permissions")}>
                                    <h5>Permissions</h5>
                                </button>
                            </div>
                        </div>
                )
                case("Permissions"):
                return(
                    <div className="card-header">
                            <div class="btn-group" role="group">    
                                <button className='btn btn-outline-dark' onClick={e => this.updateCurrentPage(e, "Basic Info")}>
                                    <h5>Basic Info</h5>
                                </button>
                                <button className='btn btn-outline-dark' onClick={e => this.updateCurrentPage(e, "Metadata")}>
                                    <h5>Metadata</h5>
                                </button>
                                <button className='btn btn-dark' onClick={e => this.updateCurrentPage(e, "Permissions")}>
                                    <h5>Permissions</h5>
                                </button>
                            </div>
                        </div>
                )
            default:
                this.setState({currentPage: "Basic Info"})
                return(
                    <div className="card-header">
                            <div class="btn-group" role="group">    
                                <button className='btn btn-dark'  onClick={e=> this.updateCurrentPage(e, "Basic Info")}>
                                    <h5>Basic Info</h5>
                                </button>
                                <button className='btn btn-outline-dark' onClick={e =>  this.updateCurrentPage(e, "Metadata")}>
                                    <h5>Metadata</h5>
                                </button>
                                <button className='btn btn-outline-dark' onClick={e =>  this.updateCurrentPage(e, "Permissions")}>
                                    <h5>Permissions</h5>
                                </button>
                            </div>
                        </div>
                )
        }
    }

    renderBasicInfo(){
        return(<React.Fragment>
                <div className="col-5 ">
                    {this.renderSongImage()}
                </div>
                            
                <div className="col-7">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title *</label>
                        <input id="title" type="text" class="form-control title"  onChange={e => this.setState(prevState => ({basic_info: {...prevState.basic_info, title:e.target.value}}))} value={this.state.basic_info.title} placeholder={"Name Your Track"}/>
                    </div>
                    
                    <div class="dropdown linkMenu__list ">
                        <label for="genre-selector" class="form-label">Genre</label>
                        
                        <select id="genre-selector" className="form-control " onClick={e=> this.setState(prevState => ({basic_info: {...prevState.basic_info, selected_genre:e.target.value}}))} dangerouslySetInnerHTML={this.renderGenreList()}>

                        </select>
                    </div>

                    <div class="mb-3 mt-3">
                        <label for="additional_tag" class="form-label">Additional Tags</label>
                        <input type="text" id="additional_tag" class="form-control tag-input" onChange={e => this.setState(prevState => ({basic_info: {...prevState.basic_info, additional_tag:e.target.value}}))} value={this.state.basic_info.additional_tag} placeholder={"Name Your Track"} placeholder="Add tags to describe the genre and mood of your track" />
                    </div>


                    <div class="mb-3 mt-3 ">
                        <label for="description-textarea" class="form-label">Description</label>
                        <textarea id="description-textarea" class="form-control floatingTextarea2 description-textarea" onChange={e => this.setState(prevState => ({basic_info: {...prevState.basic_info, description:e.target.value}}))} value={this.state.basic_info.description} placeholder="Leave a comment here" ></textarea>       
                    </div>

                    <div class="mb-3 mt-3">
                    <label for="Caption" class="form-label">Caption</label>
                        <textarea for="Caption" class="form-control floatingTextarea2 description-textarea" onChange={e => this.setState(prevState => ({basic_info: {...prevState.basic_info, caption:e.target.value}}))} value={this.state.basic_info.caption} placeholder="Add a caption to you post (optional)" ></textarea>  
                    </div>
                </div>
            </React.Fragment>)
    }

    renderMetaData()
    {
        return(<div className="metadata_div">
            <div className="row">
                <div class="mb-3 mt-3 col-4">
                    <label for="contains_music" class="form-label">Contains Music</label>
                    <input type="text" id="contains_music" class="form-control tag-input"/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="artist" class="form-label">Artist</label>
                    <input type="text" id="artist" class="form-control tag-input"/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="publisher" class="form-label">Publisher</label>
                    <input type="text" id="publisher" class="form-control tag-input"/>
                </div>                  
            </div>  

            <div className="row">
                <div class="mb-3 mt-3 col-4">
                    <label for="ISRC" class="form-label">ISRC</label>
                    <input type="text" id="ISRC" class="form-control tag-input"/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="Composer" class="form-label">Composer</label>
                    <input type="text" id="Composer" class="form-control tag-input"/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="Release_Title" class="form-label">Release Title</label>
                    <input type="text" id="Release_Title" class="form-control tag-input"/>
                </div>                  
            </div>  

                <br></br>
                <br></br>
            <div className="row">
                <div  class="mb-3 mt-3 col-12">
                    <label for="Buy_Link" class="form-label">Buy Link</label>
                    <input type="link" id="Buy_Link" class="form-control tag-input"/>
                </div>
            </div>  

            <div className="row">
                <div class="mb-3 mt-3 col-4">
                    <label for="Album_Title" class="form-label">Album Title</label>
                    <input type="text" id="Album_Title" class="form-control tag-input"/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="Record_Label" class="form-label">Record Label</label>
                    <input type="text" id="Record_Label" class="form-control tag-input"/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="Release_Date" class="form-label">Release Date</label>
                    <input type="text" id="Release_Date" class="form-control tag-input"/>
                </div>                  
            </div> 

            <div className="row">
                <div class="mb-3 mt-3 col-8">
                    <label for="Barcode" class="form-label">Barcode</label>
                    <input type="text" id="Barcode" class="form-control tag-input"/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="ISWC" class="form-label">ISWC</label>
                    <input type="text" id="ISWC" class="form-control tag-input"/>
                </div>                
            </div> 

            <div className="row">
                <div class="mb-3 mt-3 col-8">
                    <label for="Barcode" class="form-label">P line</label>
                    <input type="text" id="P_line" class="form-control tag-input"/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="explicit" class="form-label">Contains explicit content</label>
                    <input type="text" id="explicit" class="form-control tag-input"/>
                </div>                
            </div>


        </div>)
    }

    renderPermissions()
    {
        return(
            <h3>Permission Will Be worked on later</h3>
        )
    }

  

    render()
    {
        return(<React.Fragment>
                    <form className="card mt-5 mb-5">
                        {this.renderHeader()}
                        <div class="card-body row ">
                            {this.state.currentPage=="Basic Info" ? this.renderBasicInfo()
                                :null}
                            {this.state.currentPage=="Metadata" ? this.renderMetaData()
                                :null}
                            {this.state.currentPage=="Permissions" ? this.renderPermissions()
                            :null}
                        </div>
                        <button className="btn btn-danger" onClick={this.handleDelete}>Remove</button>
                    </form>
            </React.Fragment>)
        
    }

    handleDelete = () => {
        this.props.removeSong(this.props.song)
    }
}


