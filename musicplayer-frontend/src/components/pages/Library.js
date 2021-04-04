import { React, useState } from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import axios from 'axios'


const Library = () => {


    const [songList, setSongList] = useState([]);
    const [seconds, setSeconds] = useState(0);

    const retrieveAllSongs = async () => {

            try {
                const request = axios.get('http://localhost:5000/api/get/allsongs')
                .then(res => {
                    setSongList(res.data);
                    console.log('songList: ');
                    console.log(songList);
                })
                .catch(error => {
                    console.log('Error retrieving all songs from front end: ');
                    console.log(error);
                })
            } catch(err) { console.log(err); }

    }
        
    retrieveAllSongs();

    
    return (
        <div>
            <Container>
                <Row>
                    <Col md="4">
                        <h2>Songs</h2>
                            <Container>
                                <Row>
                                <i>To be displayed with songs from DB</i>
                                </Row>
                                <Row>
                                    {songList.map(song => {
                                        return <Row><Col>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-play-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"/>
                                        </svg> 
                                            <h5> {song.song_title} --- {song.username}</h5>
                                                </Col></Row>
                                    })}
                                </Row>
                                


                            </Container>
                    </Col>
                    <Col md="4">
                        <h2>Albums</h2>
                            <Container>
                            <Row>
                                <i>To be displayed with albums from DB</i>
                                </Row>
                                <Row>
                                <t5>Album Name --- Artist Name</t5>
                                </Row>
                                <Row>
                                <t5>Album Name --- Artist Name</t5>
                                </Row>
                                <Row>
                                <t5>Album Name --- Artist Name</t5>
                                </Row>
                            </Container>

                    </Col>
                    <Col md="4">
                        <h2>Playlists</h2>
                            <Container>
                                <Row>
                                    <Col md='5'>
                                        <Button type="primary" size="sm" href="/createplaylist">Create Playlist</Button>
                                    </Col>
                                </Row>
                            <Row>
                                <i>To be displayed with playlists from DB</i>
                                </Row>
                                <Row>
                                <t5>Playlist Name --- Artist Name</t5>
                                </Row>
                                <Row>
                                <t5>Playlist Name --- Artist Name</t5>
                                </Row>
                                <Row>
                                <t5>Playlist Name --- Artist Name</t5>
                                </Row>
                            </Container>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}


export default Library
