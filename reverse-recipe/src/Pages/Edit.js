/**
 * Page is used to edit a recipe 
 */

import React, { Component } from 'react';
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import apis from '../API'
 
class Add extends Component{
    constructor(props){
        super(props)
        const url = window.location.href.split('/')
        this.state = {
            id: url[url.length-1], // id of the database entry ,

            name: "",
            category: "",
            ingredientFields: [{quantity: "", unit: "", ingredient: ""}],
            instructionFields: [{instruction: ""}]
        }
    }

    componentDidMount = async() => {
        // get recipe name
        await apis.getRecipe(this.state.id).then(Recipe => { 
            console.log(Recipe.data.data[0]["ingredients"])
            let ingredients = []
            for (let i=0; i<Recipe.data.data[0]["ingredients"].length; i++){
                ingredients.push({quantity: Recipe.data.data[0]["quantitys"][i], unit: Recipe.data.data[0]["units"][i], ingredient: Recipe.data.data[0]["ingredients"][i]})
            }

            let instructions = []
            for (let i=0; i<Recipe.data.data[0]["instructions"].length; i++){
                instructions.push({instruction: Recipe.data.data[0]["instructions"][i]})
            }
            
            this.setState({
                name: Recipe.data.data[0]["name"],
                category: Recipe.data.data[0]["category"],
                ingredientFields: ingredients,
                instructionFields: instructions
            })
        })
    }

    // handle input of name 
    nameChange(event){
        this.setState({
            name: event.target.value
        })
    }

    categoryChange(value){
        this.setState({
            category: value
        })
    }

    // handle inputs of ingredients
    ingredientChange(i, event){
        let data = [...this.state.ingredientFields]
        data[i][event.target.name] = event.target.value
        this.setState({
            ingredientFields: data
        })
    }

    // handle inputs of instructions 
    instructionChange(i, event){
        let data = [...this.state.instructionFields]
        data[i][event.target.name] = event.target.value
        this.setState({
            instructionFields: data
        })
    }

    // add an ingredient field
    addIngredient(){
        let current = this.state.ingredientFields
        current.push({quantity: "", unit: "", ingredient: ""})
        this.setState({
            ingredientFields: current
        })
    }

    deleteIngredient(i){
        let current = this.state.ingredientFields
        current.splice(i, 1)
        this.setState({
            ingredientFields: current
        })
    }

    // add an instruction field
    addInstruction(){
        let current = this.state.instructionFields
        current.push({instruction: ""})
        this.setState({
            instructionFields: current
        })
    }

    deleteInstruction(i){
        let current = this.state.instructionFields
        current.splice(i,1)
        this.setState({
            instructionFields: current
        })
    }

    // add recipe to the Database
    updateRecipe = async () => {
        if (this.state.name === ""){
            window.alert("A name is required!")
            return
        }

        let ingredients = []
        let units = []
        let quantitys = []
        for (let i=0; i<this.state.ingredientFields.length; i++){
            ingredients.push(this.state.ingredientFields[i]["ingredient"])
            units.push(this.state.ingredientFields[i]["unit"])
            quantitys.push(this.state.ingredientFields[i]["quantity"])
        }
        console.log(units)
        
        let instructions = []
        for (let i=0; i<this.state.instructionFields.length; i++){
            instructions.push(this.state.instructionFields[i]["instruction"])
        }

        const payload = {"name": this.state.name, "category": this.state.category, "ingredients": ingredients, "units": units, "quantitys": quantitys, "instructions": instructions}
        await apis.updateRecipe(this.state.id, payload).then(res => {
            window.location = "/recipe/" + res.data.id
        })
    }

    cancelEdit(){
        window.location = "/recipe/" + this.state.id
    }

    render(){
        const {ingredientFields, instructionFields } = this.state
        return (
            <Container>
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <Card.Header><h1 style={{alignSelf: "center", textAlign: "center"}}>Edit Recipe</h1></Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Row>
                                        <Col xs={10}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control className="mb-3" type="text" placeholder="Enter a name for the recipe" value={this.state.name} onChange={event => this.nameChange(event)}/>
                                        </Col>
                                        <Col xs={2}>
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select value={this.state.category} onChange={event => this.categoryChange(event.target.value)}>
                                                <option>breakfast</option>
                                                <option>lunch</option>
                                                <option>dinner</option>
                                                <option>appetizer</option>
                                                <option>dessert</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>

                                    <Card.Header className="mb-3"><h3 style={{alignSelf: "center", textAlign: "center"}}>Ingredients</h3></Card.Header>
                                    <Row>
                                        <Col xs={2}>
                                            <Form.Label>quantity</Form.Label>
                                        </Col>
                                        <Col xs={2}>
                                            <Form.Label>unit</Form.Label>
                                        </Col>
                                        <Col xs={8}>
                                            <Form.Label>Ingredient</Form.Label>
                                        </Col>
                                    </Row>
                                    {ingredientFields.map((field, i) => {
                                        return (
                                            <Row className="mb-3" key={i}>
                                                <Col xs={2}>
                                                    <Form.Control type="text" name='quantity' value={field.quantity} onChange={event => this.ingredientChange(i, event)}/>
                                                </Col>
                                                <Col xs={2}>
                                                    <Form.Control type="text" name='unit' value={field.unit} onChange={event => this.ingredientChange(i, event)}/>
                                                </Col>
                                                <Col xs={7}>
                                                    <Form.Control type="text" name='ingredient' value={field.ingredient} onChange={event => this.ingredientChange(i, event)}/>
                                                </Col>
                                                <Col xs={1} style={{ display: "flex" }}>
                                                    <Button variant="danger" style={{ marginLeft: "auto" }} onClick={() => this.deleteIngredient(i)}>x</Button>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                    <Row className="mb-3">
                                        <Col style={{ display: "flex" }}>
                                            <Button variant="outline-info" style={{ marginLeft: "auto" }} onClick={() => this.addIngredient()}>Add Ingredient</Button>
                                        </Col>
                                    </Row>
                             
                                    <Card.Header className="mb-3"><h3 style={{alignSelf: "center", textAlign: "center"}}>Instructions</h3></Card.Header>
                                    {instructionFields.map((field, i) => {
                                        return (
                                            <Row className="mb-3" key={i}>
                                                <Form.Label>Step {i+1}</Form.Label>
                                                <Col xs={11}>
                                                    <Form.Control type="text" value={field.instruction} name='instruction' onChange={event => this.instructionChange(i, event)}/>
                                                </Col>
                                                <Col xs={1} style={{ display: "flex" }}>
                                                    <Button variant="danger" style={{ marginLeft: "auto" }} onClick={() => this.deleteInstruction(i)}>x</Button>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                    <Row>
                                        <Col style={{ display: "flex" }}>
                                            <Button variant="outline-info" style={{ marginLeft: "auto" }} onClick={() => this.addInstruction()}>Add Step</Button>
                                        </Col>
                                    </Row>

                                </Form.Group>
                            </Card.Body>
                            <Card.Footer className="text-muted" style={{ display: "flex" }}>
                                <Button variant="success" onClick={() => this.updateRecipe()}>Save</Button>
                                <Button variant="danger" onClick={() => this.cancelEdit()} style={{ marginLeft: "auto" }}>Cancel</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
 }
 export default Add