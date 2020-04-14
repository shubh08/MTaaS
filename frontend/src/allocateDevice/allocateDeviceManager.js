import React, { useState } from 'react';
import './allocateDevice.css';
import TopNavManager from '../navigation/topnavManager';
import SideNavManager from '../navigation/sidenavManager';
import FormControl from 'react-bootstrap';
import { Row,Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';

class AllocateDeviceManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectID: '',
      devicePoolName: '',
      deviceOS: '',
      numberOfInstances: '',
      deviceSelect: []
    };
  }
  componentDidMount() {
    axios.get(ROOT_URL + '/projectsForManager/' + localStorage.getItem("ManagerID")).then((response) => {
      if (response.status == 200) {
        console.log(response.data)
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
  projectChangeHandler = e => {
    this.setState({ projectID: e.target.value });
  };
  devicePoolNameChangeHandler = e => {
    this.setState({ devicePoolName: e.target.value });
  }
  deviceOSChangeHandler = e => {
    this.setState({ deviceOS: e.target.value });
  }
  numberChangeHandler = e => {
    this.setState({ numberOfInstances: e.target.value });
  }
  deviceSelectChangeHandler = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ deviceSelect: value })
  }
  allocate = (e) => {
    e.preventDefault();

    var data = { devicePoolName: this.state.devicePoolName, projectID: this.state.projectID, poolList: this.state.deviceSelect }
    axios.post(ROOT_URL + '/testRun/allocateDevice', data).then((response) => {
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
    var deviceDropDown = [];
    if (this.state.deviceOS == "2") {
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:58D6FB12B3624256AED26D0F940D4427">Google Pixel 2 - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:E64D26FE27644A39A4BCEF009CDD8645">Google Pixel 2 XL - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:CF6DC11E4C99430BA9A1BABAE5B45364">Google Pixel 3 - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:E1F3149FDC33484D824BCFF66003E609">Google Pixel 3 XL - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:2B6903A2FEBA4AD68E79F7BCD0B81FBA">Samsung Galaxy A70 - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:DD61B8C65B1C46A9B3D5285A448BB4A4">Samsung Galaxy A40 - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:E4438F5D016544A8BB8557C459084F9D">Samsung Galaxy A50 - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:CE68825ABE5A4740B56F10111FD47844">Samsung Galaxy S9 (Unlocked) - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:8F772FF1E1AE4433B82286B1DA52FED8">Samsung Galaxy S9+ (Unlocked) - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:63CA317F2C79433081CD14AE3F2A5CB3">Samsung Galaxy S10+ - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:A7BA5D5470264C9E98C1A599B9BFFA73">Samsung Galaxy S10 - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:851BA6E2A15E410FB93178EBC62F4B48">Samsung Galaxy Note 10 - OS 9</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:033DADA53F38438E9DA269AFC8B682E8">Google Pixel 2 XL - OS 8</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:5F20BBED05F74D6288D51236B0FB9895">Google Pixel 2 - OS 8</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:E86BDD6A40FB4235957517589B2DA368">Samsung Galaxy S9+ (Unlocked) - OS 8</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:F27533F73A894EBDACC0E1B694288B77">Samsung Galaxy S9 (Unlocked) - OS 8</option>)

    } else {
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:334A79FA3096423885B15609A1A50E79">Apple iPhone 7 - OS 12</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:51ED4AB875C543AC97E6F65F7473E7B8">Apple iPhone 7 Plus - OS 12</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:AF74786682D3407D89BD16557FEE97A9">Apple iPhone 8 - OS 12</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:D125AEEE8614463BAE106865CAF4470E">Apple iPhone X - OS 12</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:7FCC95F6737A434B9896FF77DA9E2DB6">Apple iPhone XR - OS 12</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:A490B12A656C49678A80B5B0F7D33FA1">Apple iPhone XS - OS 12</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:D89BB79517414C5E89ED1A98FEFC9D7A">Apple iPhone 8 Plus - OS 12.1</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:F4A92C7101524540AB9E17F2857551D4">Apple iPhone XS Max - OS 12.1</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:B5D4C9845DEA4EEB994FB44F572E0B5C">Apple iPhone XR - OS 12.4.1</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:FB7DB406870A445A90958D233DF789BC">Apple iPhone 11 Pro - OS 13.1.3</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:8DCCC145A8A54191B61C6EF67F27F507">Apple iPhone 11 Pro Max - OS 13.1.3</option>)
      deviceDropDown.push(<option value="arn:aws:devicefarm:us-west-2::device:8EFC9DF49F09451E831E93DA281DAF9F">Apple iPhone 11 - OS 13.1.3</option>)
    }
    return (
      <div className="allocateDevice">
        <div>
          <TopNavManager />
        </div>
        <div className="allocateDevice-left">
          <SideNavManager />
        </div>
        <div className="form-group" >
          <Form className="allocateDevice-right" onSubmit={this.allocate}>
          <h1>Allocate Device</h1>
            <FormGroup>
              <Label style={{ marginTop: '5%' }}>Project</Label>
              <Input type="select" onChange={this.projectChangeHandler} required >
                <option value={0}>Select Project</option>
                {addDropDown}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Device Pool Name</Label>
              <Input value={this.state.devicePoolName} onChange={this.devicePoolNameChangeHandler} required />
            </FormGroup>
            <FormGroup>
              <Label>Device OS</Label>
              <Input type="select" onChange={this.deviceOSChangeHandler}>
                <option value="1">iOS</option>
                <option value="2">Android</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label >Select Mobile Devices</Label>
              <Input type="select" multiple style={{ height: '100%' }} onChange={this.deviceSelectChangeHandler} required>
                {deviceDropDown}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Number of instances</Label>
              <Input value={this.state.numberOfInstances} onChange={this.numberChangeHandler} required />
            </FormGroup>
            <Button type="submit" style={{marginBottom:'5%'}}>Submit</Button>
          </Form>
          
        </div>
      </div>
    )
  }
}

export default AllocateDeviceManager;
