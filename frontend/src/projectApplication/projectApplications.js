import React, { useState,useEffect } from 'react';
import { Container, Button, Badge} from 'reactstrap';
import './signup.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card'
import axios from 'axios'


const ProjectTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [projectList, setProjectList] = useState([]);
  const [applicationsPending, setApplicationsPending] = useState([]);
  const [applicationsDecisionMade, setApplicationsDecisionMade] = useState([]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const applyProject = (el)=>{
    //managerID : el.managerID._id
  let data = {
  projectID: el._id,
  testerID: '5e8d437fd70e327a6e797d15',
  managerID:el.managerID._id
    }
    axios.post('http://localhost:3010/tester/applyProject',data)
    .then(response=>{
      console.log(response);
      window.location.reload();

    }).catch(err=>console.log('Error',err))
  }





  useEffect(() => {

    axios.defaults.withCredentials = false;  //5e8980d69c4f720491978f7b  5e884c3ce7a72f7dac73b426
    axios.get('http://localhost:3010/tester/loadProjects/5e8d437fd70e327a6e797d15')
      .then((response) => {
        console.log(response);
        let projects = []
        projects = response.data.activeprojects.map((el, i) => {
          return (<Card style={{ width: '18rem', margin: '3rem', color:'black', display: 'flex', flexWrap: 'wrap'}}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text color='blue'>
                {el.description}<br />
                <b>{el.technologies}</b><br />
                <i>{el.testCriteria}</i>
              </Card.Text>
              <Button variant="primary" onClick={()=>applyProject(el)}>Apply</Button>
            </Card.Body>
          </Card>)
        })
        //setProjectList(projects)
        // this.setState({ projects: projectList })
        let applicationsPending = []
        let applicationsDecisionMade = []
        response.data.applications.forEach((el, i) => {
          if(el.projectID!=null)
          if(el.status=='Pending')
          applicationsPending.push(<Card style={{ width: '18rem', margin: '3rem', color:'black', display: 'flex', flexWrap: 'wrap'}}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title><Badge color="secondary">Applied</Badge><br/>{el.projectID.name} </Card.Title>
              <Card.Text color='blue'>
                {el.projectID.description}<br />
                <b>{el.projectID.technologies}</b><br />
                <i>{el.projectID.testCriteria}</i>
              </Card.Text>
            </Card.Body>
          </Card>)
          else
          applicationsDecisionMade.push(<Card style={{ width: '18rem', margin: '3rem', color:'black', display: 'flex', flexWrap: 'wrap'}}>
          <Card.Img variant="top" />
          <Card.Body>
        <Card.Title>{el.status=='Approved'?<Badge color="success">Approved</Badge>:<Badge color="danger">'Rejected'</Badge>}<br/>{el.projectID.name} </Card.Title>
            <Card.Text color='blue'>
              {el.projectID.description}<br />
              <b>{el.projectID.technologies}</b><br />
              <i>{el.projectID.testCriteria}</i>
            </Card.Text>
          </Card.Body>
        </Card>)
        })
        setProjectList(projects)
        setApplicationsPending(applicationsPending)
        setApplicationsDecisionMade(applicationsDecisionMade)
      }, (error) => {
        console.log(error);
      });
  },[]);

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Active Projects

          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Pending Applications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Approved/Rjected Applications
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <br />
        {projectList}
        </TabPane>
        <TabPane tabId="2">
          <br/>
          {applicationsPending}
          {/* <br />
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
              <Input type="textarea" name="text" />
            </FormGroup>
            <FormGroup>
              <h5 >Your company name</h5>
              <Input placeholder="Company name" />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form> */}
        </TabPane>
        <TabPane tabId="3">
          <br/>
          {applicationsDecisionMade}
          {/* <br />
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
          </Form> */}
        </TabPane>
      </TabContent>
    </div>
  );
}

class ProjectApplications extends React.Component {
  render() {
    return (
      <div className="signup">
        <header className="signup-header">
          <ProjectTabs />
        </header>
      </div>
    )
  }
}

export default ProjectApplications;
