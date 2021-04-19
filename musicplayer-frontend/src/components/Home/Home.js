import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import logo from './uhcampus.jpg';
import "./Homestyle.css"

const Home = () => {
    
    return (
        <div>
            <Container>
                <div style={{"paddingTop":"20px"}}/>
            <Row><Col md="4"><img class="logo" src={logo} alt="Logo"/></Col></Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <div style={{"border":"2px solid rgb(191,191,191)", "padding":"1em", "marginTop":"10px", "width":"500px"}}>
                        <h2>Welcome to Coog Music!</h2>
                        <t2>Check out your music in <Link to="/Library">Library</Link>!
                            <br/>
                            Click <Link to="/upload">Upload</Link> to add new music!
                            <br/>
                            Check out your <Link to="/MakePlaylist">playlists</Link> or other info about you by
                            using the profile dropdown!
                            <br/>
                            Your notifications can be viewed by cliking the bell on the navbar!
                        </t2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    
                </Row>
                
            </Container>
            

        </div>
    )
}

export default Home

