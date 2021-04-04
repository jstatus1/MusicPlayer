import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Library = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h2>Songs</h2>
                            <Container>
                                {/* Insert data from back-end here */}
                                {/* List component? */}
                            </Container>
                    </Col>
                    <Col>
                        <h2>Albums</h2>
                            <Container>
                                {/* Insert data from back-end here */}
                            </Container>

                    </Col>
                    <Col>
                        <h2>Playlists</h2>
                            <Container>
                                {/* Insert data from back-end here */}
                            </Container>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default Library
