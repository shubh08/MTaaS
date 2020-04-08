import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card, CardTitle, CardText, Alert } from 'reactstrap';
import './Notification.css'
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import TopNav from '../navigation/topnavManager';
import SideNav from '../navigation/sidenavManager';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';

class NotificationManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            projects: [],
            notifications: [],
            description:'',
            projectID:'',
            severity :''
        };
    }
    descriptionChangeHandler = e => {
        this.setState({ description: e.target.value });
    };
    projectChangeHandler = e => {
        console.log(e)
        this.setState({ projectID: e.target.value });
    };
    severityChangeHandler = e => {
        this.setState({ severity: e.target.value })
    };
    componentDidMount() {
        axios.get(ROOT_URL + '/projectsForManager/' + localStorage.getItem('ManagerID')).then((response) => {
            if (response.status == 200) {
                this.setState({ projects: response.data.projects });
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

        axios.get(ROOT_URL + '/manager/notification/' + localStorage.getItem('ManagerID')).then((response) => {

            if (response.status == 200) {
                this.setState({ notifications: response.data.notifications });
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
    toggle = () => {
        let val = this.state.modal
        this.setState({ modal: !val })
    }
    createNotif = (e) => {
        e.preventDefault();
        if(this.state.projectID == ''){
            toast.error('Please select project', {
                position: toast.POSITION.TOP_CENTER
            });  
        } else if(this.state.severity == '' ){
            toast.error('Please select severity', {
                position: toast.POSITION.TOP_CENTER
            });  
        } 
        var notifData ={ description : this.state.description, managerID : localStorage.getItem('ManagerID'), projectID : this.state.projectID, severity : this.state.severity}
        
        axios.post(ROOT_URL + '/manager/createNotification',notifData).then((response) => {
            console.log(response)
            if (response.status == 200) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                setTimeout(() => {
                    window.location.reload()
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
    render() {

        var addDropDown = this.state.projects.map((project) => {
            return (<option value={project._id}>{project.name}</option>)
        })
        var allNotifications = [];
        this.state.notifications.map((notif) => {

            if (notif.severity == 1) {
                var date = notif.createdOn.split("T")[0];
                allNotifications.push(

                    <Alert color="danger" className ="embossed-heavy">
                        <Row><strong>Project Name :</strong> {notif.projectID.name}</Row>
                        <Row><strong>Date : </strong>{date}</Row>
                        <Row><strong>Content : </strong>{notif.description}</Row>
                        <Row><strong>Severity : </strong>Critical </Row>
                    </Alert>


                )
            } else if (notif.severity == 2) {
                var date = notif.createdOn.split("T")[0];
                allNotifications.push(

                    <Alert color="warning" className ="embossed-heavy">
                        <Row><strong>Project Name : </strong> {notif.projectID.name}</Row>
                        <Row><strong>Date : </strong> {date}</Row>
                        <Row><strong>Content : </strong>  {notif.description}</Row>
                        <Row><strong>Severity : </strong>Major  </Row>
                    </Alert>


                )
            } else {
                var date = notif.createdOn.split("T")[0];
                allNotifications.push(

                    <Alert body color="success" className ="embossed-heavy">
                        <Row><strong>Project Name : </strong>{notif.projectID.name}</Row>
                        <Row><strong>Date :</strong> {date}</Row>
                        <Row><strong>Content :</strong> {notif.description}</Row>
                        <Row><strong>Severity : </strong>Minor </Row>
                    </Alert>


                )
            }


        })
        return (
            <div className="createProject">
                <div>
                    <TopNav />
                </div>
                <div className="createProject-left">
                    <SideNav />
                </div>
                <div className="createProject-right">

                    <Container className="profile-margin-top">
                        <Row>
                            <Col md={2}></Col>
                            <Col><Button color="primary" className="notif-width-100" onClick={this.toggle}>Create Notification</Button></Col>
                            <Col md={2}></Col>
                        </Row>
                    <div >
                        <Row className="notif-margin-top-5 scroll" >
                            <Col md={2}></Col>
                            <Col > {allNotifications}</Col>
                            <Col md={2}></Col>
                        </Row>
                        </div> 
                    </Container>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Create Notification</ModalHeader>
                        <ModalBody>
                            <Form className="profile-margin-increase-top" onSubmit={this.createNotif}>

                                <FormGroup>
                                    <h5>Projects</h5>
                                    <Input type="select" name="backdrop" id="backdrop"  onChange={this.projectChangeHandler}>
                                        <option value={0}>Select Project</option>
                                        {addDropDown}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <h5>Severity</h5>
                                    <Input type="select" name="backdrop" id="backdrop" onChange={this.severityChangeHandler} >
                                    <option value={0}>Select Severity</option>
                                        <option value={1}>Critical</option>
                                        <option value={2}>Major</option>
                                        <option value={3}>Minor</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup >
                                    <h5 >Description </h5>
                                    <Input type="textarea" name="text" 
                                    value={this.state.description}
                                    onChange={this.descriptionChangeHandler}
                                        required />
                                </FormGroup>

                                <Row className="notif-margin-top-15">
                                    <Col></Col>
                                    <Col><Button color="success" className="notif-width-100" type="submit" >Create</Button></Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>


                </div>
            </div>
        )
    }
}

export default NotificationManager;
