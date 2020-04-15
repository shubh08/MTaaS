import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Button, Badge } from 'reactstrap';
import './loadApplication.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { ROOT_URL } from '../config/config';
import { toast } from 'react-toastify';

const ProjectTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [projectList, setProjectList] = useState([]);
  const [pastApplications, setpastApplications] = useState([]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const approveApplication = (el) => {
    //managerID : el.managerID._id
    let data = {
      projectID: el.projectID._id,
      testerID: el.testerID._id,
      applicationID: el._id
    }
    axios.post(ROOT_URL + '/manager/approve', data)
      .then(response => {
        console.log('Application Approved', response);
        
        toast.success("Application Approved", {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }).catch(err => console.log('Error', err))
  }

  const rejectApplication = (el) => {
    //managerID : el.managerID._id
    let data = {
      applicationID: el._id
    }
    axios.post(ROOT_URL + '/manager/reject', data)
      .then(response => {
        console.log('Application Rejected', response);
        toast.error("Application Rejected", {
          position: toast.POSITION.TOP_CENTER
        });
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch(err => console.log('Error', err))
  }



  useEffect(() => {

    axios.defaults.withCredentials = false;  //5e8980d69c4f720491978f7b  5e884c3ce7a72f7dac73b426
    axios.get(ROOT_URL + '/manager/loadApplications/' + localStorage.getItem('ManagerID'))
      .then((response) => {
        let projects = []
        let pastApplications = []
        response.data.applications.forEach((el, i) => {
          if (el.projectID != null && el.testerID != null) {
            if (el.status === 'Pending')
              projects.push(
               
                <Row >
                <Card style={{ width:"100%", marginTop: '2%',marginLeft:'10%',marginRight:'13%', color: 'black', fontSize: '15px' }}>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>{el.testerID.name}</Card.Title>
               <Row>
                 <Col md ={1}></Col>
                    <Col>
                    <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Project Details</Label></Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Project Name : </Label>{el.projectID.name}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Description : </Label>{el.projectID.description}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>Start Date : </Label> {el.projectID.startDate.split("T")[0]}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>End Date : </Label>{el.projectID.endDate.split("T")[0]}</Row>
                    </Col>

                    <Col>
                    <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Applicant Details</Label></Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}>About : </Label>{el.testerID.about}</Row>
                    <Row style={{marginLeft:"10px"}}><Label style={{fontWeight:'bold'}}> Technologies : </Label>{el.testerID.technologies}</Row>
                    </Col>

                    <Col  md ={2}>
                    
                    <Row><Button variant="primary" style={{ backgroundColor: '#337ab7',marginBottom:'10%' }} onClick={() => approveApplication(el)}>Approve</Button></Row>
                    <Row><Button variant="danger" style={{ backgroundColor: '#d9534f' }} onClick={() => rejectApplication(el)}>Reject</Button></Row>
                  
                    </Col>
                    </Row>
       </Card.Body>
              </Card></Row>)
            else
              pastApplications.push(
              <Row>
                <Card style={{ width:"70%", marginTop: '2%',marginLeft:'13%',marginRight:'13%', color: 'black', fontSize: '15px' }}>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>{el.testerID.name}<br></br> </Card.Title>
                  <Row>
                 <Col md ={1}></Col>
                    <Col>
                    <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Project Details</Label></Row>
                    <Row style={{marginLeft:"10px"}}><Label>Project Name : </Label>{el.projectID.name}</Row>
                    <Row style={{marginLeft:"10px"}}><Label>Description : </Label>{el.projectID.description}</Row>
                    <Row style={{marginLeft:"10px"}}><Label>Start Date : </Label> {el.projectID.startDate.split("T")[0]}</Row>
                    <Row style={{marginLeft:"10px"}}><Label>End Date : </Label>{el.projectID.endDate.split("T")[0]}</Row>
                    </Col>

                    <Col>
                    <Row style={{marginLeft:"10px"}} ><Label style={{fontWeight:'bolder',color:'Blue'}}>Applicant Details</Label></Row>
                    <Row style={{marginLeft:"10px"}}><Label>Name : </Label>{el.testerID.name}</Row>
                    <Row style={{marginLeft:"10px"}}><Label>About : </Label>{el.testerID.about}</Row>
                    <Row style={{marginLeft:"10px"}}><Label>Technologies : </Label>{el.testerID.technologies}</Row>
                    <Row style={{marginLeft:"10px"}}><Label>Status : </Label> {el.status == 'Approved' ? <Badge color="success" style={{height:'150%',fontSize:'100%',marginLeft:'1%'}}>Approved</Badge> : <Badge color="danger" style={{height:'150%',fontSize:'100%',marginLeft:'1%'}}>Rejected</Badge>} </Row>
                    </Col>
                    </Row>
                </Card.Body>
              </Card></Row>)

          }
        })
        setProjectList(projects)
        setpastApplications(pastApplications)
      }, (error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
   
          <Nav tabs>
            <NavItem style={{marginTop:'5%',fontWeight:'bolder'}}>
              <NavLink 
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Active Applications
    
          </NavLink>
            </NavItem >
            <NavItem style={{marginTop:'5%',fontWeight:'bolder'}}>
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
            <Container className="scroll-loadApplications">
               {projectList} 
               </Container>
            </TabPane>
            <TabPane tabId="2">
            <Container className="scroll-loadApplications">
              {pastApplications} 
              </Container>
            </TabPane>
           
          </TabContent>
 
    </div>

  );
}

class LoadApplications extends React.Component {
  render() {
    return (
      <div className="loadApplication">
        <header className="">
          <Container>
          <ProjectTabs />
          </Container>
        </header>
      </div>
    )
  }
}

export default LoadApplications;
