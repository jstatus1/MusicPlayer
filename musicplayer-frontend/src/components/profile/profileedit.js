import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import axios from 'axios'
import "./profile.css"

const ProfileEdit = () => {
    const [old_username, setOldUsername] = useState('');
    const [new_username, setNewUsername] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [about_me, setAboutMe] = useState('');
    const [account_updated, setUpdated] = useState(false);
     

    const updateAccount = (event) => {

        event.stopPropagation();
        event.preventDefault();

        const queryInput = {
            old_username: old_username,
            new_username: new_username,
            old_password: old_password,
            new_password: new_password,
            first_name: first_name,
            last_name: last_name,
            email: email,
            about_me: about_me
        }

        axios.post('/api/updateProfile', {
        params:{
            old_username: old_username,
            new_username: new_username,
            old_password: old_password,
            new_password: new_password,
            first_name: first_name,
            last_name: last_name,
            email: email,
            about_me: about_me
        }})
        .then((res) => {
            if (res.status === true) { setUpdated(true); }
        }).catch((error) => {
            console.log(error)
        })
        console.log(queryInput);
    }

    return (
        <div>
            <Container>
            <Form onSubmit = {updateAccount}>
                <Row>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>Current Username</Form.Label>
                <Form.Control type="text"
                              value={old_username}
                              onChange={(e) => setOldUsername(e.target.value)}></Form.Control>
                </Col>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>New Username</Form.Label>
                <Form.Control type="text"
                              value={new_username}
                              onChange={(e) => setNewUsername(e.target.value)}></Form.Control>
                </Col>
                </Row>
                <Row>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control type="password"
                              value={old_password}
                              onChange={(e) => setOldPassword(e.target.value)}></Form.Control>
                </Col>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password"
                              value={new_password}
                              onChange={(e) => setNewPassword(e.target.value)}></Form.Control>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text"
                              value={first_name}
                              onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                </Col>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text"
                              value={last_name}
                              onChange={(e) => setLastName(e.target.value)}></Form.Control>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="7">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Col>
            </Row>
            
            <Row>
                <Col md="1"></Col>
                <Col md="7">
                <Form.Label>About Me</Form.Label>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="7">
                <textarea class="about-me-textbox"
                          onchange={(e) => setAboutMe(e.target.value)}></textarea>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="7">
                <Button variant="primary" class="button-padding" type="submit">
                    Save
                </Button>
                </Col>
            </Row>
            </Form>
            </Container>
        </div>
    )
}

export default ProfileEdit
