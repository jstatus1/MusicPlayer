import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ProfileEdit = () => {
    return (
        <div>
            <Form>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"></Form.Control>
                
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"></Form.Control>
            </Form>
        </div>
    )
}

export default ProfileEdit
