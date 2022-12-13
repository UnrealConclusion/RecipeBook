/**
 * Page allows user to search for recipies by ingredients 
 */
import {Component, React} from 'react';
import {Link} from 'react-router-dom'
import {Button, Container, Col, Row, Form} from 'react-bootstrap';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            queryString: ""
        }
    }

    // calculate the query string from the input
    calcQueryString(input){
        let queryString = ""
        let ingredients = input.split("\n")
        for (let i=0; i<ingredients.length; i++) {
            queryString += ingredients[i]
            if (i < ingredients.length-1){
                queryString += "&"
            }
        }
        this.setState({
            queryString: queryString
        })
    }
    
    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Please Input Each Ingredients On A New Line</Form.Label>
                                <Form.Control as="textarea" 
                                onChange={i => this.calcQueryString(i.target.value)} rows={20}/>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={{display:"flex", justifyContent:"center", alignItem:"center"}}>
                        <Link to={"search/" + this.state.queryString} style={{width: '100%'}}>
                            <Button style={{width: '100%'}} variant="outline-primary">
                                Search
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );

    }
}

export default Home;