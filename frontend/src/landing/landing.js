import React from 'react';
import logo from '../images/landing.png';
import './landing.css';
import { Jumbotron, Container, Button } from 'reactstrap';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';


import Pranav from './svg/Pranav.png';
import Mitra from './svg/Mitra.png';
import Mukesh from './svg/Mukesh.png';
import Shubham from './svg/Shubham.png';

const people = [
  {
    name: "Pranav Patil",
    image: Pranav,
    subtitle: "MS Software Engineering",
    text: "Frontend, Billing, & Bug Tracker.",
    github: "https://github.com/pranavpatilsce",
    linkedin: "https://www.linkedin.com/in/pranavrpatil/"
  },{
    name: "Mukesh Mogal",
    image: Mukesh,
    subtitle: "MS Software Engineering",
    text: "Backend, Test Runner, & Emulators.",
    github: "https://github.com/MukeshMogal",
    linkedin: "https://www.linkedin.com/in/mukeshmogal"
  },{
    name: "Mitra Nayak",
    image: Mitra,
    subtitle: "MS Software Engineering",
    text: "Backend, Frontend, User Management, & Device Allocations.",
    github: "https://github.com/nayakmitra7",
    linkedin: "https://www.linkedin.com/in/mitra-nayak-21a8b497"
  },{
    name: "Shubham Kumar",
    image: Shubham,
    subtitle: "MS Software Engineering",
    text: "Backend, Project Management, & Test Runner.",
    github: "https://github.com/shubh08",
    linkedin: "https://www.linkedin.com/in/shubhamkumar567"
  }
]

class Landing extends React.Component{

  render(){
    return (
      <div>
        <div className="landing">
          <Container >
            <h1 center className="display-3">Mobile Testing as a Service</h1>
            <p center className="lead">Login or sign up as a freelance mobile tester, project manager, or MTaaS administrator!</p>
          </Container>
        </div>
        <header className="landing-header">
          <img src={logo} className="landing-logo" alt="logo" />
        </header>
        <div className="landing-signup"><Button className="signupButton" href="/signup">Sign up!</Button></div>
        <div className="landing-login"><Button className="loginButton" href="/login">Login</Button></div>
        <div>
          {people.map((peop, index) =>
            <div className="profCard">
              <Card className="profCardTwo">
                <img className="profileImg" src={peop.image}/>
                <CardBody className="profileCardInternal">
                  <CardTitle key={peop.name + "-" + index} >{peop.name}</CardTitle>
                  <CardSubtitle>{peop.subtitle}</CardSubtitle>
                  <CardText>{peop.text}</CardText>
                  <Button color = "secondary" href={peop.github}>Github</Button> {' '}
                  <Button color = "primary" href={peop.linkedin}>LinkedIn</Button>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Landing;
