/**
 * Page displays a single recipe
 */

import {Component, React} from 'react';
import {Button, Card, Container, Col, Row, Table} from 'react-bootstrap';
import apis from '../API'

class Recipe extends Component{
    constructor(props){
        super(props)

        const url = window.location.href.split('/')

        this.state = {
            id: url[url.length-1], // id of the database entry 

            // recipe data to be loaded in from the database
            name: "", 
            ingredients: [],
            quantitys: [],
            units: [],
            instructions: []
        }
    }

    componentDidMount = async() => {

        // make api call to get the recipe data
        await apis.getRecipe(this.state.id).then(recipe => { 
            this.setState({
                name: recipe.data.data[0].name,
                ingredients: recipe.data.data[0].ingredients,
                quantitys: recipe.data.data[0].quantitys,
                units: recipe.data.data[0].units,
                instructions: recipe.data.data[0].instructions,
            })
        }).catch(error => {
            console.log("Error " + error.response.status + ": " + error.response.statusText)
            window.location = '/*'
        })
    }

    // take the user to the edit page
    edit(){
        window.location = "/recipe/edit/" + this.state.id
    }

    // make api call to delete the recipe from the database
    delete = async() => {
        await apis.deleteRecipe(this.state.id).then(() => {
            window.location = "/recipes/all"
        })
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <Card.Header><h1 className="mb-3" style={{alignSelf: "center", textAlign: "center"}} >{this.state.name}</h1></Card.Header>
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
                                            <td><ul>{this.state.ingredients.map((ingredient, i) => <li key={i}>{this.state.quantitys[i]} {this.state.units[i]} {ingredient}</li>)}</ul></td> 
                                            <td><ol>{this.state.instructions.map((instruction, i) => <li key={i}>{instruction}</li>)}</ol></td> 
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