import React, { useState, useEffect } from 'react'
import { Form, Button, Container,Row, Col } from 'react-bootstrap'
import SongBlock from '../SongBlock/SongBlock'
import './CreateAlbum.css'
import axios from 'axios'

const createAlbum = () => {
    return (
        <div>
            <Row>
                <Col md="3"></Col>
                <Col md="auto">
                    <h1>Create Album</h1>
                </Col>
                <Col md="3"></Col>
            </Row>

            <Container>
            <Row>
                <Col md="3"></Col>
                <Col md="4">
                    <Form.Label>Playlist Name</Form.Label>
                    <Form.Control type= "text"/> 
                </Col>
            </Row>

            <Row>
                <Col md="3"></Col>
                <Col md="4">
                    <Form.Label>Playlist Description</Form.Label>
                    <Form.Control type= "text"/> 
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default createAlbum
