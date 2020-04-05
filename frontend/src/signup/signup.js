import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import './signup.css';

class SignUp extends React.Component{
  render(){
    return (
      <div className="signup">
        <Jumbotron fluid>
          <Container fluid>
            <h1 center className="display-3">Mobile Testing as a Service</h1>
            <p center className="lead">Sign up as a freelance mobile tester, project manager, or MTaaS administrator!</p>
          </Container>
        </Jumbotron>
        <header className="signup-header">
          <p>SIGNUUP</p>
        </header>
      </div>
    )
  }
}

export default SignUp;
