
import React, {useState} from 'react';
import './newRunTester.css';
import TopNavTester from '../navigation/topnavTester';
import SideNavTester from '../navigation/sidenavTester';
import FormControl from 'react-bootstrap';
import {Form, FormGroup, Label, Input, FormText,Table,Badge } from 'reactstrap';
import { ROOT_URL } from '../config/config'
import axios from 'axios'
import { toast } from 'react-toastify';
import ObjectList from 'react-object-list'
import TableView from 'react-table-view'

let tableData = []

//import Multiselect from 'multiselect-dropdown-react';
class EmulatorTestRunStatus extends React.Component{
constructor(props)
{
  super(props)
  this.state={
    username:'Jon Snows',
    projectID:'',
    projects:[],
    projectName:'',
    tableData:[]
  


  }
}

componentDidMount() {
  console.log('herere')
  axios.get(ROOT_URL + '/projectsForTester/' + localStorage.getItem("TesterID")).then((response) => {
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
  let projectName = ''
  let projectID = e.target.value
  this.state.projects.forEach((el)=>{
    if(el._id==e.target.value)
    projectName=el.name
  })
 
  //this.setState({ projectID: e.target.value, projectName:projectName});
  axios.post(ROOT_URL+'/testRun/emulatorLoadRunData',{projectName:projectName}).then((res)=>{
    console.log('result is',res);
    tableData = res.data.data.map((el,i)=>{
      console.log('el result',el.result)
     return ( <tr>
        <th scope="row">{i+1}</th>
      <td>{el.userName}</td>
      <td>{el.projectName}</td>
      <td>{el.name}</td>
      <td>{el.platform}</td>
      <td><Badge color="info">{el.status}</Badge></td>
     <td>{el.result=='PENDING'?<Badge color="warning">Pending</Badge>:(el.result=='PASSED'?<Badge color="success">{el.result}</Badge>:<Badge color="info">{el.result}</Badge>)}</td>
      <td>{el.totalJobs}</td>
      <td>{el.deviceMinutes}</td>
      <td>1</td>
      <td>0</td>
      </tr>)
    })
    this.setState({tableData:res.data.data,projectName:projectName,projectID:projectID})
}).catch(error => {
    console.log("Error in fetch run status: "+error)})
};



  render(){
    console.log('state',this.state)
    console.log('Data is ',tableData)

    var addDropDown = this.state.projects.map((project) => {
      return (<option value={project._id}>{project.name}</option>)
    })

    return (
      <div className="newRunTester">
        <div>
          <TopNavTester/>
        </div>
        <div className="newRunTester-left">
          <SideNavTester/>
        </div>
       
        <div className="form-group" >
          <Form className="newRunTester-right" onSubmit={this.submitTest}>
          <h2 align='center'>Get Run Status</h2>
          <FormGroup>
              <Label style={{marginTop:'5%'}}>Project</Label>
              <Input type="select" name='projectID' onChange={this.projectChangeHandler} >
                <option value={0}>Select Project</option>
                {addDropDown}
              </Input>
            </FormGroup>
              {/* <Input  type="submit">Get Run Status</Input> */}
            </Form>
            </div>
            <div>
              <br/><br/>
              <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Project</th>
          <th>Test Name</th>
          <th>Platform</th>
          <th>Status</th>
          <th>Run Result</th>
          <th>Total Jobs</th>
          <th>Device Minutes</th>
          <th>Passed</th>
          <th>Failed</th>
        </tr>
      </thead>
      <tbody>
        {tableData}
        </tbody>
        </Table>
      </div>
        
        
      </div>
    )
  }
}

export default EmulatorTestRunStatus;
