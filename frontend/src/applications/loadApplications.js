import React, { useState,useEffect } from 'react';
import { Jumbotron, Container, Button, Badge} from 'reactstrap';
import './signup.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card'
import axios from 'axios'


const ProjectTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [projectList, setProjectList] = useState([]);
  const [pastApplications, setpastApplications] = useState([]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const approveApplication = (el)=>{
    //managerID : el.managerID._id
  let data = {
  projectID: el.projectID._id,
  testerID: el.testerID._id,
  applicationID:el._id
    }
    axios.post('http://localhost:8000/manager/approve',data)
    .then(response=>{
      console.log('Application Approved',response);
      window.location.reload();

    }).catch(err=>console.log('Error',err))
  }

  const rejectApplication = (el)=>{
    //managerID : el.managerID._id
  let data = {
    applicationID:el._id
    }
    axios.post('http://localhost:8000/manager/reject',data)
    .then(response=>{
    console.log('Application Rejected',response);
      window.location.reload();

    }).catch(err=>console.log('Error',err))
  }

  

  useEffect(() => {

    axios.defaults.withCredentials = false;  //5e8980d69c4f720491978f7b  5e884c3ce7a72f7dac73b426
    axios.get('http://localhost:8000/manager/loadApplications/5e8981009c4f720491978f7c')
      .then((response) => {
        console.log(response);
        let projects = []
        let pastApplications = []
         response.data.applications.forEach((el, i) => {
            if(el.projectID!=null && el.testerID!=null)
        {
            if(el.status==='Pending')
            projects.push((<Card style={{ width: '18rem', margin: '3rem', color:'black', display: 'flex', flexWrap: 'wrap'}}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>{el.projectID.name}</Card.Title>
              <Card.Text color='blue'>
                {el.projectID.description}<br />
        <b>{el.projectID.startDate}-{el.projectID.endDate}</b><br />
                <i>Applicant Details</i>
                <br/>
                {el.testerID.name}<br />
                {el.testerID.about}<br />
                {el.testerID.technologies}<br />
                {el.testerID.DOB}<br />
              </Card.Text>
              <Button variant="primary" style={{backgroundColor:'#337ab7'}}onClick={()=>approveApplication(el)}>Approve</Button> <br/> <br/>
              <Button variant="danger" style={{backgroundColor:'#d9534f'}} onClick={()=>rejectApplication(el)}>Reject</Button>
            </Card.Body>
          </Card>))
          else
          pastApplications.push(<Card style={{ width: '18rem', margin: '3rem', color:'black', display: 'flex', flexWrap: 'wrap'}}>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>{el.status=='Approved'?<Badge color="success">Approved</Badge>:<Badge color="danger">Rejected</Badge>}<br/>{el.projectID.name} </Card.Title>
            <Card.Text color='blue'>
            {el.projectID.description}<br />
      <b>{el.projectID.startDate}-{el.projectID.endDate}</b><br />
              <i>Applicant Details</i>
              <br/>
              {el.testerID.name}<br />
              {el.testerID.about}<br />
              {el.testerID.technologies}<br />
              {el.testerID.DOB}<br />
            </Card.Text>
          </Card.Body>
        </Card>)

         }
        })
        //setProjectList(projects)
        // this.setState({ projects: projectList })
        setProjectList(projects)
        setpastApplications(pastApplications)
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
            Active Applications

          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Past Applications
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
          {pastApplications}
        </TabPane>
      </TabContent>
    </div>
  );
}

class LoadApplications extends React.Component {
  render() {
    return (
      <div className="signup">
        <Jumbotron fluid>
          <Container fluid>
            <h1 center className="display-3">Mobile Testing as a Service</h1>
          </Container>
          <header className="signup-header">
            <ProjectTabs />
          </header>
        </Jumbotron>
      </div>
    )
  }
}

export default LoadApplications;
