import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import './Reports.css'


const Reports_Users = () => {

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isMusician, setMusician] = useState(false);
    const [songData, setSongData] = useState([]);


    const userSearch = (event) => {

        event.stopPropagation();
        event.preventDefault();

        const queryInput = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            isMusician: isMusician
        }

        axios.get('http://localhost:5000/api/get/reports/users', {
        params:{username: username,
        firstName: firstName,
        lastName: lastName,
        isMusician: isMusician}})
        .then((res) => {
            setSongData(res.data);
            console.log(songData);
        }).catch((error) => {
            console.log(error);
        })

        console.log(queryInput);

        

    }
    

    return (
        <div>
            <h2 style={{ "textAlign": "center", "paddingTop":"0.5em" }}>Generate Reports</h2>

            <Row>
                <Col md="3"></Col>
                <Col>
                    <div style={{"paddingTop":"1.5em"}}>
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
                    <h5 style={{ "textAlign":"center", "paddingTop":"1em"}}>Search for Users</h5>
                    
                    <Form onSubmit={userSearch}>
                        <Row>
                            <Col md="2"/>
                                <Col md="4">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control   type="text" 
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}></Form.Control>
                                </Col>
                                <Col style={{"paddingTop":"2em"}}>
                                    <Form.Check type="checkbox" 
                                                label="Musician?"
                                                onChange={(e) => setMusician(!isMusician)}></Form.Check>
                                </Col>
                                
                            <Col md="2"/>
                        </Row>
                        <Row>
                            <Col md="2"/>
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control   type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control   type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}></Form.Control>
                            </Col>
                            <Col md="2"/>
                        </Row>
                        <Row style={{"paddingBottom":"1em", "paddingTop":"1em"}}>
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
                <Row>
                    <Col style={{ "border":"1px solid black"}}>
                        {songData.map(row => {
                            return <div>
                                {row.username}
                            </div>
                            })
                        }
                    
                    </Col>
                    <Col style={{ "border":"1px solid black"}}>
                        {songData.first_name}
                    </Col>
                    <Col style={{ "border":"1px solid black"}}>
                    
                    </Col>
                </Row>
                
            </Container>


                
        </div>
    )
}

export default Reports_Users
