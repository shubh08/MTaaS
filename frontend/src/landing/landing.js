import React from 'react';
import logo from '../images/landing.png';
import './landing.css';
import { Jumbotron, Container, Button } from 'reactstrap';

class Landing extends React.Component{
  render(){
    return (
      <div className="landing">
        <Jumbotron fluid>
          <Container fluid>
            <h1 center className="display-3">Mobile Testing as a Service</h1>
            <p center className="lead">Login or sign up as a freelance mobile tester, project manager, or MTaaS administrator!</p>
          </Container>
          <header className="landing-header">
            <img src={logo} className="landing-logo" alt="logo" />
            <div classname="landing-signup"><Button href="/signup">Sign up!</Button></div>
            <div classname="landing-login"><Button href="/login">Login</Button></div>
          </header>
        </Jumbotron>
      </div>
    )
  }
}

export default Landing;

{/*
  <a
    className="landing-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
  Learn React
</a>

  */}
