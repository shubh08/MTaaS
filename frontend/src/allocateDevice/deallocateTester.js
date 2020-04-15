import React, { useState } from 'react';
import './allocateDevice.css';
import { Button } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container, Table } from 'reactstrap';
import TopNav from '../navigation/topnavManager';
import SideNav from '../navigation/sidenavManager';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { FaMobileAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
class DeallocateTester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            projectID: '',
            devicePools: [],
            devices: [],
            tooltipOpen: false
        };
    }
    componentDidMount() {
        axios.get(ROOT_URL + '/projectsForTester/' + localStorage.getItem("TesterID")).then((response) => {
            if (response.status == 200) {
                this.setState({ projects: response.data.projects });
                console.log(response.data.projects)
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
        this.setState({ projectID: e.target.value });
        this.viewPoolDetails(e.target.value)
    }


    deallocate = (id) => {
        var poolData = { poolID: id }
        axios.post(ROOT_URL + '/testRun/deleteDevicePool', poolData).then((response) => {
            if (response.status == 200) {
                toast.error("De-Allocating !", {
                    position: toast.POSITION.TOP_CENTER
                });
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } else {
                toast.error('Something went wrong!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch(error => {
            toast.error('Something went wrong!', {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }



    toggleProject = () => {
        let val = this.state.modalProject;
        this.setState({ modalProject: !val })
    }
    viewPoolDetails = (id) => {

        axios.get(ROOT_URL + '/testRun/getDevicePoolByProject/' + id).then((response) => {
            if (response.status == 200) {
                this.setState({ devicePools: response.data.devicePools })
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
    viewAllocation = (id) => {
        axios.get(ROOT_URL + '/testRun/getDevicePool?id=' + id).then((response) => {
            if (response.status == 200) {
                this.setState({ devices: JSON.parse(response.data.arn.devicePool.rules[0].value) })
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
        var toolT = this.state.tooltipOpen;
        this.setState({ tooltipOpen: !toolT })
    }
    render() {

        var arrayProject = [<option value={0} >Select</option>];
        var arrayDevicePool = [];
        var count = 0;
        var arrayManagerHead = []
        var val = this.state.devices
        var displayarray = []
        if (val.length) {
            for (var i = 0; i < val.length; i++) {
                if (val[i] == "arn:aws:devicefarm:us-west-2::device:58D6FB12B3624256AED26D0F940D4427") {
                    displayarray.push("Google Pixel 2 - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:E64D26FE27644A39A4BCEF009CDD8645") {
                    displayarray.push("Google Pixel 2 XL - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:CF6DC11E4C99430BA9A1BABAE5B45364") {
                    displayarray.push("Google Pixel 3 - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:E1F3149FDC33484D824BCFF66003E609") {
                    displayarray.push("Google Pixel 3 XL - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:2B6903A2FEBA4AD68E79F7BCD0B81FBA") {
                    displayarray.push("Samsung Galaxy A70 - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:DD61B8C65B1C46A9B3D5285A448BB4A4") {
                    displayarray.push("Samsung Galaxy A40 - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:E4438F5D016544A8BB8557C459084F9D") {
                    displayarray.push("Samsung Galaxy A50 - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:CE68825ABE5A4740B56F10111FD47844") {
                    displayarray.push("Samsung Galaxy S9 (Unlocked) - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:8F772FF1E1AE4433B82286B1DA52FED8") {
                    displayarray.push("Samsung Galaxy S9+ (Unlocked) - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:63CA317F2C79433081CD14AE3F2A5CB3") {
                    displayarray.push("GSamsung Galaxy S10+ - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:A7BA5D5470264C9E98C1A599B9BFFA73") {
                    displayarray.push("Samsung Galaxy S10 - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:851BA6E2A15E410FB93178EBC62F4B48") {
                    displayarray.push("Samsung Galaxy Note 10 - OS 9, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:033DADA53F38438E9DA269AFC8B682E8") {
                    displayarray.push("Google Pixel 2 XL - OS 8, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:5F20BBED05F74D6288D51236B0FB9895") {
                    displayarray.push("Google Pixel 2 - OS 8, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:E86BDD6A40FB4235957517589B2DA368") {
                    displayarray.push("Samsung Galaxy S9+ (Unlocked) - OS 8, ")
                } else if (val[i] == "arn:aws:devicefarm:us-west-2::device:F27533F73A894EBDACC0E1B694288B77") {
                    displayarray.push("Samsung Galaxy S9 (Unlocked) - OS 8, ")
                }

                //   } else {
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:334A79FA3096423885B15609A1A50E79">Apple iPhone 7 - OS 12</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:51ED4AB875C543AC97E6F65F7473E7B8">Apple iPhone 7 Plus - OS 12</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:AF74786682D3407D89BD16557FEE97A9">Apple iPhone 8 - OS 12</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:D125AEEE8614463BAE106865CAF4470E">Apple iPhone X - OS 12</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:7FCC95F6737A434B9896FF77DA9E2DB6">Apple iPhone XR - OS 12</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:A490B12A656C49678A80B5B0F7D33FA1">Apple iPhone XS - OS 12</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:D89BB79517414C5E89ED1A98FEFC9D7A">Apple iPhone 8 Plus - OS 12.1</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:F4A92C7101524540AB9E17F2857551D4">Apple iPhone XS Max - OS 12.1</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:B5D4C9845DEA4EEB994FB44F572E0B5C">Apple iPhone XR - OS 12.4.1</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:FB7DB406870A445A90958D233DF789BC">Apple iPhone 11 Pro - OS 13.1.3</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:8DCCC145A8A54191B61C6EF67F27F507">Apple iPhone 11 Pro Max - OS 13.1.3</option>)
                //     deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:8EFC9DF49F09451E831E93DA281DAF9F">Apple iPhone 11 - OS 13.1.3</option>)
                //   }
                //Do something
            }
        }
        arrayManagerHead.push(<thead>
            <tr>
                <th>#</th>
                <th>Pool Name</th>
                <th>Project Name</th>
                <th></th>
            </tr>
        </thead>)

        var count = 0;
        this.state.projects.map((project) => {
            if (project.active)
                arrayProject.push(<option value={project._id} >{project.name}</option>)
        })
        this.state.devicePools.map((pool) => {
            count = count + 1;
            var pop_id ="id_"+count;
            arrayDevicePool.push(<tr>
                <th scope="row">{count}</th>
                <td>{pool.devicePoolName}</td>
                <td>{pool.projectID.name}</td>
                <th><h4><FaMobileAlt id={pop_id} onClick={() => { this.viewAllocation(pool.devicePoolARN) }}></FaMobileAlt></h4></th>
                <Popover placement="bottom" isOpen={this.state.tooltipOpen} target={pop_id} toggle={this.toggle}>
                    <PopoverHeader>Devices</PopoverHeader>
                    <PopoverBody>{displayarray}</PopoverBody>
                </Popover>
                <th ><h4><MdDeleteForever onClick={() => { this.deallocate(pool.devicePoolARN) }}></MdDeleteForever></h4></th>
            </tr>)
        })


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
                                            {arrayProject}
                                        </Input>
                                    </Col>
                                    <Col md={2}></Col>
                                </Row>
                                <Row>
                                    <Col md={2}></Col>
                                    <Col>
                                        <Table striped className="profile-margin-top scrollUserMgmt">
                                            {arrayManagerHead}
                                            <tbody>
                                                {arrayDevicePool}

                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col md={2}></Col>
                                </Row>

                            </Container>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeallocateTester;
