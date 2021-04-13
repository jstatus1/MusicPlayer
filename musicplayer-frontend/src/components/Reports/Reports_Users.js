import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import './Reports.css'


const Reports_Users = () => {



    const userSearch = (event) => {

        event.PreventDefault();
        event.StopPropagation();

    }
    return (
        <div>
            <h2 style={{ "text-align": "center", "padding-top":"0.5em" }}>Generate Reports</h2>

            <Row>
                <Col md="3"></Col>
                <Col>
                    <div style={{"padding-top":"1.5em"}}>
                        <Row>
                        <Col> <Button variant="danger" disabled>Users</Button> </Col>
                        <Col> <Button variant="danger">Songs</Button> </Col>
                        <Col> <Button variant="danger">Albums</Button> </Col>
                        <Col><Button variant="danger">Playlists</Button> </Col>
                        </Row>
                    </div>
                </Col>
                <Col md="3"></Col>
            </Row>

            <Row>
                    <Container className="users-search-form">
                    <h5 style={{ "text-align":"center", "padding-top":"1em"}}>Search for Users</h5>
                    
                    <Form onSubmit={userSearch}>
                        <Row>
                            <Col md="2"/>
                                <Col md="4">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text"></Form.Control>
                                </Col>
                                <Col style={{"padding-top":"2em"}}>
                                    <Form.Check type="checkbox" label="Musician?"></Form.Check>
                                </Col>
                                
                            <Col md="2"/>
                        </Row>
                        <Row>
                            <Col md="2"/>
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </Col>
                            <Col md="2"/>
                        </Row>
                        <Row style={{"padding-bottom":"1em", "padding-top":"1em"}}>
                            <Col md="5"/>
                            <Col md="auto">
                                <Button variant="secondary">Reset</Button>
                            </Col>
                            
                            <Col>
                                <Button variant="danger" type="submit">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                    
                    </Container>

            </Row>

            <Container> {/* Results table */}
                {/* <Row>
                    <Col style={{ "border":"1px solid black"}}>
                        hello
                    </Col>
                    <Col style={{ "border":"1px solid black"}}>
                        goodbye
                    </Col>
                    <Col style={{ "border":"1px solid black"}}>
                    
                    </Col>
                </Row> */}
                <table>
                    <thead>hello
                    <tr>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </Container>


                
        </div>
    )
}

export default Reports_Users
