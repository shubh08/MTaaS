import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import './signup.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';


const SignUpTabs = (props) => {

  const [activeTab, setActiveTab] = useState('1');
  const [testerName, setTesterName] = useState('')
  const [testerEmail, setTesterEmail] = useState('')
  const [testerPassword, setTesterPassword] = useState('')
  const [testerDOB, setTesterDOB] = useState('')
  const [testerAbout, setTesterAbout] = useState('')
  const [testerTechnologies, setTesterTechnologies] = useState('')

  const [managerName, setManagerName] = useState('')
  const [managerEmail, setManagerEmail] = useState('')
  const [managerPassword, setManagerPassword] = useState('')
  const [managerDOB, setManagerDOB] = useState('')
  const [managerAbout, setManagerAbout] = useState('')
  const [managerCompany, setManagerCompany] = useState('')

  const [adminName, setAdminName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminDOB, setAdminDOB] = useState('')


  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const testerNameChangeHandler = e => {
    setTesterName(e.target.value);
  };
  const testerEmailChangeHandler = e => {
    setTesterEmail(e.target.value);
  };
  const testerPasswordChangeHandler = e => {
    setTesterPassword(e.target.value);
  };
  const testerDOBChangeHandler = e => {
    setTesterDOB(e.target.value);
  };
  const testerAboutChangeHandler = e => {
    setTesterAbout(e.target.value);
  };
  const testerTechnologiesChangeHandler = e => {
    setTesterTechnologies(e.target.value);
  };

  const managerNameChangeHandler = e => {
    setManagerName(e.target.value);
  };
  const managerEmailChangeHandler = e => {
    setManagerEmail(e.target.value);
  };
  const managerPasswordChangeHandler = e => {
    setManagerPassword(e.target.value);
  };
  const managerDOBChangeHandler = e => {
    setManagerDOB(e.target.value);
  };
  const managerAboutChangeHandler = e => {
    setManagerAbout(e.target.value);
  };
  const managerCompanyChangeHandler = e => {
    setManagerCompany(e.target.value);
  };


  const adminNameChangeHandler = e => {
    setAdminName(e.target.value);
  };
  const adminEmailChangeHandler = e => {
    setAdminEmail(e.target.value);
  };
  const adminPasswordChangeHandler = e => {
    setAdminPassword(e.target.value);
  };
  const adminDOBChangeHandler = e => {
    setAdminDOB(e.target.value);
  };

  const signupTester = (e) => {
    e.preventDefault();
    const testerDetails = {
      name: testerName,
      about: testerAbout,
      technologies: testerTechnologies,
      email: testerEmail,
      password: testerPassword,
      DOB: testerDOB
    };
    axios.post(ROOT_URL + '/tester/signup', testerDetails).then((response) => {
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          window.location = "/login"
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
  const signupManager = (e) => {
    e.preventDefault();
    const managerDetails = {
      name: managerName,
      about: managerAbout,
      company: managerCompany,
      email: managerEmail,
      password: managerPassword,
      DOB: managerDOB
    };
    axios.post(ROOT_URL + '/manager/signup', managerDetails).then((response) => {
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          window.location = "/login"
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
  const signupAdmin = (e) => {
    e.preventDefault();
    const adminDetails = {
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      DOB: adminDOB
    };
    axios.post(ROOT_URL + '/admin/signup', adminDetails).then((response) => {
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          window.location = "/login"
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
      <TabContent className="textLeftSignup" activeTab={activeTab}>
        <TabPane tabId="1">
          <br />
          <Form onSubmit={signupTester}>
            <FormGroup >
              <h5 >Name</h5>
              <Input placeholder="Enter full name"
                value={testerName}
                onChange={testerNameChangeHandler}
                required />
            </FormGroup>
            <FormGroup>
              <h5>Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login"
                value={testerEmail}
                onChange={testerEmailChangeHandler}
                required />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password"
                value={testerPassword}
                onChange={testerPasswordChangeHandler}
                required />
            </FormGroup>
            <FormGroup>
              <h5 >Date of Birth</h5>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="Birth date"
                value={testerDOB}
                onChange={testerDOBChangeHandler}
                required />
            </FormGroup>
            <FormGroup>
              <h5 >About you</h5>
              <Input type="textarea" name="text"
                value={testerAbout}
                onChange={testerAboutChangeHandler}
                required />
            </FormGroup>
            <FormGroup>
              <h5 >Testing technologies you are comfortable with </h5>
              <Input type="textarea" name="text"
                value={testerTechnologies}
                onChange={testerTechnologiesChangeHandler}
                required />
            </FormGroup>
            <Row>
              <Col></Col>
              <Col><Button className="textCenterSignup" type="submit">Submit</Button></Col>
              <Col></Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <br />
          <Form onSubmit={signupManager}>
            <FormGroup>
              <h5 >Name</h5>
              <Input placeholder="Enter full name"
                value={managerName}
                onChange={managerNameChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login"
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
            <FormGroup>
              <h5 >Date of Birth</h5>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="Birth date"
                value={managerDOB}
                onChange={managerDOBChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <h5 >About you</h5>
              <Input type="textarea" name="text"
                value={managerAbout}
                onChange={managerAboutChangeHandler}
                required />
            </FormGroup>
            <FormGroup>
              <h5 >Your company name</h5>
              <Input placeholder="Company name"
                value={managerCompany}
                onChange={managerCompanyChangeHandler}
                required />
            </FormGroup>
            <Row>
              <Col></Col>
              <Col><Button className="textCenterSignup" type="submit">Submit</Button></Col>
              <Col></Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tabId="3">
          <br />
          <Form onSubmit={signupAdmin}>
            <FormGroup>
              <h5 >Name</h5>
              <Input placeholder="Enter full name"
                value={adminName}
                onChange={adminNameChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <h5 >Email</h5>
              <Input type="email" name="email" id="exampleEmail" placeholder="Account email will be used for login"
                value={adminEmail}
                onChange={adminEmailChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <h5 >Password</h5>
              <Input type="password" name="password" id="examplePassword" placeholder="Account password"
                value={adminPassword}
                onChange={adminPasswordChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup>
              <h5 >Date of Birth</h5>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="Birth date"
                value={adminDOB}
                onChange={adminDOBChangeHandler}
                required
              />
            </FormGroup>
            <Row>
              <Col></Col>
              <Col><Button className="textCenterSignup" type="submit">Submit</Button></Col>
              <Col></Col>
            </Row>
          </Form>
        </TabPane>
      </TabContent>
    </div>
  );
}

class SignUp extends React.Component {
  render() {
    return (
      <div className="signup">
        <Jumbotron fluid>
          <Container fluid>
            <h1 center className="display-3">Mobile Testing as a Service</h1>
            <p center className="lead">Sign up as a freelance mobile tester, project manager, or MTaaS administrator!</p>
          </Container>
          <header className="signup-header">
            <SignUpTabs />
          </header>
        </Jumbotron>
      </div>
    )
  }
}

export default SignUp;
