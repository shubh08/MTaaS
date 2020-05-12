import React, { useState } from 'react';
import './newRunTester.css';
import TopNavTester from '../navigation/topnavTester';
import SideNavTester from '../navigation/sidenavTester';
import FormControl from 'react-bootstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ROOT_URL } from '../config/config.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Multiselect } from 'multiselect-react-dropdown';
import Button from 'react-bootstrap-button-loader';
import { Jumbotron, Container } from 'reactstrap';
//import Multiselect from 'multiselect-dropdown-react';
class NewEmulatorRunTester extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      projectID: '',
      projects: [],
      projectName: '',
      runName: '',
      deviceOS: '',
      loading: false,
      projectArns: [],
      devicePoolArn:'',
      selectedDevices: [],
      fileSelected: null,
      selectedTestType: 'BUILTIN_FUZZ',
      testPackageFileTypes: ['', '', 'APPIUM_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_PYTHON_TEST_PACKAGE',
        'APPIUM_NODE_TEST_PACKAGE', 'APPIUM_RUBY_TEST_PACKAGE', 'CALABASH_TEST_PACKAGE', 'INSTRUMENTATION_TEST_PACKAGE',
        'UIAUTOMATION_TEST_PACKAGE', 'UIAUTOMATOR_TEST_PACKAGE', 'XCTEST_TEST_PACKAGE', 'XCTEST_UI_TEST_PACKAGE'],
      testTypes: ['BUILTIN_FUZZ', 'BUILTIN_EXPLORER', 'APPIUM_JAVA_JUNIT', 'APPIUM_JAVA_TESTNG', 'APPIUM_PYTHON',
        'APPIUM_NODE', 'APPIUM_RUBY', 'CALABASH', 'INSTRUMENTATION', 'UIAUTOMATION', 'UIAUTOMATOR',
        'XCTEST', 'XCTEST_UI']


    }
  }

  componentDidMount() {


    axios.get(ROOT_URL + '/testerByTesterID/' + localStorage.getItem('TesterID')).then((response) => {
      if (response.status == 200) {
        let tester = response.data.testers;
        axios.get(ROOT_URL + '/projectsForTester/' + localStorage.getItem("TesterID")).then((response) => {
          if (response.status == 200) {
            console.log(response.data)
            this.setState({ projects: response.data.projects, username:tester.name });
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

  fileChangeHandle = (e) => {
    this.setState({
      fileSelected: e.target.files[0]
    });
  }

  submitTest = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    })
   // console.log('This selected devide arns', this.state.selectedDevices)
    let fd = new FormData();
    fd.append('userName', this.state.username);
    fd.append('projectName', this.state.projectName);
    fd.append('runName', this.state.runName)
    //fd.append('appFileName', this.state.appFileName)
    fd.append('appFileType', this.state.deviceOS == '1' ? 'IOS_APP' : 'ANDROID_APP')
    // fd.append('devicePoolName', this.state.devicePoolName)
    fd.append('projectID', this.state.projectID)
    fd.append('testType', this.state.selectedTestType)
    fd.append('testPackageFileType', this.state.testPackageFileTypes[this.state.testTypes.indexOf(this.state.selectedTestType)])
    fd.append('file', this.state.fileSelected);
    console.log('final data', fd)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    axios.post(ROOT_URL + '/testRun/createRunEmulator', fd, config).then((res) => {
      this.setState({
        loading: false
      })
      console.log(res.data);
      toast.success('Your test run completed successfully!. Please visit page test run status page', {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      // window.location.reload();
    }).catch(error => {
      this.setState({
        loading: false
      })
      console.log("Error in scheduling new run: " + error)
    })

  }

  // onChangeMultiSelect=(options)=>
  // {
  //   console.log('options are',options.target.value)
  //     this.setState({
  //             selectedDevices: options.target.value
  //     });
  // }


  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (name == 'deviceOS') {
      this.setState({ selectedDevices: [] })
    }
  }
  result = (params) => {
    console.log('djashdjashjdkshd', params);
  }
  projectChangeHandler = (e) => {
    console.log('kjk')
    let projectName = ''
    let projectID = e.target.value
    this.state.projects.forEach((el) => {
      if (el._id == e.target.value)
        projectName = el.name
    })
    axios.get(ROOT_URL + '/testRun/getDevicePoolByProject/' + projectID).then((response) => {
      if (response.status == 200) {
        console.log(response.data.devicePools)

        let projectArn = []
        projectArn = response.data.devicePools.map(el => {
          return (<option key={el.devicePoolName} value={el.devicePoolARN}>{el.devicePoolName}</option>)
        })
        projectArn.unshift(<option key='dummy' value='dummy'>Select Project</option>)
        this.setState({ projectID: projectID, projectName: projectName, projectArns: projectArn });

      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }).catch(error => {
      console.log(error)
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER
      });
    })

  };

  onSelect = (params) => {
    let selectedDev = []
    params.forEach((el) => {
      selectedDev.push(el.id)
    })
    this.setState({ selectedDevices: selectedDev })
  }

  onRemove = (params) => {
    let selectedDev = []
    params.forEach((el) => {
      selectedDev.push(el.id)
    })
    this.setState({ selectedDevices: selectedDev })
  }

  render() {
    console.log('state', this.state)

    var addDropDown = this.state.projects.map((project) => {
      return (<option value={project._id}>{project.name}</option>)
    })
    var deviceDropDown = [];
    if (this.state.deviceOS == "2") {
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:58D6FB12B3624256AED26D0F940D4427", name: 'Google Pixel 2 - OS 9' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:E64D26FE27644A39A4BCEF009CDD8645", name: 'Google Pixel 2 XL - OS 9' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:CF6DC11E4C99430BA9A1BABAE5B45364", name: 'Google Pixel 3 - OS 9</option' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:E1F3149FDC33484D824BCFF66003E609", name: 'Google Pixel 3 XL - OS 9</option' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:2B6903A2FEBA4AD68E79F7BCD0B81FBA", name: 'Samsung Galaxy A70 - OS 9</option' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:DD61B8C65B1C46A9B3D5285A448BB4A4", name: 'Samsung Galaxy A40 - OS 9</option' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:E4438F5D016544A8BB8557C459084F9D", name: 'Samsung Galaxy A50 - OS 9</option' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:CE68825ABE5A4740B56F10111FD47844", name: 'Samsung Galaxy S9 (Unlocked) - OS 9' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:8F772FF1E1AE4433B82286B1DA52FED8", name: 'Samsung Galaxy S9+ (Unlocked) - OS 9' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:63CA317F2C79433081CD14AE3F2A5CB3", name: 'Samsung Galaxy S10+ - OS 9' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:A7BA5D5470264C9E98C1A599B9BFFA73", name: 'Samsung Galaxy S10 - OS 9' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:851BA6E2A15E410FB93178EBC62F4B48", name: 'Samsung Galaxy Note 10 - OS 9' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:033DADA53F38438E9DA269AFC8B682E8", name: 'Google Pixel 2 XL - OS 8' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:5F20BBED05F74D6288D51236B0FB9895", name: 'Google Pixel 2 - OS 8' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:E86BDD6A40FB4235957517589B2DA368", name: 'Samsung Galaxy S9+ (Unlocked) - OS 8' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:F27533F73A894EBDACC0E1B694288B77", name: 'Samsung Galaxy S9 (Unlocked) - OS 8' })

    } else {
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:334A79FA3096423885B15609A1A50E79", name: 'Apple iPhone 7 - OS 12' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:51ED4AB875C543AC97E6F65F7473E7B8", name: 'Apple iPhone 7 Plus - OS 12' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:AF74786682D3407D89BD16557FEE97A9", name: 'Apple iPhone 8 - OS 12' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:D125AEEE8614463BAE106865CAF4470E", name: 'Apple iPhone X - OS 12' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:7FCC95F6737A434B9896FF77DA9E2DB6", name: 'Apple iPhone XR - OS 12' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:A490B12A656C49678A80B5B0F7D33FA1", name: 'Apple iPhone XS - OS 12' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:D89BB79517414C5E89ED1A98FEFC9D7A", name: 'Apple iPhone 8 Plus - OS 12.1' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:F4A92C7101524540AB9E17F2857551D4", name: 'Apple iPhone XS Max - OS 12.1' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:B5D4C9845DEA4EEB994FB44F572E0B5C", name: 'Apple iPhone XR - OS 12.4.1' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:FB7DB406870A445A90958D233DF789BC", name: 'Apple iPhone 11 Pro - OS 13.1.3' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:8DCCC145A8A54191B61C6EF67F27F507", name: 'Apple iPhone 11 Pro Max - OS 13.1.3' })
      deviceDropDown.push({ id: "arn:aws:devicefarm:us-west-2::device:8EFC9DF49F09451E831E93DA281DAF9F", name: 'Apple iPhone 11 - OS 13.1.3' })
    }

    return (
      <div className="newRunTester">
        <TopNavTester />
        <SideNavTester />
        {/* <h2 align='center'>Run Test On Emulator</h2> */}
        <div className="form-group" >
          <Form className="newRunTester-right" onSubmit={this.submitTest}>
            <FormGroup className="newRunTester-Each">
              <Label style={{ marginTop: '5%' }}>Project</Label>
              <Input type="select" name='projectID' onChange={this.projectChangeHandler} >
                <option value={0}>Select Project</option>
                {addDropDown}
              </Input>
            </FormGroup>
            <FormGroup className="newRunTester-Each">
              <Label>Name of your Emulator test run</Label>
              <Input placeholder="Enter the name of the test run" onChange={this.onChangeHandler} name='runName' />
            </FormGroup>
            {/* <FormGroup>
              <Label for="exampleSelect">Select Device Pool</Label>
              <Input type="select" name="devicePoolArn" id="select" onChange={this.onChangeHandler}>>
                {this.state.projectArns}
              </Input>
            </FormGroup> */}
            <FormGroup className="newRunTester-Each">
              <Label>Select Emulator Type</Label>
              <Input type="select" name='deviceOS' onChange={this.onChangeHandler}>
                <option value="1">iOS Emulator</option>
                <option value="2">Android Emulator</option>
              </Input>
            </FormGroup>
            <FormGroup className="newRunTester-Each">
              <Label>Select a type of Emulator test</Label>
              <Input type="select" name='selectedTestType' onChange={this.onChangeHandler}>
                <option value='BUILTIN_FUZZ'>BUILTIN_FUZZ</option>
                <option value='BUILTIN_EXPLORER'>BUILTIN_EXPLORER</option>
                <option value='APPIUM_JAVA_JUNIT'>APPIUM_JAVA_JUNIT</option>
                <option value='APPIUM_JAVA_TESTING'>APPIUM_JAVA_TESTING</option>
                <option value='APPIUM_PYTHON'>APPIUM_PYTHON</option>
                <option value='APPIUM_NODE'>APPIUM_NODE</option>
                <option value='APPIUM_RUBY'>APPIUM_RUBY</option>
                <option value='CALABASH'>CALABASH</option>
                <option value='INSTRUMENTATION'>INSTRUMENTATION</option>
                <option value='UIAUTOMATION'>UIAUTOMATION</option>
                <option value='UIAUTOMATOR'>UIAUTOMATOR</option>
                <option value='XCTEST'>XCTEST</option>
                <option value='XCTEST_UI'>XCTEST_UI</option>
              </Input>
            </FormGroup>
            <FormGroup className="newRunTester-Each">
              <Label>Select Testing File</Label>
              <Input type="select" multiple style={{ height: 40 }} name='selectedTestFile' onChange={this.onChangeHandler}>
                <option value='ANDROID TEST'>ANDROID TEST</option>
                <option value='ANDROID TEST - 1'>ANDROID TEST - 1</option>
                <option value='iOS TEST'>iOS TEST</option>
                <option value='iOS TEST - 1'>iOS TEST - 1</option>
              </Input>
            </FormGroup>
            <FormGroup className="newRunTester-Each">
              <Label>Upload your .apk File</Label>
              <Input type="file" onChange={this.fileChangeHandle} />
              <FormText color="muted">
                Upload a .apk/.isa file only!
                </FormText>
            </FormGroup>
            <Button loading={this.state.loading} type="submit">Schedule Emulator Test Run</Button>
          </Form>

        </div>

      </div>
    )
  }
}

export default NewEmulatorRunTester;
