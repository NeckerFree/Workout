import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import AuthComponent from './components/AuthComponent';
import FreeComponent from './components/FreeComponent';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Register from './components/Register';

const App = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Side Project</h1>
            <section id="navigation">
              <a href='/'>Home</a>
              <a href='/free'>Free Component</a>
              <a href='/auth'>Auth Component</a>
            </section>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}><Register /></Col>
          <Col xs={12} sm={12} md={6} lg={6}><Login /></Col>
        </Row>
        <Routes>
          <Route exact path="/" element={Account} />
          <Route exact path="/free" element={FreeComponent} />
        </Routes>
        <ProtectedRoutes path="/auth" element={AuthComponent} />
      </Container>
    </>
  )
}

export default App;
