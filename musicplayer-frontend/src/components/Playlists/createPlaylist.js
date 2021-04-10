import React, { useState, useEffect } from 'react'
import { Form, Button, Container,Row, Col } from 'react-bootstrap'
import SongBlock from '../SongBlock/SongBlock'
import './CreatePlaylist.css'
import axios from 'axios'






const CreatePlaylist = () => {

    //const [   songData, setSongData] = useState({ name: '', musician: ''});
    const [selectedSong, setSelectedSong] = useState({ name: '', musician: ''});
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [songBlockList, setSongBlockList] = useState([]);

    

    useEffect(() => {
        
        async function getSongs() {
        
            const request = await axios.get('http://localhost:5000/api/get/allsongs')
            .then(res => {
                setSongBlockList(res.data);
                console.log('songList: ');
                console.log(songBlockList);

            })
            .catch(error => {
                console.log('Error retrieving all songs from front end: ');
                console.log(error);
            })
        }

        async function handleAddSong() {
            await setSelectedSongs({
               selectedSongs: [...selectedSongs, selectedSong]
            })
            console.log('songs list added new song!');
    
        }

        getSongs();
        handleAddSong();
        
        /* try {
            
        } catch(err) { console.log(err); } */
    }, [selectedSong]);

    


    return (
        <div>
            <Row>
                <Col md="3"></Col>
                <Col md="auto">
            <h1>Create Playlist</h1>
                </Col>
                <Col md="3"></Col>
            </Row>
            <Container>
            <Row>
                <Col md="3"></Col>
                <Col md="4">
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control type= "text" placeholder = "Playlist name"/> 
                </Col>
            </Row>

            <Row>
                <Col md="3"></Col>
                <Col md="4">
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control type= "text" placeholder = "Playlist Description"/> 
                </Col>
            </Row>



            <Row>
                
                <Col md="5">
                           
                    <Form.Label  className = "playlistPadding">Song List</Form.Label>
                    <div className="db-list-box">
                        <div className="song-block-wrapper">
                            {songBlockList.map(block => { 
                                 return(
                                    <div>
                                        <Row>
                                            <div onClick={() => setSelectedSong({ name: block.song_title, musician: block.username})}>
                                            <SongBlock song={block}/>
                                            </div>
                                        </Row>
                                    </div>)
                                
                            })}
                        </div>
                    </div>


                </Col>

                <Col md="auto playlistPadding">
                    <div className="button-spacing"></div>
                    <Row>
                        <Button variant="primary"
                                /* onClick={e => handleAddSong(selectedSong)} */>Add</Button>{' '}
                    </Row>
                    <div className="button-spacing-2"></div>
                    <Row>
                        <Button variant="primary">Remove</Button>{' '}
                    </Row>
                </Col>

            <Col md="5">
           <Row> <Form.Label class = "playlistPadding">Playlist</Form.Label></Row>
            <div className="playlist-box">
                <div className="song-block-wrapper">
                            {/*selectedSongs.map(block => { 
                                return <div>
                                    <Row>
                                        <SongBlock song={block}/>
                                    </Row>
                                </div>
                            })*/}
                        </div>
                
                
            </div> 
            </Col>
            </Row>
            </Container>
        </div>
            
    )
            
}

export default CreatePlaylist
