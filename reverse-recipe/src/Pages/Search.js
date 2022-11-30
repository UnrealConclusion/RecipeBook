/**
 * Page displays search results 
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Col, Container, Row, Table} from 'react-bootstrap';
import apis from '../API';
 
class Search extends Component{
  constructor(props){
    super(props)
    const url = window.location.href.split('/')
    const queryString = url[url.length-1]
    this.state = {
      queryString: queryString,
      searchResults: [],
      isLoading: true // tells us when api call is complete 
    }
  }

  componentDidMount= async() => {
    await apis.getRecipeByIngredient(this.state.queryString).then(results => { 
      this.setState({
          searchResults: results.data.data,
          isLoading: false
      })
    })
  }

  render(){
    const { isLoading, searchResults } = this.state
    let status = "Loading"
    if (!isLoading){
      status = ""
    }
    return (
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <p>{status}</p>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ingredients</th>
                </tr>
              </thead>
              <tbody>
                { searchResults.map((recipe, i) => <tr key={i}><td>{<Link to={"/recipe/" + recipe["_id"]}>{recipe["name"]}</Link>}</td><td>{recipe["ingredients"].map((ingredient, i) => <p>{ingredient}</p>)}</td></tr>)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
 }
 
 export default Search;