import 'bootswatch/dist/zephyr/bootstrap.css'
import './custom.css'
import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from './views/Dashboard';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar />
      <Container className='my-4'>
        <Row>
          <Col>
            <Dashboard />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;