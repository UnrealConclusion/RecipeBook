/**
 * Page allows user to search for recipies by ingredients 
 */
import React from 'react';
import {Link} from 'react-router-dom'
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Please Input Ingredients</Form.Label>
                            <Form.Control as="textarea" rows={20}/>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col style={{display:"flex", justifyContent:"center", alignItem:"center"}}>
                    <Link to="/search" style={{width: '100%'}}>
                        <Button style={{width: '100%'}} variant="outline-primary" 
                            onClick={() => 
                                console.log("Searching")
                            }
                            >
                            Search
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;