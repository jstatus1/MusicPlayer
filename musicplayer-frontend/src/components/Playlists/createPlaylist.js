import React, { useState, useEffect } from 'react'
import { Form, Button, Container,Row, Col } from 'react-bootstrap'
import SongBlock from '../SongBlock/SongBlock'
import './CreatePlaylist.css'
import axios from 'axios'






const CreatePlaylist = () => {

    const [songData, setSongData] = useState({ name: '', musician: ''});
    const [songBlockList, setSongBlockList] = useState([]);


    useEffect(() => {
        setSongData( { name: 'Best song', musician: 'Best singer' });
        try {
            const request = axios.get('http://localhost:5000/api/get/allsongs')
            .then(res => {
                setSongBlockList(res.data);
                console.log('songList: ');
                console.log(songBlockList);

            })
            .catch(error => {
                console.log('Error retrieving all songs from front end: ');
                console.log(error);
            })
        } catch(err) { console.log(err); }
      }, [null]);
    

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
            <Form>
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
                
                <Col md="4">
                           
                    <Form.Label  className = "playlistPadding">Song List</Form.Label>
                    <div className="db-list-box">
                        <div className="song-block-wrapper">
                            {songBlockList.map(block => { 
                                return <div>
                                    <Row>
                                        <SongBlock song={block}/>
                                        <SongBlock song={block}/>
                                        <SongBlock song={block}/>
                                        <SongBlock song={block}/>
                                        <SongBlock song={block}/>

                                    </Row>
                                </div>
                            })}
                        </div>
                    </div>


                </Col>

                <Col md="auto playlistPadding">
                    <div className="button-spacing"></div>
                    <Row>
                        <Button variant="primary">Add</Button>{' '}
                    </Row>
                    <div></div>
                    <Row>
                        <Button variant="primary">Remove</Button>{' '}
                    </Row>
                </Col>

            <Col md="4">
           <Row> <Form.Label class = "playlistPadding">Playlist</Form.Label></Row>
            <div className="playlist-box">
                
                
                
            </div> 
            </Col>
            </Row>
            </Form>
            </Container>
        </div>
            
    )
            
}

export default CreatePlaylist
