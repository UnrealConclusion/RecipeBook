/**
 * Page displays a single recipe
 */

import {React, Component} from 'react';
import {Container, Row, Col, Table, Card, Button} from 'react-bootstrap';
import apis from '../API'

class Recipe extends Component{
    constructor(props){
        super(props)
        const url = window.location.href.split('/')
        this.state = {
            id: url[url.length-1], // id of the database entry 
            isLoading: true, // tells us when api call is complete 

            // recipe data
            Name: "",
            Ingredients: [],
            Quantitys: [],
            Units: [],
            Instructions: [],

            modalShow: false
        }
    }

    componentDidMount = async() => {
        // get recipe name
        await apis.getRecipe(this.state.id).then(Recipe => { 
            console.log(Recipe)
            this.setState({
                Name: Recipe.data.data[0]["name"],
                Ingredients: Recipe.data.data[0]["ingredients"],
                Quantitys: Recipe.data.data[0]["quantitys"],
                Units: Recipe.data.data[0]["units"],
                Instructions: Recipe.data.data[0]["instructions"],
                isLoading: false
            })
        }).catch(err => {
            console.log("there was an error")
            console.log(err)
            window.location = '/*'
        })
    }

    edit(){
        window.location = "/recipe/edit/" + this.state.id
    }

    delete = async() => {
        await apis.deleteRecipe(this.state.id).then(() => {
            window.location = "/recipes/all"
        })
    }

    render(){
        const { Name, Ingredients, Quantitys, Units, Instructions, isLoading } = this.state
        let header = "Loading ..."
        if (!isLoading){
            header = Name
        }
        return (
            <Container>
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <Card.Header><h1 className="mb-3" style={{alignSelf: "center", textAlign: "center"}} >{header}</h1></Card.Header>
                            <Card.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th><h2 style={{alignSelf: "center", textAlign: "center"}} >Ingredients</h2></th>
                                            <th><h2 style={{alignSelf: "center", textAlign: "center"}} >Instructions</h2></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><ul>{Ingredients.map((ingredient, i) => <li key={i}>{Quantitys[i]} {Units[i]} {ingredient}</li>)}</ul></td> 
                                            <td><ol>{Instructions.map((instruction, i) => <li key={i}>{instruction}</li>)}</ol></td> 
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                            <Card.Footer className="text-muted" style={{ display: "flex" }}>
                                {/* <Button variant="outline-warning">Favorite</Button> */}
                                <Button variant="outline-info" style={{ marginLeft: "auto" }} onClick={() => this.edit()}>Edit</Button>
                                <Button variant="danger" style={{ marginLeft: "10px" }} onClick={() => {if(window.confirm('Warning this cannot be undone')){this.delete()}}}>Delete</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Recipe