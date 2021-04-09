import React, { useState, useEffect } from 'react'
import { Form, Button, Container,Row, Col } from 'react-bootstrap'
import SongBlock from '../SongBlock/SongBlock'
import './CreatePlaylist.css'
import axios from 'axios'






const CreatePlaylist = () => {

    const [songData, setSongData] = useState({ name: '', musician: ''});
    const [songBlockList, setSongBlockList] = useState([]);

    const retrieveAllSongs = () => {


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

}

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
                           
                    <Form.Label  class = "playlistPadding">Song List</Form.Label>
                    <Container class= "songList">
                        {songBlockList.map(block => { 
                            return <>
                            <SongBlock song={block}/>
                            </>
                        })}
                        <SongBlock song={songData} />
                    </Container> 
                </Col>

                <Col>
                <Form.Label  class = "playlistButton"></Form.Label>
            <Button variant="primary" class = "playlistPadding">Add to Playlist</Button>{' '}
            </Col>

            <Col>
            <Form.Label  class = "playlistButton"></Form.Label>
            <Button variant="primary" class = "playlistPadding">Remove from Playlist</Button>{' '}
            </Col>

            <Col md="4">
           <Row> <Form.Label class = "playlistPadding">Playlist</Form.Label></Row>
            <input type= "text" class = "songTable"/> 
            </Col>
            </Row>
            </Form>
            </Container>
        </div>
            
    )
            
}

export default CreatePlaylist
