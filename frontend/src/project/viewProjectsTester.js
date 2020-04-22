import React, { useState, useEffect } from 'react';
import { Container, Button, Badge } from 'reactstrap';
import './viewProject.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { ROOT_URL } from '../config/config';
import { toast } from 'react-toastify';
import TopNav from '../navigation/topnavTester';
import SideNav from '../navigation/sidenavTester';

class ViewProjectManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    componentDidMount() {
        axios.get(ROOT_URL + '/projectsForTester/' + localStorage.getItem("TesterID")).then((response) => {
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
    }

    render() {
        let projects = []
        projects = this.state.projects.map((el) => {
            if (el.active)
                return (

                    <Row >
                        <Card style={{ width: "70%", marginTop: '2%', marginLeft: '12%', marginRight: '3%', color: 'black', fontSize: '15px' }}>
                            <Card.Img variant="top" />
                            <Card.Body>
                                <Card.Title style={{ marginBottom: '3%' }}>{el.name}</Card.Title>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col>
                                        <Row style={{ marginLeft: "10px" }} ><Label style={{ fontWeight: 'bolder', color: 'Blue' }}>Project Details</Label></Row>
                                        <Row style={{ marginLeft: "10px" }}><Label style={{ fontWeight: 'bold' }}>Description : </Label>{el.description}</Row>
                                        <Row style={{ marginLeft: "10px" }}><Label style={{ fontWeight: 'bold' }}>Start Date : </Label> {el.startDate.split("T")[0]}</Row>
                                        <Row style={{ marginLeft: "10px" }}><Label style={{ fontWeight: 'bold' }}>End Date : </Label>{el.endDate.split("T")[0]}</Row>
                                    </Col>

                                    <Col >
                                        <Row style={{ marginLeft: "10px" }} ><Label style={{ fontWeight: 'bolder', color: 'Blue' }}>Project Requirement</Label></Row>
                                        <Row style={{ marginLeft: "10px" }}><Label style={{ fontWeight: 'bold' }}>Technologies Needed: </Label> {el.technologies}</Row>
                                        <Row style={{ marginLeft: "10px" }}><Label style={{ fontWeight: 'bold' }}>Test Criteria : </Label>{el.testCriteria}</Row>
                                    </Col>

                                    <Col md={2}></Col>
                                </Row>

                            </Card.Body>
                        </Card></Row>
                )
        })
        return (
            <div className="homepage">
                <div>
                    <TopNav />
                </div>
                <div className="homepage-left">
                    <SideNav />
                </div>
                <div className="homepage-right">
                    <div className="">
                        <header className="">
                            <h1>My Projects</h1>
                            <Container className="scroll-viewProject">
                                {projects}
                            </Container>
                        </header>
                    </div>
                </div>
            </div>

        )
    }
}

export default ViewProjectManager;
