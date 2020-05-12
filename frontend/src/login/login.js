import React, { useState } from 'react';
import logo from '../images/landing.png';
import { Jumbotron, Container, Button } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import './login.css';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';

const LoginTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const [testerEmail, setTesterEmail] = useState('')
  const [testerPassword, setTesterPassword] = useState('')

  const [managerEmail, setManagerEmail] = useState('')
  const [managerPassword, setManagerPassword] = useState('')

  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  const testerEmailChangeHandler = e => {
    setTesterEmail(e.target.value);
  };
  const testerPasswordChangeHandler = e => {
    setTesterPassword(e.target.value);
  };

  const managerEmailChangeHandler = e => {
    setManagerEmail(e.target.value);
  };
  const managerPasswordChangeHandler = e => {
    setManagerPassword(e.target.value);
  };

  const adminEmailChangeHandler = e => {
    setAdminEmail(e.target.value);
  };
  const adminPasswordChangeHandler = e => {
    setAdminPassword(e.target.value);
  };

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const loginTester = (e) => {
    e.preventDefault();
    const testerDetails = {
      email: testerEmail,
      password: testerPassword
    };
    axios.post(ROOT_URL + '/tester/login', testerDetails).then((response) => {
      if (response.status == 200 && response.data.active) {
        localStorage.setItem('TesterID',response.data.id);
        localStorage.setItem('name',response.data.name);
        window.location = "/homeTester"
        setTimeout(() => {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
        }, 2000);
      } else if (response.status == 200 && !response.data.active) {
        toast.error("Your account has been blocked !", {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }).catch(error => {
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }
  const loginManager = (e) => {
    e.preventDefault();
    const managerDetails = {
      email: managerEmail,
      password: managerPassword
    };
    axios.post(ROOT_URL + '/manager/login', managerDetails).then((response) => {
      if (response.status == 200 && response.data.active) {
        localStorage.setItem('ManagerID',response.data.id);
        localStorage.setItem('name',response.data.name);
        window.location = "/homeManager"
        setTimeout(() => {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
        }, 2000);
      } else if (response.status == 200 && !response.data.active) {
        toast.error("Your account has been blocked!", {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }).catch(error => {
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }
  const loginAdmin = (e) => {
    e.preventDefault();
    const adminDetails = {
      email: adminEmail,
      password: adminPassword
    };
    axios.post(ROOT_URL + '/admin/login', adminDetails).then((response) => {
      if (response.status == 200) {
        localStorage.setItem('AdminID',response.data.id);
        window.location = "/homeAdmin"
        setTimeout(() => {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
        }, 2000);
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }).catch(error => {
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER
      });
    })
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
      <TabContent className="textLeftLogin" activeTab={activeTab}>
        <TabPane tabId="1">
          <br />
          <Form onSubmit={loginTester}>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Tester email"
                value={testerEmail}
                onChange={testerEmailChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password"
                value={testerPassword}
                onChange={testerPasswordChangeHandler}
                required
              />
            </FormGroup>
            <Row>
              <Col></Col>
              <Col><Button className="textCenterLogin" type="submit">Login!</Button></Col>
              <Col></Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <br />
          <Form onSubmit={loginManager}>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Manager email"
                value={managerEmail}
                onChange={managerEmailChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password"
                value={managerPassword}
                onChange={managerPasswordChangeHandler}
                required
              />
            </FormGroup>
            <Row>
              <Col></Col>
              <Col><Button className="textCenterLogin" type="submit">Login!</Button></Col>
              <Col></Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tabId="3">
          <br />
          <Form onSubmit={loginAdmin}>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Admin email"
                value={adminEmail}
                onChange={adminEmailChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Password"
                value={adminPassword}
                onChange={adminPasswordChangeHandler}
                required
              />
            </FormGroup>
            <Row>
              <Col></Col>
              <Col><Button className="textCenterLogin" type="submit">Login!</Button></Col>
              <Col></Col>
            </Row>
          </Form>
        </TabPane>
      </TabContent>
    </div>
  );
}


class Login extends React.Component {
  render() {
    return (
      <div className="login">
          <Container fluid>
            <h1 center className="display-3">Mobile Testing as a Service</h1>
            <p center className="lead">Login as a freelance mobile tester, project manager, or MTaaS administrator!</p>
          </Container>
        <header className="login-header">
          <LoginTabs />
        </header>
      </div>
    )
  }
}

export default Login;
