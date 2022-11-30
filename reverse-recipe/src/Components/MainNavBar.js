import Container from 'react-bootstrap/Container';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import logo from '../SVGs/chef-hat.svg'

export default function MainNavBar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">
            <Image src={logo} width="30" height="30" className="d-inline-block align-top" ></Image>
            &nbsp; Reverse Recipe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Search</Nav.Link>
            <NavDropdown title="Recipes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/recipes/all">All Recipes</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/breakfast">Breakfast</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/lunch">Lunch</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/dinner">Dinner</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/appetizer">Appetizer</NavDropdown.Item>
              <NavDropdown.Item href="/recipes/dessert">Dessert</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/add">Add Recipe</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}