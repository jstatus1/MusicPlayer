import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import './createPlaylist.css'





const CreatePlaylist = () => {

    return (
        <div>
            <Container>
            <Form>
            <Form.Label>Playlist Name</Form.Label>
            <Form.control type= "text" placeholder = "Playlist name"/> 

            <Form.Label>Playlist Description</Form.Label>
            <Form.control type= "text" placeholder = "Playlist name"/> 

            <Button variant="primary" type="submit">Save</Button>

            <Form.Label>Song List</Form.Label>
            <Form.control type= "text" placeholder = "Songs go here"/> 

            <Button variant="primary">Add to Playlist</Button>{' '}
            <Button variant="primary">Remove from Playlist</Button>{' '}

            <Form.Label>Playlist</Form.Label>
            <Form.control type= "text" placeholder = "Songs in playlist"/> 
            </Form>
            </Container>
        </div>
            
    )
            
}

export default CreatePlaylist
