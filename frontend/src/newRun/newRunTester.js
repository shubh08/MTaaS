import React, {useState} from 'react';
import './newRunTester.css';
import TopNavTester from '../navigation/topnavTester';
import SideNavTester from '../navigation/sidenavTester';
import FormControl from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class NewRunTester extends React.Component{
constructor(props)
{
  super(props)
  this.state={

  }
}

  render(){
    return (
      <div className="newRunTester">
        <div>
          <TopNavTester/>
        </div>
        <div className="newRunTester-left">
          <SideNavTester/>
        </div>
        <div className="form-group" >
          <Form className="newRunTester-right">
              <FormGroup>
                <Label>Name of your project</Label>
                <Input name='projectName' onChange={this.changeHandler} />
              </FormGroup>
              <FormGroup>
                <Label>Name of your test run</Label>
                <Input placeholder="Enter the name of the test run" onChange={this.changeHandler} name='runName'/>
              </FormGroup>
              <FormGroup>
                <Label>Enter device pool name</Label>
                <Input placeholder="Enter the name of the device pool" onChange={this.changeHandler} name='devicePoolName'/>
              </FormGroup>
              <FormGroup>
                <Label>Device OS</Label>
                <Input type="select" onChange={this.deviceOSChangeHandler}>
                  <option value='iOS'>iOS</option>
                  <option value='Android'>Android</option>
                  <option value='Windows OS'>Windows OS</option>
                  <option value='Blackberry'>Blackberry</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label >Select Mobile Devices</Label>
                <Input type="select" multiple style={{ height: 35 }} onChange={this.deviceChangeHandler}>
                  <option value='Pixel 2'>Pixel 2</option>
                  <option value='Pixel 2 XL'>Pixel 2 XL</option>
                  <option value='Pixel 3'>Pixel 3</option>
                  <option value='Pixel 3 XL'>Pixel 3 XL</option>
                  <option value='Samsung A40'>Samsung A40</option>
                  <option value='Samsung A50'>Samsung A50</option>
                  <option value='Samsung A70'>Samsung A70</option>
                  <option value='Samsung S9'>Samsung S9</option>
                  <option value='Samsung S9+'>Samsung S9+</option>
                  <option value='Samsung S10'>Samsung S10</option>
                  <option value='Samsung Galaxy Note 10'>Samsung Galaxy Note 10</option>
                  <option>Samsung S20</option>
                  <option>Samsung Galaxy Note 20</option>
                  <option>Apple iPhone 10</option>
                  <option>Apple iPhone 10 XR</option>
                  <option>Apple iPhone 10 XS</option>
                  <option>Apple iPhone 10 XS MAX</option>
                  <option>Apple iPhone 11</option>
                  <option>Apple iPhone 11 Pro</option>
                  <option>Apple iPhone 11 Pro Max</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Select a type of test</Label>
                <Input type="select" onChange={this.deviceChangeHandler}>
                  <option>BUILTIN_FUZZ</option>
                  <option>BUILTIN_EXPLORER</option>
                  <option>APPIUM_JAVA_JUNIT</option>
                  <option>APPIUM_JAVA_TESTING</option>
                  <option>APPIUM_PYTHON</option>
                  <option>APPIUM_NODE</option>
                  <option>APPIUM_RUBY</option>
                  <option>CALABASH</option>
                  <option>INSTRUMENTATION</option>
                  <option>UIAUTOMATION</option>
                  <option>UIAUTOMATOR</option>
                  <option>XCTEST</option>
                  <option>XCTEST_UI</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Select Testing File</Label>
                <Input type="select" multiple style={{ height: 40 }}>
                  <option>ANDROID TEST</option>
                  <option>ANDROID TEST - 1</option>
                  <option>iOS TEST</option>
                  <option>iOS TEST - 1</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Add your test file</Label>
                <Input type="file"/>
                <FormText color="muted">
                  Upload a .apk/.isa file only!
                </FormText>
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
        </div>
      </div>
    )
  }
}

export default NewRunTester;
