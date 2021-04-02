import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ProfileEdit = () => {
    return (
        <div>
            <Form>
                <Form.label>Username</Form.label>
                <Form.control type="text"></Form.control>

                <Form.label>Password</Form.label>
                <Form.control type="password"></Form.control>
            </Form>
        </div>
    )
}

export default ProfileEdit