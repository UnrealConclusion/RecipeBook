/**
 * Page allows a recipe to be added 
 */

import{React, Component} from 'react';
import {Button, Card, Container, Col, Row, Image, Form} from 'react-bootstrap';
import api from '../API'
import xIcon from '../SVGs/x-lg.svg'
import upArrow from '../SVGs/arrow-up.svg' 
import downArrow from '../SVGs/arrow-down.svg' 

class Add extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "", // name of the recipe
            category: "breakfast", // category of recipe
            ingredientFields: [{quantity: "", unit: "", ingredient: ""}], // array contains each input field for ingredients 
            instructionFields: [{instruction: "", upDisabled: true, downDisabled: true}] // array contains each input field for instructions 
        }
    }

    // update the value of name in respond to changes to the input field
    nameChange(event){
        this.setState({
            name: event.target.value
        })
    }

    // update the value of catagory in respond to a different value being selected 
    categoryChange(value){
        this.setState({
            category: value
        })
    }

    // update the value of the ingredients array in respond to changes to the input fields 
    ingredientChange(i, event){
        let data = [...this.state.ingredientFields]
        data[i][event.target.name] = event.target.value
        this.setState({
            ingredientFields: data
        })
    }

    // update the value of the instructions array in respond to changes to the input fields 
    instructionChange(i, event){
        let data = [...this.state.instructionFields]
        data[i][event.target.name] = event.target.value
        this.setState({
            instructionFields: data
        })
    }

    // add a new ingredient field to the ingredients field array
    addIngredient(){
        let current = this.state.ingredientFields
        current.push({quantity: "", unit: "", ingredient: ""})
        this.setState({
            ingredientFields: current
        })
    }

    // delete a ingredient fields from the ingredients field array 
    deleteIngredient(i){
        let current = this.state.ingredientFields
        current.splice(i, 1)
        this.setState({
            ingredientFields: current
        })
    }

    // add a new instruction field to the instructions field array
    addInstruction(){
        let current = this.state.instructionFields

        // disable both buttons if this is the only instruction
        if (current.length === 0){
            current.push({instruction: "", upDisabled: true, downDisabled: true})
        }

        // enable the down button of the current instruction while disabling the down button of the new instruction
        else{
            current[current.length-1].downDisabled = false
            current.push({instruction: "", upDisabled: false, downDisabled: true})
        }

        this.setState({
            instructionFields: current
        })
    }

    // delete a instruction field from the instructions field array
    deleteInstruction(i){
        let current = this.state.instructionFields

        if (current.length > 1){
            // disable the up button of the next instruction if this is the 1st instruction and it is not the only instruction
            if (i === 0 && current.length > 1){
                current[i+1].upDisabled = true
            }

            // disable the down button of the last instruction if this is the last instruction and it is not the only instruction
            else if (i === current.length-1){
                current[i-1].downDisabled = true
            }
        }

        current.splice(i,1)
        this.setState({
            instructionFields: current
        })
    }

    // move an instruction up
    moveInstructionUp(i){
        let current = this.state.instructionFields
        let temp = current[i].instruction

        current[i].instruction = current[i-1].instruction
        current[i-1].instruction = temp

        console.log(current[i])
        this.setState({
            instructionFields: current
        })
    }

    // move an instruction down 
    moveInstructionDown(i){
        let current = this.state.instructionFields
        let temp = current[i].instruction

        current[i].instruction = current[i+1].instruction
        current[i+1].instruction = temp

        console.log(current[i])
        this.setState({
            instructionFields: current
        })
    }

    // add the recipe to the Database
    addRecipe = async () => {

        // check that the recipe has a name
        if (this.state.name === ""){
            window.alert("A name is required!")
            return
        }

        // push the values of the ingredient fields into an array
        let ingredients = []
        let units = []
        let quantitys = []
        for (let i=0; i<this.state.ingredientFields.length; i++){
            ingredients.push(this.state.ingredientFields[i].ingredient)
            units.push(this.state.ingredientFields[i].unit)
            quantitys.push(this.state.ingredientFields[i].quantity)
        }
        
        // push the values of the instruction fields into an array
        let instructions = []
        for (let i=0; i<this.state.instructionFields.length; i++){
            instructions.push(this.state.instructionFields[i]["instruction"])
        }

        // put everything into a payload object 
        const payload = {"name": this.state.name, "category": this.state.category, "ingredients": ingredients, "units": units, "quantitys": quantitys, "instructions": instructions}
        
        // call api to add recipe
        await api.addRecipe(payload).then(res => {
            window.location = "/recipe/" + res.data.id // display the new recipe
        })
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Card className="mb-3">
                            <Card.Header><h1 style={{alignSelf: "center", textAlign: "center"}}>New Recipe</h1></Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Row>
                                        <Col xs={10}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control className="mb-3" type="text" placeholder="Enter a name for the recipe" defaultValue={this.state.name} onChange={event => this.nameChange(event)}/>
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
                                    {this.state.ingredientFields.map((field, i) => {
                                        return (
                                            <Row className="mb-3" key={i}>
                                                <Col xs={2}>
                                                    <Form.Control type="text" value={field.quantity} name='quantity' onChange={event => this.ingredientChange(i, event)}/>
                                                </Col>
                                                <Col xs={2}>
                                                    <Form.Control type="text" value={field.unit} name='unit' onChange={event => this.ingredientChange(i, event)}/>
                                                </Col>
                                                <Col xs={7}>
                                                    <Form.Control type="text" value={field.ingredient} name='ingredient' onChange={event => this.ingredientChange(i, event)}/>
                                                </Col>
                                                <Col xs={1} style={{display: "flex"}}>
                                                    <Button variant="outline-danger" style={{marginLeft: "auto"}} onClick={() => this.deleteIngredient(i)}>
                                                        <Image src={xIcon}></Image>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                    <Row className="mb-3">
                                        <Col style={{ display: "flex" }}>
                                            <Button variant="outline-info" style={{marginLeft: "auto"}} onClick={() => this.addIngredient()}>Add Ingredient</Button>
                                        </Col>
                                    </Row>
                                    <Card.Header className="mb-3"><h3 style={{alignSelf: "center", textAlign: "center"}}>Instructions</h3></Card.Header>
                                    {this.state.instructionFields.map((field, i) => {
                                        return (
                                            <Row className="mb-3" key={i}>
                                                <Col xs={10}>
                                                    <Form.Control type="text" value={field.instruction} name='instruction' onChange={event => this.instructionChange(i, event)}/>
                                                </Col>
                                                <Col xs={2} style={{display: "flex"}}>
                                                    <Button variant="outline-secondary" style={{marginLeft: "20px"}} disabled={field.upDisabled} onClick={() => this.moveInstructionUp(i)}>
                                                        <Image src={upArrow}></Image>
                                                    </Button>
                                                    <Button variant="outline-secondary" style={{marginLeft: "10px"}} disabled={field.downDisabled} onClick={() => this.moveInstructionDown(i)}>
                                                        <Image src={downArrow}></Image>
                                                    </Button>
                                                    <Button variant="outline-danger" style={{marginLeft: "auto"}} onClick={() => this.deleteInstruction(i)}>
                                                        <Image src={xIcon}></Image>
                                                    </Button>
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
                                <Button variant="outline-success" onClick={() => this.addRecipe()}>Add</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
 }
 export default Add