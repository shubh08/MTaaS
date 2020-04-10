import React, { useState } from 'react';
import './userManagement.css';
import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container, Table } from 'reactstrap';
import TopNav from '../navigation/topnavAdmin';
import SideNav from '../navigation/sidenavAdmin';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            managers: [],
            testers: [],
            projects: [],
            val: localStorage.getItem("listVal"),
            manager: '',
            tester: '',
            project: '',
            modalManager: false,
            modalTester: false,
            modalProject: false
        };
    }
    componentDidMount() {
        axios.get(ROOT_URL + '/allManagers').then((response) => {
            if (response.status == 200) {
                this.setState({ managers: response.data.managers });
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
        axios.get(ROOT_URL + '/allTesters').then((response) => {
            if (response.status == 200) {
                this.setState({ testers: response.data.testers });
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
        axios.get(ROOT_URL + '/allProjects').then((response) => {
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

    listChangeHandler = (e) => {
        localStorage.setItem("listVal", e.target.value);
        this.setState({ val: localStorage.getItem("listVal") })
    }
    unblock = (id) => {
        var managerData = { id: id }
        axios.put(ROOT_URL + '/admin/unblockManager', managerData).then((response) => {
            if (response.status == 200) {
                toast.success("Unblocking !", {
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

    block = (id) => {
        var managerData = { id: id }
        axios.put(ROOT_URL + '/admin/blockManager', managerData).then((response) => {
            if (response.status == 200) {
                toast.error("Blocking !", {
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
    unblockTester = (id) => {
        var testerData = { id: id }
        axios.put(ROOT_URL + '/admin/unblockTester', testerData).then((response) => {
            if (response.status == 200) {
                toast.success("Unblocking !", {
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

    blockTester = (id) => {
        var testerData = { id: id }
        axios.put(ROOT_URL + '/admin/blockTester', testerData).then((response) => {
            if (response.status == 200) {
                toast.error("Blocking !", {
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
    unblockProject = (id) => {
        var testerData = { id: id }
        axios.put(ROOT_URL + '/admin/unblockProject', testerData).then((response) => {
            if (response.status == 200) {
                toast.success("Unblocking !", {
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

    blockProject = (id) => {
        var testerData = { id: id }
        axios.put(ROOT_URL + '/admin/blockProject', testerData).then((response) => {
            if (response.status == 200) {
                toast.error("Blocking !", {
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
    toggleManager = () => {
        let val = this.state.modalManager;
        this.setState({ modalManager: !val })
    }
    toggleTester = () => {
        let val = this.state.modalTester;
        this.setState({ modalTester: !val })
    }
    toggleProject = () => {
        let val = this.state.modalProject;
        this.setState({ modalProject: !val })
    }
    viewManager = (id) => {

        axios.get(ROOT_URL + '/managerByManagerID/' + id).then((response) => {
            if (response.status == 200) {
                this.setState({ manager: response.data.manager })
                this.toggleManager();
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
    viewTester = (id) => {

        axios.get(ROOT_URL + '/testerByTesterID/' + id).then((response) => {
            if (response.status == 200) {
                this.setState({ tester: response.data.testers })
                this.toggleTester();
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

    viewProject = (id) => {
        axios.get(ROOT_URL + '/projectByProjectID/' + id).then((response) => {
            if (response.status == 200) {
                this.setState({ project: response.data.project })
                this.toggleProject();
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
        var arrayManager = [];
        var arrayTester = [];
        var arrayProject = [];
        var count = 0;

        this.state.managers.map((manager) => {
            count = count + 1;
            if (manager.active) {
                arrayManager.push(<tr>
                    <th scope="row">{count}</th>
                    <td>{manager.name}</td>
                    <td>Manager</td>
                    <th><h4><FaEye onClick={() => { this.viewManager(manager._id) }}></FaEye></h4></th>
                    <th ><h4><FiMinusCircle onClick={() => { this.block(manager._id) }}></FiMinusCircle></h4></th>
                </tr>)
            } else {
                arrayManager.push(<tr className="colorRed">
                    <th scope="row">{count}</th>
                    <td>{manager.name}</td>
                    <td>Manager</td>
                    <th><h4><FaEye onClick={() => { this.viewManager(manager._id) }}></FaEye></h4></th>
                    <th ><h4><FiPlusCircle onClick={() => { this.unblock(manager._id) }}></FiPlusCircle></h4></th>
                </tr>)
            }
        })
        count = 0;

        this.state.testers.map((tester) => {
            count = count + 1;
            if (tester.active) {
                arrayTester.push(<tr>
                    <th scope="row">{count}</th>
                    <td>{tester.name}</td>
                    <td>Tester</td>
                    <th><h4><FaEye onClick={() => { this.viewTester(tester._id) }}></FaEye></h4></th>
                    <th ><h4><FiMinusCircle onClick={() => { this.blockTester(tester._id) }}></FiMinusCircle></h4></th>
                </tr>)
            } else {
                arrayTester.push(<tr className="colorRed">
                    <th scope="row">{count}</th>
                    <td>{tester.name}</td>
                    <td>Tester</td>
                    <th><h4><FaEye onClick={() => { this.viewTester(tester._id) }}></FaEye></h4></th>
                    <th ><h4><FiPlusCircle onClick={() => { this.unblockTester(tester._id) }}></FiPlusCircle></h4></th>
                </tr>)
            }
        })
        count = 0;
        this.state.projects.map((project) => {
            count = count + 1;
            if (project.active) {
                arrayProject.push(<tr>
                    <th scope="row">{count}</th>
                    <td>{project.name}</td>
                    <td>Project</td>
                    <th><h4><FaEye onClick={() => { this.viewProject(project._id) }}></FaEye></h4></th>
                    <th ><h4><FiMinusCircle onClick={() => { this.blockProject(project._id) }}></FiMinusCircle></h4></th>
                </tr>)
            } else {
                arrayProject.push(<tr className="colorRed">
                    <th scope="row">{count}</th>
                    <td>{project.name}</td>
                    <td>Project</td>
                    <th><h4><FaEye onClick={() => { this.viewProject(project._id) }}></FaEye></h4></th>
                    <th ><h4><FiPlusCircle onClick={() => { this.unblockProject(project._id) }}></FiPlusCircle></h4></th>
                </tr>)
            }
        })
        if (this.state.val == 1) {
            arrayTester = [];
            arrayProject = [];
        } else if (this.state.val == 2) {
            arrayManager = [];
            arrayProject = [];
        } else {
            arrayManager = [];
            arrayTester = [];
        }
        var projManager = []
        if (this.state.manager) {
            this.state.manager.projectID.map((project) => {
                
                projManager.push(<p className="hyperlink" onClick={() => { this.viewProject(project._id) }}>{project.name}</p>)
            })
        }
        var projTester = []
        if (this.state.tester) {
            this.state.tester.projectID.map((project) => {
                projTester.push(<p className="hyperlink" onClick={() => { this.viewProject(project._id) }}>{project.name}</p>)
            })
        }
        
        return (
            <div className="profile">
                <div>
                    <TopNav />
                </div>
                <div className="profile-left">
                    <SideNav />
                </div>
                <div className="profile-right">
                    <div>
                        <div>
                            <Container className="profile-margin-top">
                                <Row>
                                    <Col md={2}></Col>
                                    <Col>
                                        <Input type="select" style={{ fontWeight: "bolder" }} onChange={this.listChangeHandler}>
                                            <option value={1} selected={this.state.val == 1}>Managers List</option>
                                            <option value={2} selected={this.state.val == 2}> Testers List</option>
                                            <option value={3} selected={this.state.val == 3}> Projects List</option>
                                        </Input>
                                    </Col>
                                    <Col md={2}></Col>
                                </Row>
                                <Row>
                                    <Col md={2}></Col>
                                    <Col>
                                        <Table striped className="profile-margin-top scrollUserMgmt">
                                            <tbody>
                                                {arrayManager}
                                                {arrayTester}
                                                {arrayProject}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col md={2}></Col>
                                </Row>

                            </Container>

                            <Modal isOpen={this.state.modalManager} toggle={this.toggleManager} >
                                <ModalHeader toggle={this.toggleManager} style={{ textAlign: "center" }}>Manager Details</ModalHeader>
                                <ModalBody>
                                    <Form className="userMGMT-margin-increase-top">

                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="colorBlue">Name</td>
                                                    <td>{this.state.manager.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="colorBlue">Company</td>
                                                    <td>{this.state.manager.company}</td>
                                                </tr>
                                                <tr>
                                                    <td className="colorBlue">Email</td>
                                                    <td>{this.state.manager.email}</td>

                                                </tr>
                                                <tr>
                                                    <td className="colorBlue" >About</td>
                                                    <td>{this.state.manager.about}</td>
                                                </tr>
                                                <tr >
                                                    <td className="colorBlue">Projects</td>
                                                    <td>{projManager}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Form>
                                </ModalBody>
                            </Modal>
                            <Modal isOpen={this.state.modalTester} toggle={this.toggleTester} >
                                <ModalHeader toggle={this.toggleTester}>Tester Details</ModalHeader>
                                <ModalBody>
                                    <Form className="userMGMT-margin-increase-top">

                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="colorBlue">Name</td>
                                                    <td>{this.state.tester.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="colorBlue">Technologies</td>
                                                    <td>{this.state.tester.technologies}</td>
                                                </tr>
                                                <tr>
                                                    <td className="colorBlue">Email</td>
                                                    <td>{this.state.tester.email}</td>

                                                </tr>
                                                <tr>
                                                    <td className="colorBlue" >About</td>
                                                    <td>{this.state.tester.about}</td>
                                                </tr>
                                                <tr >
                                                    <td className="colorBlue">Projects</td>
                                                    <td>{projTester}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Form>
                                </ModalBody>
                            </Modal>
                            {this.state.project.managerID && <Modal isOpen={this.state.modalProject} toggle={this.toggleProject} >
                                <ModalHeader toggle={this.toggleProject}>Project Details</ModalHeader>
                                <ModalBody>
                                    <Form className="userMGMT-margin-increase-top">

                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="colorGreen">Name</td>
                                                    <td>{this.state.project.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="colorGreen">Technologies</td>
                                                    <td>{this.state.project.technologies}</td>
                                                </tr>
                                                <tr>
                                                    <td className="colorGreen">Descritption</td>
                                                    <td>{this.state.project.description}</td>

                                                </tr>
                                                <tr>
                                                    <td className="colorGreen" >Test Criteria</td>
                                                    <td>{this.state.project.testCriteria}</td>
                                                </tr>
                                                <tr>
                                                    <td className="colorGreen" >Manager Name</td>
                                                    <td>{this.state.project.managerID.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="colorGreen" >Company Name</td>
                                                    <td>{this.state.project.managerID.company}</td>
                                                </tr>
                                                
                                            </tbody>
                                        </Table>
                                    </Form>
                                </ModalBody>
                            </Modal>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserManagement;
