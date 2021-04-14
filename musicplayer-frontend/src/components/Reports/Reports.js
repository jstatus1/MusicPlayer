/* eslint-disable react/jsx-pascal-case */
import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import './Reports.css'
import Reports_Users from './Reports_Users'

const Reports = () => {

    const [rUsers, setRUsers] = useState(false);
    const [rSongs, setRSongs] = useState(false);
    const [rAlbums, setRAlbums] = useState(false);
    const [rPlaylists, setRPlaylists] = useState(false);

    const toggleRUsers = (event) => { setRUsers(true); setRSongs(false); setRAlbums(false); setRPlaylists(false); }

    const toggleRSongs = (event) => { setRUsers(false); setRSongs(true); setRAlbums(false); setRPlaylists(false); }

    const toggleRAlbums = (event) => { setRUsers(false); setRSongs(false); setRAlbums(true); setRPlaylists(false); }

    const toggleRPlaylists = (event) => { setRUsers(false); setRSongs(false); setRAlbums(false); setRPlaylists(true); }

    return (
        <div>
            <h2 style={{ "textAlign": "center", "paddingTop":"0.5em" }}>Generate Reports</h2>

            <Row>
                <Col md="3" sm="1"></Col>
                <Col>
                    <div style={{"paddingTop":"1.5em"}}>
                        <Row>
                        <Col md="2"> <Button onClick={(e) => toggleRUsers()} variant={rUsers ? "outline-danger" : "danger"}>Users</Button> </Col>
                        <Col md="2"> <Button onClick={(e) => toggleRSongs()} variant={rSongs ? "outline-danger" : "danger"}>Songs</Button> </Col>
                        <Col md="2"> <Button onClick={(e) => toggleRAlbums()} variant={rAlbums ? "outline-danger" : "danger"}>Albums</Button> </Col>
                        <Col md="2"><Button onClick={(e) => toggleRPlaylists()} variant={rPlaylists ? "outline-danger" : "danger"}>Playlists</Button> </Col>
                        </Row>
                    </div>
                </Col>
                <Col md="auto" sm="auto"></Col>
            </Row>

            {rUsers}

            <div className={rUsers? "visible" : "collapse"}><Reports_Users/></div>
        </div>
    )
}

export default Reports
