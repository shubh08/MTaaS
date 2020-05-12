import React, { useState } from 'react';
import './createProject.css';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import TopNav from '../navigation/topnavTester';
import SideNav from '../navigation/sidenavManager';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';


class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            startDate: '',
            endDate: '',
            description: '',
            technologies: '',
            testCriteria: '',
            today : ''
        };
    }
    componentDidMount(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        this.setState({today : yyyy + '-' + mm + '-' + dd })

    }
    projectNameChangeHandler = e => {
        this.setState({ name: e.target.value });
    };
    projectStartDateChangeHandler = e => {
        this.setState({ startDate: e.target.value });
    };
    projectEndDateChangeHandler = e => {
        this.setState({ endDate: e.target.value })
    };
    projectDescriptionChangeHandler = e => {
        this.setState({ description: e.target.value })
    };
    projectTechnologiesChangeHandler = e => {
        this.setState({ technologies: e.target.value })
    };
    projectTestCriteriaChangeHandler = e => {
        this.setState({ testCriteria: e.target.value })
    };

    CreateProject = (e) => {
        e.preventDefault();
        var projectData = { name: this.state.name, startDate: this.state.startDate, endDate: this.state.endDate, description: this.state.description, technologies: this.state.technologies, testCriteria: this.state.testCriteria, managerID: localStorage.getItem('ManagerID') }
        axios.post(ROOT_URL + '/manager/createProject', projectData).then((response) => {
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

        return (
            <div className="createProject">
                <TopNav />
                <SideNav />
                <div className="createProject-right">
                    <div>
                        <div>
                            <Container className="createProject-margin-top">
                                <Row>
                                    <Col md={3} className="createProject-white"></Col>
                                    <Col md={6} className="createProject-div-border">
                                        <Row>
                                            <Col md={12} className="createProject-text-center"><h2>New Project</h2></Col>
                                        </Row>
                                        <Form className="createProject-margin-increase-top" onSubmit={this.CreateProject}>
                                            <FormGroup >
                                                <h5 >Project Name </h5>
                                                <Input placeholder="Enter project name"
                                                    id="name"
                                                    value={this.state.name}
                                                    onChange={this.projectNameChangeHandler}
                                                    required />
                                            </FormGroup>
                                            <FormGroup>
                                                <h5 >Project Start Date</h5>
                                                <Input
                                                    type="date"
                                                    name="date"
                                                    id="dob"
                                                    min= {this.state.today}
                                                    placeholder="Start date"
                                                    value={this.state.startDate}
                                                    onChange={this.projectStartDateChangeHandler}
                                                    required />
                                            </FormGroup>
                                            <FormGroup>
                                                <h5 >Project End Date</h5>
                                                <Input
                                                    type="date"
                                                    name="date"
                                                    id="dob"
                                                    placeholder="End date"
                                                    min = {this.state.startDate}
                                                    value={this.state.endDate}
                                                    onChange={this.projectEndDateChangeHandler}
                                                    required />
                                            </FormGroup>
                                            <FormGroup>
                                                <h5>Project Description</h5>
                                                <Input placeholder="Project Description"
                                                    value={this.state.description}
                                                    onChange={this.projectDescriptionChangeHandler}
                                                    type="textarea"
                                                    name="text" required />
                                            </FormGroup>

                                            <FormGroup>
                                                <h5 >Test Criteria</h5>
                                                <Input type="textarea" name="text"
                                                    id="about"
                                                    placeholder="Test Criteria"
                                                    value={this.state.testCriteria}
                                                    onChange={this.projectTestCriteriaChangeHandler}
                                                    required  />
                                            </FormGroup>
                                            <FormGroup>
                                                <h5 >Testing technologies</h5>
                                                <Input type="textarea" name="text"
                                                placeholder="Testing Technologies"
                                                    id="technologies"
                                                    value={this.state.technologies}
                                                    onChange={this.projectTechnologiesChangeHandler}
                                                    required  />
                                            </FormGroup>
                                            <Row>
                                                <Col></Col>
                                                <Col><Button id="updateButton" color="success" className="updateButton" type="submit" >Create Project</Button></Col>
                                                <Col></Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                    <Col md={3} className="profile-white" ></Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateProject;
