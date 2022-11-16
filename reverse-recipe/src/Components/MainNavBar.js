import Container from 'react-bootstrap/Container';
import {Navbar, Nav} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import logo from '../SVGs/chef-hat.svg'

export default function MainNavBar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">
            <Image src={logo} width="30" height="30" className="d-inline-block align-top" ></Image>
            &nbsp; Reverse Recipie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Search</Nav.Link>
            <Nav.Link href="/recipies">Recipies</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}