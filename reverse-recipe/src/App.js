import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import {MainNavBar} from './Components';
import {Search, Home, Recipies} from './Pages';

function App() {
  return (
    <Container>
      <Row>
        <Col><MainNavBar></MainNavBar></Col>
      </Row>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="recipies" element={<Recipies />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;