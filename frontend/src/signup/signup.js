import React, {useState} from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import './signup.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';

const SignUpTabs = (props) => {
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
              <h5 >Name</h5>
              <Input placeholder="Enter full name" />
            </FormGroup>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login" />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password" />
            </FormGroup>
            <FormGroup>
              <h5 >Date</h5>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="Birth date"
              />
            </FormGroup>
            <FormGroup>
              <h5 >About you</h5>
              <Input type="textarea" name="text"/>
            </FormGroup>
            <FormGroup>
              <h5 >Testing technologies you are comfortable with </h5>
              <Input type="textarea" name="text"/>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <br />
          <Form>
            <FormGroup>
              <h5 >Name</h5>
              <Input placeholder="Enter full name" />
            </FormGroup>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login" />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password" />
            </FormGroup>
            <FormGroup>
              <h5 >Date</h5>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="Birth date"
              />
            </FormGroup>
            <FormGroup>
              <h5 >About you</h5>
              <Input type="textarea" name="text"/>
            </FormGroup>
            <FormGroup>
              <h5 >Your company name</h5>
              <Input placeholder="Company name" />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </TabPane>
        <TabPane tabId="3">
          <br />
          <Form>
            <FormGroup>
              <h5 >Name</h5>
              <Input placeholder="Enter full name" />
            </FormGroup>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login" />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password" />
            </FormGroup>
            <FormGroup>
              <h5 >Date</h5>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="Birth date"
              />
            </FormGroup>
            <FormGroup>
              <h5 >Your company name</h5>
              <Input placeholder="Company name" />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </TabPane>
      </TabContent>
    </div>
  );
}

class SignUp extends React.Component{
  render(){
    return (
      <div className="signup">
        <Jumbotron fluid>
          <Container fluid>
            <h1 center className="display-3">Mobile Testing as a Service</h1>
            <p center className="lead">Sign up as a freelance mobile tester, project manager, or MTaaS administrator!</p>
          </Container>
          <header className="signup-header">
            <SignUpTabs/>
          </header>
        </Jumbotron>
      </div>
    )
  }
}

export default SignUp;
