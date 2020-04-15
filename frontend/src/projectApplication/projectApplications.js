import React, { useState,useEffect } from 'react';
import { Container, Button, Badge} from 'reactstrap';
import './projectApplication.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { ROOT_URL } from '../config/config';


const ProjectTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [projectList, setProjectList] = useState([]);
  const [applicationsPending, setApplicationsPending] = useState([]);
  const [applicationsDecisionMade, setApplicationsDecisionMade] = useState([]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const applyProject = (el)=>{
  let data = {
  projectID: el._id,
  testerID: localStorage.getItem('TesterID'),
  managerID:el.managerID._id
    }
    axios.post(ROOT_URL+'/tester/applyProject',data)
    .then(response=>{
      console.log(response);
      window.location.reload();

    }).catch(err=>console.log('Error',err))
  }





  useEffect(() => {

    axios.defaults.withCredentials = false; 
    axios.get(ROOT_URL+'/tester/loadProjects/'+localStorage.getItem('TesterID'))
      .then((response) => {
        let projects = []
        projects = response.data.activeprojects.map((el, i) => {
          if(el.active)
          return (

            <Row >
                <Card style={{ width:"70%", marginTop: '2%',marginLeft:'12%',marginRight:'3%', color: 'black', fontSize: '15px' }}>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title style={{marginBottom:'3%'}}>{el.name}</Card.Title>
               <Row>
                 <Col md ={1}></Col>
                    <Col>
                    <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Project Details</Label></Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Description : </Label>{el.description}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Start Date : </Label> {el.startDate.split("T")[0]}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>End Date : </Label>{el.endDate.split("T")[0]}</Row>
                    </Col>

                    <Col >
                    <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Project Requirement</Label></Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Technologies Needed: </Label> {el.technologies}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Test Criteria : </Label>{el.testCriteria}</Row>
                    </Col>

                    <Col md={2}></Col>
                    </Row>
                    <Row>
                      <Col><Button style={{width:'50%',marginTop:'5%'}} color="success" onClick={()=>applyProject(el)}>Apply</Button></Col>
                    </Row>
       </Card.Body>
              </Card></Row>
          )
        })
        
        let applicationsPending = []
        let applicationsDecisionMade = []
        console.log(response.data.applications)
        response.data.applications.forEach((el, i) => {
          if(el.projectID!=null)
          if(el.status=='Pending' && el.projectID.active)
          applicationsPending.push(
          
            <Row >
            <Card style={{ width:"70%", marginTop: '2%',marginLeft:'12%',marginRight:'3%', color: 'black', fontSize: '15px' }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title style={{marginBottom:'3%'}}>{el.projectID.name}</Card.Title>
          
           <Row>
             <Col md ={1}></Col>
                <Col>
                <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Project Details</Label></Row>
                <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Description : </Label>{el.projectID.description}</Row>
                <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Start Date : </Label> {el.projectID.startDate.split("T")[0]}</Row>
                <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>End Date : </Label>{el.projectID.endDate.split("T")[0]}</Row>
                </Col>

                <Col >
                <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Project Requirement</Label></Row>
                <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Technologies Needed: </Label> {el.projectID.technologies}</Row>
                <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Test Criteria : </Label>{el.projectID.testCriteria}</Row>
                <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Status : </Label><Badge style={{height:'150%',fontSize:'100%',marginLeft:'1%',marginRight:'1%'}} color="warning">Applied </Badge> on {el.appliedOn.split("T")[0]} </Row>
                </Col>
                <Col md={2}></Col>
                </Row>
                
   </Card.Body>
          </Card></Row>)
          else
          if(el.projectID.active)
          applicationsDecisionMade.push(
            <Row>
                <Card style={{ width:"70%", marginTop: '2%',marginLeft:'13%',marginRight:'13%', color: 'black', fontSize: '15px' }}>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title style={{marginBottom:'3%'}}>{el.projectID.name}<br></br> </Card.Title>
                  <Row>
                 <Col md ={1}></Col>
                    <Col>
                    <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Project Details</Label></Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Description : </Label>{el.projectID.description}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Start Date : </Label> {el.projectID.startDate.split("T")[0]}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>End Date : </Label>{el.projectID.endDate.split("T")[0]}</Row>
                    </Col>

                    <Col>
                    <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Project Requirement</Label></Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Technologies Needed: </Label> {el.projectID.technologies}</Row>
                     <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Test Criteria : </Label>{el.projectID.testCriteria}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Status : </Label> {el.status == 'Approved' ? <Badge color="success" style={{height:'150%',fontSize:'100%',marginLeft:'1%'}}>Approved</Badge> : <Badge color="danger" style={{height:'150%',fontSize:'100%',marginLeft:'1%'}}>Rejected</Badge>} </Row>
                    </Col>
                    </Row>
                </Card.Body>
              </Card></Row>
            
            )
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
        <NavItem style={{marginTop:'5%',fontWeight:'bolder'}}>
          <NavLink 
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
           Available Projects

          </NavLink>
        </NavItem>
        <NavItem style={{marginTop:'5%',fontWeight:'bolder'}}>
          <NavLink 
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            My Pending Applications
          </NavLink>
        </NavItem>
        <NavItem style={{marginTop:'5%',fontWeight:'bolder'}}>
          <NavLink 
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            My Approved/Rejected Applications
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        
        <TabPane tabId="1">
        <Container className="scroll-projectApplication">
      
        {projectList}
        </Container>
        </TabPane>
        
        <TabPane tabId="2">
        <Container className="scroll-projectApplication">
          {applicationsPending}
          </Container>
        </TabPane>
        <TabPane tabId="3">
        <Container className="scroll-projectApplication">
          {applicationsDecisionMade}
          </Container>
        </TabPane>
      </TabContent>
    </div>
  );
}

class ProjectApplications extends React.Component {
  render() {
    return (
      <div className="">
        <header className="">
        <Container>
          <ProjectTabs />
          </Container>
        </header>
      </div>
    )
  }
}

export default ProjectApplications;
