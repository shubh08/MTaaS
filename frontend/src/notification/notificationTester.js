import React, { useState } from 'react';
import {  Alert } from 'reactstrap';
import './Notification.css'
import {  Row, Col, Container } from 'reactstrap';
import TopNav from '../navigation/topnavTester';
import SideNav from '../navigation/sidenavTester';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';

class NotificationTester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            notifications: []
        };
    }
    
    componentDidMount() {
     

        axios.get(ROOT_URL + '/tester/notification/' + localStorage.getItem('TesterID')).then((response) => {

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
    
    
    render() {

       
        var allNotifications = [];
        this.state.notifications.map((notif) => {

            if (notif.severity == 1) {
                var date = notif.createdOn.split("T")[0];
                allNotifications.push(

                    <Alert color="danger" className ="embossed-heavy">
                        <Row><strong>Project Name :</strong> {notif.projectID.name}</Row>
                        <Row><strong>Manager Name : </strong>{notif.managerID.name} </Row>
                        <Row><strong>Company Name : </strong>{notif.managerID.company} </Row>
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
                        <Row><strong>Manager Name : </strong>{notif.managerID.name} </Row>
                        <Row><strong>Company Name : </strong>{notif.managerID.company} </Row>
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
                        <Row><strong>Manager Name : </strong>{notif.managerID.name} </Row>
                        <Row><strong>Company Name : </strong>{notif.managerID.company} </Row>
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

                    <Container className="">
                        <Row className="notif-margin-bottom-2">
                        <Col md={2}></Col>
                            <Col > <h1>My Notifications</h1></Col>
                            <Col md={2}></Col>
                        </Row>
                        <Row className=" scrollBig" >
                            <Col md={2}></Col>
                            <Col > {allNotifications}</Col>
                            <Col md={2}></Col>
                        </Row>
                       
                    </Container>

                </div>
            </div>
        )
    }
}

export default NotificationTester;
