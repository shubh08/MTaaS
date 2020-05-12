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
import Button from 'react-bootstrap-button-loader';
let tableData = []

//import Multiselect from 'multiselect-dropdown-react';
class TestRunStatus extends React.Component{
constructor(props)
{
  super(props)
  this.state={
    username:'',
    projectID:'',
    projects:[],
    projectName:'',
    tableData:[],
    loading:false



  }
  this.refreshData = this.refreshData.bind(this)
}
 myFunction =(e)=> {
  console.log(e.target.value)
  var x = document.getElementById(e.target.value);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
refreshData(e){

let data = {RUN_ARN:e.target.value,projectID:this.state.projectID}
console.log('data is', data)
toast.success('Data refresh request sent. Please refresh this page after 1 minute!', {
  position: toast.POSITION.TOP_CENTER
});
  axios.post(ROOT_URL + '/testRun/getRunStatus/',data).then((response) => {
    if (response.status == 200) {
      console.log(response.data)
      axios.post(ROOT_URL+'/testRun/loadRunData',{projectName:this.state.projectName}).then((res)=>{
        console.log('result is',res);
        tableData = res.data.data.map((el,i)=>{
          console.log('el result',el.result)
         return ( <tr>
            <th scope="row">{i+1}</th>
          <td>{el.userName}</td>
          <td>{el.projectName}</td>
          <td>{el.name}</td>
          <td>{el.type}</td>
          <td>{el.platform}</td>
         <td><Badge color="info">{el.status}</Badge>{el.status!='SCHEDULING'?<button value={el.arn}onClick={this.myFunction}>Device</button>:''}

         <div id={el.arn} style={{display:"none"}}>
     {el.status!='SCHEDULING'? <Table>
      <thead>
        <tr>
          <th>Device Name</th>
          <th>Total Minutes</th>
         </tr>
         </thead>
         {el.jobs.map((el1)=>{
           return(<tr><td>{el1.name}</td><td>{el1.deviceMinutes!=undefined?el1.deviceMinutes.total:0}</td></tr>)
         })}
         <tbody>

        </tbody>
      </Table>:''}
    </div>
         </td>
         <td>{el.status=='SCHEDULING'?<button  style={{backgroundColor:'#28a745'}} value = {el.arn} onClick={this.refreshData}>Refresh Status</button>:<Badge color="success">Latest Data</Badge>}</td>
         <td>{el.result=='PENDING'?<Badge color="warning">Pending</Badge>:(el.result=='PASSED'?<Badge color="success">{el.result}</Badge>:<Badge color="info">{el.result}</Badge>)}</td>
          <td>{el.totalJobs}</td>
          <td>{el.counters.passed}</td>
          <td>{el.counters.failed}</td>
          <td>{el.counters.errored}</td>
          </tr>)
        })
        toast.success('Data refresh Successful!', {
          position: toast.POSITION.TOP_CENTER
        });
        this.setState({tableData:res.data.data,loading:false})
    }).catch(error => {
        console.log("Error in fetch run status: "+error)})
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
  axios.post(ROOT_URL+'/testRun/loadRunData',{projectName:projectName}).then((res)=>{
    console.log('result is',res);
    tableData = res.data.data.map((el,i)=>{
      console.log('el result',el.result)
     return ( <tr>
        <th scope="row">{i+1}</th>
      <td>{el.userName}</td>
      <td>{el.projectName}</td>
      <td>{el.name}</td>
      <td>{el.type}</td>
      <td>{el.platform}</td>
      <td><Badge color="info">{el.status}</Badge>{el.status!='SCHEDULING'?<button value={el.arn}onClick={this.myFunction}>Device</button>:''}

         <div id={el.arn} style={{display:"none"}}>
     {el.status!='SCHEDULING'? <Table>
      <thead>
        <tr>
          <th>Device Name</th>
          <th>Total Minutes</th>
         </tr>
         </thead>
         {el.jobs.map((el1)=>{
           return(<tr><td>{el1.name}</td><td>{el1.deviceMinutes!=undefined?el1.deviceMinutes.total:0}</td></tr>)
         })}
         <tbody>

        </tbody>
      </Table>:''}
    </div></td>
     <td>{el.status=='SCHEDULING'?<button  style={{backgroundColor:'#28a745'}} value = {el.arn} onClick={this.refreshData}>Refresh Status</button>:<Badge color="success">Latest Data</Badge>}</td>
     <td>{el.result=='PENDING'?<Badge color="warning">Pending</Badge>:(el.result=='PASSED'?<Badge color="success">{el.result}</Badge>:<Badge color="info">{el.result}</Badge>)}</td>
      <td>{el.totalJobs}</td>
      <td>{el.counters.passed}</td>
      <td>{el.counters.failed}</td>
      <td>{el.counters.errored}</td>
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
          <TopNavTester/>
          <SideNavTester/>
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
            <div className="statusRight">
               <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Project</th>
                      <th>Test Name</th>
                      <th>Test Type</th>
                      <th>Platform</th>
                      <th>Status</th>
                      <th>Data Status</th>
                      <th>Run Result</th>
                      <th>Total Jobs</th>
                      <th>Passed</th>
                      <th>Failed</th>
                      <th>Errored</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData}
                  </tbody>
              </Table>
            </div>
          </div>
      </div>
    )
  }
}

export default TestRunStatus;
