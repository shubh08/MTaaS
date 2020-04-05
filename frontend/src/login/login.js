import React from 'react';
import logo from '../images/landing.png';
import { Jumbotron, Container, Button } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import './login.css';

class Login extends React.Component{
  render(){
    return (
      <div className="login">
        <Jumbotron fluid>
          <Container fluid>
            <h1 center className="display-3">Mobile Testing as a Service</h1>
            <p center className="lead">Login as a freelance mobile tester, project manager, or MTaaS administrator!</p>
          </Container>
          <header className="login-header">

          </header>
        </Jumbotron>
      </div>
    )
  }
}

export default Login;
