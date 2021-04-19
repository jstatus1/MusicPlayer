import React, { PureComponent } from 'react'
import axios from 'axios'

import './ExploreSongs.css'
import SimpleAudioContainer from '../Library/containers/SimpleAudioContainer'

export default class ExploreSongs extends PureComponent {
    
    state={
        songs: [],
        albums: [],
        playlists: []
    }

    removeFromArray(song, type)
    {
        let index;
        let tempArray = []
        switch(type)
        {
            case "Tracks":
                for(let i = 0; i < this.state.songs.length; i++)
                {
                    if(song != this.state.songs[i])
                    {
                        tempArray.push(this.state.songs[i])
                    }
                }
                this.setState({songs:tempArray})
                break;
            case "Albums":
                index = this.state.albums.indexOf(song);
                if (index > -1) {
                    this.state.albums.splice(index, 1);
                }
                break;
            case "Playlists":
                index = this.state.playlists.indexOf(song);
                if (index > -1) {
                    this.state.playlists.splice(index, 1);
                }
                break;
        }
    }
    
    componentDidMount()
    {
        try{
            axios.get('/api/get/allSongs').then(response => {
                
                this.setState({songs: response.data})
            })
            axios.get('/api/get/allAlbums').then(response => {
                
                this.setState({albums: response.data})
            })
            axios.get('/api/get/allPlaylists').then(response => {
                
                this.setState({playlists: response.data})
            })
        }catch(err)
        {
            console.log(err)
        }
    }


    renderLatestHits()
    {
        try{
            return this.state.songs.map((song, index) => {
                return (
                         <div className="col-3" key={index}>
                                <SimpleAudioContainer id={index} song={song} link="library/tracks" type="track" removeFromArray={this.removeFromArray.bind(this)}>
                                </SimpleAudioContainer>
                        </div>)
            }) 
        }catch(err)
        {

        }
    }

    renderLatestPlaylist()
    {
        try{
            return this.state.playlists.map((song, index) => {
                return (<div className="col-3" key={index}>
                    <SimpleAudioContainer id={index} song={song} link="library/playlists" type="playlist"></SimpleAudioContainer>
                    </div>)
            }) 
        }catch(err)
        {

        }
    }

    renderLatestAlbum()
    {
        try{
            return this.state.albums.map((song, index) => {
                return (<div className="col-3" key={index}>
                    <SimpleAudioContainer id={index} song={song} link="library/albums" type="album"></SimpleAudioContainer>
                </div>)
            }) 
        }catch(err)
        {

        }
    }

    render() {
        return (<React.Fragment>
                        <div className="row Explore-Items">
                            <div class="container ">
                                <h2>Latest Hits:</h2>
                                <div className="row vertical-scrollable">
                                        {this.renderLatestHits()}
                                </div>
                            </div>
                        </div>
                        
                        <div className="row Explore-Items">
                            <div class="container ">
                                <h2>Latest Playlists:</h2>
                                <div className="row vertical-scrollable Explore-Items-Container">
                                    {this.renderLatestPlaylist()}
                                </div>
                            </div>
                        </div>

                        <div className="row Explore-Items">
                            <div class="container ">
                                <h2>Latest Album Releases:</h2>
                                <div className="row vertical-scrollable">
                                    {this.renderLatestAlbum()}
                                </div>
                            </div>
                        </div>
            </React.Fragment>)
    }
}
