/**
 * Page displays all recipies 
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col, Card} from 'react-bootstrap';
import apis from '../API'

class Recipes extends Component{
    constructor(props){
        super(props)
        const url = window.location.href.split('/')
        this.state = {
            category: url[url.length-1],
            recipeNames: []
        }
    }

    componentDidMount = async() => {
        this.setState({ isLoading: true })

        if (this.state.category === "all"){
            await apis.getAllRecipeNames().then(recipeNames => {
                this.setState({
                    recipeNames: recipeNames.data.data,
                })
            })
        }
        else{
            await apis.getNamesByCategory(this.state.category).then(recipeNames => {
                this.setState({
                    recipeNames: recipeNames.data.data,
                })
            })
        }
    }

    render(){
        const { category, recipeNames } = this.state

        let cardHeader = "All Recipes"
        if (category === "breakfast"){
            cardHeader = "Breakfast"
        }
        else if (category === "lunch"){
            cardHeader = "Lunch"
        }
        else if (category === "dinner"){
            cardHeader = "dinner"
        }
        else if (category === "appetizer"){
            cardHeader = "appetizer"
        }
        else if (category === "dessert"){
            cardHeader = "dessert"
        }

        return (
            <Container>
                <Row>
                    <Col>
                    <Card>
                        <Card.Header>{cardHeader}</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>Recipes</Card.Title> */}
                                {recipeNames.map(recipeNames => <Card.Text key={recipeNames._id}> <Link to={"/recipe/" + recipeNames._id}>{recipeNames.name}</Link> </Card.Text> )}
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Recipes