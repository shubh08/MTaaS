import React, { useState } from 'react';
import './projectOperations.css';
import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container, Table } from 'reactstrap';
import TopNav from '../navigation/topnavManager';
import SideNav from '../navigation/sidenavManager';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { MdDelete, MdRemoveCircle } from 'react-icons/md';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

class ProjectOperations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            testers: [],
            manager: '',
            tester: '',
            project: '',
            modalTester: false,
            projectID: ''
        };
    }
    componentDidMount() {

        axios.get(ROOT_URL + '/projectsForManager/' + localStorage.getItem("ManagerID")).then((response) => {
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



    toggleTester = () => {
        let val = this.state.modalTester;
        this.setState({ modalTester: !val })
    }

    viewTester = (id) => {
        this.setState({ projectID: id });
        axios.get(ROOT_URL + '/testersforProject/' + id).then((response) => {
            if (response.status == 200) {
                this.setState({ testers: response.data.testers })
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
    unblockProject = (id) => {
        var testerData = { id: id }
        axios.put(ROOT_URL + '/manager/unblockProject', testerData).then((response) => {
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
        axios.put(ROOT_URL + '/manager/blockProject', testerData).then((response) => {
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
    deleteTester = (id) => {
        var testerData = { testerID: id, projectID: this.state.projectID }
        axios.put(ROOT_URL + '/manager/removeTesterFromProject', testerData).then((response) => {
            if (response.status == 200) {
                toast.error("Removing the tester !", {
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

        var arrayProject = [];
        var arrayProjectHeader = [];
        var arrayTester = [];
        var arrayTesterHeader = [];
        var count = 0;
        arrayProjectHeader.push(<thead>
            <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Description</th>
                <th>Technologies</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th> </th>
            </tr>
        </thead>)
        this.state.projects.map((project) => {
            count = count + 1;
            var startdate = project.startDate.split("T")[0];
            var enddate = project.endDate.split("T")[0];
            if(project.active){
                arrayProject.push(<tr>
                    <th scope="row">{count}</th>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.technologies}</td>
                    <td>{startdate}</td>
                    <td>{enddate}</td>
                    <th><h4><FaEye onClick={() => { this.viewTester(project._id) }}></FaEye></h4></th>
                    <th ><h4><FiMinusCircle style={{ color: "red" }} onClick={() => { this.blockProject(project._id) }}></FiMinusCircle></h4></th>
                </tr>)
            }else{
                arrayProject.push(<tr>
                    <th scope="row">{count}</th>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.technologies}</td>
                    <td>{startdate}</td>
                    <td>{enddate}</td>
                    <th><h4></h4></th>
                    <th ><h4><FiPlusCircle style={{ color: "green" }} onClick={() => { this.unblockProject(project._id) }}></FiPlusCircle></h4></th>
                </tr>)
            }
        
        })
        count = 0;
        this.state.testers.map((tester) => {
            count = count + 1;
            arrayTester.push(<tr>
                <th scope="row">{count}</th>
                <td>{tester.name}</td>
                <td>{tester.email}</td>
                <td>{tester.technologies}</td>
                <td>{tester.about}</td>
                <th ><h4><MdRemoveCircle style={{ color: "red" }} onClick={() => { this.deleteTester(tester._id) }}></MdRemoveCircle></h4></th>
            </tr>)
        })
        if (count == 0) {
            arrayTester.push(<h2 style={{ textAlign: "center" }}>No Testers</h2>)
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
                                    <Col md={1}></Col>
                                    <Col>
                                        <Table striped className="profile-margin-top scrollUserMgmt">
                                            {arrayProjectHeader}
                                            <tbody>
                                                {arrayProject}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col md={1}></Col>
                                </Row>

                            </Container>
                            <Modal isOpen={this.state.modalTester} toggle={this.toggleTester}  >
                                <ModalHeader toggle={this.toggleTester}>Tester Details</ModalHeader>
                                <ModalBody >
                                    <Row>
                                        <Table striped className="profile-margin-top scrollUserMgmt">

                                            <tbody>

                                                {arrayTester}
                                            </tbody>
                                        </Table>
                                    </Row>
                                </ModalBody>
                            </Modal>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectOperations;
