import React from 'react'

import './Library.css'

class Library extends React.Component
{
    state = {
        currentpage: "overview"
    }


    renderPage()
    {
        switch(this.state.currentpage)
        {
            case "overview":
                break;
            case "tracks":
                break;
            case "likes":
                break;
            case "playlists":
                break;
            case "albums":
                break;
            case "stations":
                break;
            case "following":
                break;
            case "history":
                break;
            default:
                break;

        }
    }


    render()
    {
        return(
            <React.Fragment>
                <div className="library_heade mt-4">
                    <div className="library_label_group">
                        <button onClick={e=>{this.setState({currentpage: e.target.value})}} value="overview" className={`btn library_labels ${this.state.currentpage==("overview")? 'active': null}`}>Overview</button>
                        <button onClick={e=>{this.setState({currentpage: e.target.value})}} value="tracks" className={`btn library_labels ${this.state.currentpage==("tracks")? 'active': null}`}>Tracks</button>
                        <button onClick={e=>{this.setState({currentpage: e.target.value})}} value="like" className={`btn library_labels ${this.state.currentpage==("like")? 'active': null}`}>Likes</button>
                        <button onClick={e=>{this.setState({currentpage: e.target.value})}} value="playlist" className={`btn library_labels ${this.state.currentpage==("playlist")? 'active': null}`}>Playlists</button>
                        <button onClick={e=>{this.setState({currentpage: e.target.value})}} value="album" className={`btn library_labels ${this.state.currentpage==("album")? 'active': null}`}>Albums</button>
                        <button onClick={e=>{this.setState({currentpage: e.target.value})}} value="stations" className={`btn library_labels ${this.state.currentpage==("stations")? 'active': null}`}>Stations</button>
                        <button onClick={e=>{this.setState({currentpage: e.target.value})}} value="following" className={`btn library_labels ${this.state.currentpage==("following")? 'active': null}`}>Following</button>
                        <button onClick={e=>{this.setState({currentpage: e.target.value})}} value="history" className={`btn library_labels ${this.state.currentpage==("history")? 'active': null}`}>History</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default Library