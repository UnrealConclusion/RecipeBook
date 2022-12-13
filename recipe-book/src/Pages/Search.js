/**
 * Page displays search results 
 */
import {Component, React} from 'react';
import {Link} from 'react-router-dom'
import {Container, Col, Row, Table} from 'react-bootstrap';
import apis from '../API';
 
class Search extends Component{
  
  constructor(props){
    super(props)

    const url = window.location.href.split('/')
    const queryString = url[url.length-1]

    this.state = {
      queryString: queryString,
      searchResults: [],
    }
  }

  componentDidMount= async() => {
    await apis.searchByIngredients(this.state.queryString).then(results => { 
      this.setState({
          searchResults: results.data.data,
      })
    })
  }

  render(){
    return (
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ingredients</th>
                </tr>
              </thead>
              <tbody>
                {this.state.searchResults.map((recipe, i) => <tr key={i}><td>{<Link to={"/recipe/" + recipe["_id"]}>{recipe["name"]}</Link>}</td><td>{recipe["ingredients"].map((ingredient, i) => <p>{ingredient}</p>)}</td></tr>)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
 }
 
 export default Search;