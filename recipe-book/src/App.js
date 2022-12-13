import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import {MainNavBar} from './Components';
import {Search, Home, Recipes, Recipe, Add, Edit, NotFound} from './Pages';

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
            <Route path="search/:queryString" element={<Search />} />
            <Route path="recipes/:category" element={<Recipes />} />
            <Route path="recipe/:id" element={<Recipe />} />
            <Route path="add" element={<Add />} />
            <Route path="/recipe/edit/:id" element={<Edit />} />
            <Route path='*' element={<NotFound />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;