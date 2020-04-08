import React, {useState} from 'react';
import logo from '../images/landing.png';
import { Jumbotron, Container, Button } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import './login.css';

const LoginTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Freelance Tester
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            MTaaS Manager
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            MTaaS Admin
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <br />
          <Form>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Tester email" />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password" />
            </FormGroup>
            <Button type="submit" href="/home">Submit</Button>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <br />
          <Form>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Manager email" />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password" />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </TabPane>
        <TabPane tabId="3">
          <br />
          <Form>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Admin email" />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </TabPane>
      </TabContent>
    </div>
  );
}


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
            <LoginTabs/>
          </header>
        </Jumbotron>
      </div>
    )
  }
}

export default Login;
