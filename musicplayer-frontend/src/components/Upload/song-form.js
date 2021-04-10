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
            release_date:null,
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
        currentPage: "Basic Info",
        ISRC_toggle: false,
        p_line_toggle:false,
        iswc_toggle:false,
        create_album: this.props.metadata_upload.album
    }

    imageHandler = (e) => {
        this.props.song.basic_info_song.song_image = Array.from(e.target.files)
        this.props.updateSongData(this.props.id, this.props.song)
    };


    renderSongUploadButton()
    {
        if(this.props.song.basic_info_song.song_image == null)
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
                <button type="button" onClick={() => {
                                                    this.props.song.basic_info_song.song_image = null; 
                                                    this.props.updateSongData(this.props.id, this.props.song)
                                                    var id = `${this.props.id}_art_image`
                                                    var output = document.getElementById(id);
                                                    output.src = null;
                                                    }} className=" btn btn-danger">
                    <label>
                        X
                    </label>
                </button>   
            </div>)
        }
            
    }

    renderSongImage()
    {
        if(this.props.song.basic_info_song.song_image!= null)
        {
            const reader = new FileReader();
        
            reader.readAsDataURL(this.props.song.basic_info_song.song_image[0])
            
            reader.onload = () =>{
                if(reader.readyState === 2)
                {
                    var dataURL = reader.result;
                    var id = `${this.props.id}_art_image`
                    var output = document.getElementById(id);
                    output.src = dataURL;
                }
            }
        }
       

        return(
            <div className="image-box">
                <div className="image-container">
                    <span  className="upload-artwork-img">
                        <img id={`${this.props.id}_art_image`} className="image" ></img>
                    </span>
                </div>
                {this.renderSongUploadButton()}  
             </div>
        )
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

    //Renders The Form
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

    renderHeaderAlbumCopies()
    {
        return(
            <div className="card-header">
                    <div class="btn-group" role="group">    
                        <button className='btn btn-dark'  onClick={e=> this.updateCurrentPage(e, "Basic Info")}>
                            <h5>Basic Info</h5>
                        </button>
                    </div>
            </div>
        )
    }


    //Basic Form Data Entry
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
        return(<div key={this.props.id} className="metadata_div">
            <div className="row">
                <div class="mb-3 mt-3 col-4">
                    <label for="contains_music" class="form-label">Contains Music</label>
                    <select id= "contains_music" class="form-select" onClick={e => this.setState(prevState => ({metadata: {...prevState.metadata, contains_music:(e.target.value=="true")}}))}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="artist" class="form-label" >Artist</label>
                    <input type="text" id="artist" class="form-control tag-input" onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, artist:e.target.value}}))} value={this.state.metadata.artist}/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="publisher" class="form-label" >Publisher</label>
                    <input type="text" id="publisher" class="form-control tag-input" onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, publisher:e.target.value}}))} value={this.state.metadata.publisher}/>
                </div>                  
            </div>  

            <div className="row">
                <div class="mb-3 mt-3 col-4">
                    <label for="ISRC" class="form-label">ISRC <i class="bi bi-question-circle" onClick={e=>this.setState({ISRC_toggle:!(this.state.ISRC_toggle)})}></i></label>
                   
                    <input type="text" id="ISRC" class="form-control tag-input" placeholder="e.g. USS1Z1001234"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, isrc:e.target.value}}))} value={this.state.metadata.isrc}/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="Composer" class="form-label">Composer</label>
                    <input type="text" id="Composer" class="form-control tag-input"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, composer:e.target.value}}))} value={this.state.metadata.composer} />
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="Release_Title" class="form-label"  >Release Title</label>
                    <input type="text" id="Release_Title" class="form-control tag-input" onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, release_title:e.target.value}}))} value={this.state.metadata.release_title}/>
                </div>                  
            </div>  
            
                    {
                        (this.state.ISRC_toggle)? <small>An ISRC (International Standard Recording Code) is a unique identifier that is assigned to a track. Use the same ISRC for a given track wherever you distribute it.
                        If you work with a record label or distributor, ask them if they already have ISRCs for your tracks.</small>:null
                    }
                <br></br>
                <br></br>
            <div className="row">
                <div  class="mb-3 mt-3 col-12">
                    <label for="Buy_Link" class="form-label">Buy Link</label>
                    <input type="link" id="Buy_Link" class="form-control tag-input"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, buy_link:e.target.value}}))} value={this.state.metadata.buy_link}/>
                </div>
            </div>  

            <div className="row">
                <div class="mb-3 mt-3 col-4">
                    <label for="Album_Title" class="form-label">Album Title</label>
                    <input type="text" id="Album_Title" class="form-control tag-input"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, album_title:e.target.value}}))} value={this.state.metadata.album_title}/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="Record_Label" class="form-label">Record Label</label>
                    <input type="text" id="Record_Label" class="form-control tag-input"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, record_label:e.target.value}}))} value={this.state.metadata.record_label}/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="Release_Date" class="form-label">Release Date</label>
                    <input type="date" id="Release_Date" class="form-control tag-input"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, release_date:e.target.value}}))} value={this.state.metadata.release_date}/>
                </div>                  
            </div> 

            <div className="row">
                <div class="mb-3 mt-3 col-8">
                    <label for="Barcode" class="form-label">Barcode</label>
                    <input type="text" id="Barcode" class="form-control tag-input"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, barcode:e.target.value}}))} value={this.state.metadata.barcode}/>
                </div>
                <div class="mb-3 mt-3 col-4">
                    <label for="ISWC" class="form-label">ISWC <i class="bi bi-question-circle" onClick={e=>this.setState({iswc_toggle:!(this.state.iswc_toggle)})}></i></label>
                    <input type="text" id="ISWC" class="form-control tag-input" placeholder="e.g. T-034.524.680-1"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, iswc:e.target.value}}))} value={this.state.metadata.iswc}/>
                </div>                
            </div> 

            <div className="row">
                <div class="mb-3 mt-3 col-8">
                    <label for="Barcode" class="form-label">P line <i class="bi bi-question-circle" onClick={e=>this.setState({p_line_toggle:!(this.state.p_line_toggle)})}></i></label>
                    <input type="text" id="P_line" class="form-control tag-input"  onChange={e => this.setState(prevState => ({metadata: {...prevState.metadata, p_line:e.target.value}}))} value={this.state.metadata.p_line} placeholder="e.g. 2007 XYZ Record Company Limited"/>
                </div>

                
                <div class="mb-3 mt-3 col-4">
                    <label for="explicit" class="form-label">Contains explicit content</label>
                    <select id= "contains_music" class="form-select" onClick={e => this.setState(prevState => ({metadata: {...prevState.metadata, explicit_content:(e.target.value=="true")}}))}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>     

                {
                        (this.state.p_line_toggle)? <small>P-line notice identify the owner of the rights in the original sound recording (the masters) at the time that the CD/carrier/file is manufactured.</small>:null
                }     
                {
                        (this.state.iswc_toggle)? <small>The ISWC (International Standard Musical Work Code) is a unique, permanent and internationally recognized reference number for the identification of musical works.</small>:null
                }           
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

                        {((this.state.create_album == false) || (this.state.create_album==true && this.props.id == 0))? 
                                <>
                                {this.renderHeader()}
                                <div class="card-body row ">
                                {this.state.currentPage=="Basic Info" ? this.renderBasicInfo()
                                    :null}
                                {this.state.currentPage=="Metadata" ? this.renderMetaData()
                                    :null}
                                {this.state.currentPage=="Permissions" ? this.renderPermissions()
                                :null}
                            </div></>
                        :
                        <>
                                {this.renderHeaderAlbumCopies()}
                                <div class="card-body row ">
                                {this.state.currentPage=="Basic Info" ? this.renderBasicInfo()
                                    :null}
                            </div></>
                        }
                        
                        <button className="btn btn-danger" onClick={e => this.handleDelete(e)}><i class="bi bi-file-x-fill"></i> Remove</button>
                    </form>
            </React.Fragment>)
        
    }

    handleDelete = (e) => {
        e.preventDefault()
        this.props.removeSong(this.props.song)
    }
}


