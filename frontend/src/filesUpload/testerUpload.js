
import { Jumbotron, Container, Button } from 'reactstrap';
import './signup.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import '../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css'
import FileBrowser from 'react-keyed-file-browser'
import React from 'react';

import axios from 'axios'
import Moment from 'moment'

import './signup.css';
import { ROOT_URL } from '../config/config.js'
import SideNavManager from '../navigation/sidenavManager';
import TopNavManager from '../navigation/topnavManager';
import { toast } from 'react-toastify';
import SideNavTester from '../navigation/sidenavTester';


class TesterFilesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileSelected: null,
            filesfromS3: [],
            options: [],
            projectName: null,
            projectsOptions:[],
            name:''
            

        }

    }

    projectChangeHandler = (e) => {
        if(e.target.value!='dummy')
        {
        this.setState({
            projectName: e.target.value
        },()=>{
            this.loadProjects()
        });
        console.log('Project Name Set',e.target.value)
       
    }
    }

    loadProjects = () => {
        console.log('Project Name',this.state.projectName)
        let data = { projectName: this.state.projectName, testerName: this.state.name }
        axios.post(ROOT_URL + '/tester/loadFiles/', data).then(res => {
            console.log(res.data)
            this.setState({
                filesfromS3: res.data.map((el) => {
                    return {
                        key: el.key,
                        url: 'https://mtaasbucket.s3.us-east-2.amazonaws.com/' + el.key,
                        modified: Moment(el.modified),
                        size: el.size
                    }
                })
            })

        }).catch(err => console.log(err))
    }

    uploadFile = (e) => {

        e.preventDefault()
        let fd = new FormData()
        fd.append('testerName', this.state.name);
        fd.append('testerID', localStorage.getItem('TesterID'));
        fd.append('projectName', this.state.projectName);
        fd.append('file', this.state.fileSelected);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        axios.post(ROOT_URL + '/tester/upload', fd, config).then((res) => {
            console.log(res.data);
            alert('File Uploaded Successfully')
            this.loadProjects()

        }).catch(error => { console.log("Error while uploading file " + error) })

    }

    fileChangeHandle = (e) => {
        this.setState({
            fileSelected: e.target.files[0]
        });
    }

    componentDidMount() {


        axios.get(ROOT_URL + '/testerByTesterID/' + localStorage.getItem('TesterID')).then((response) => {
            if (response.status == 200) {
              let tester = response.data.testers;
              axios.get(ROOT_URL + '/projectsForTester/'+localStorage.getItem('TesterID')).then(res => {
                console.log('result from the load projects', res)
                let projectsOpts = []
                projectsOpts = res.data.projects.map(el => {
                    return (<option key={el.name} value={el.name}>{el.name}</option>)
                })
                projectsOpts.unshift(<option key='dummy' value='dummy'>Select Project</option>)
                this.setState({ name: tester.name, email: tester.email, projectsOptions: projectsOpts});
    
            }).catch(err => console.log(err))
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



    onDeleteFileHandler(e) {
  
    }

  


    render() {
        return (
            <div className="homepage">
            <div>
              <TopNavManager/>
            </div>
            <div className="homepage-left">
              <SideNavTester/>
            </div>
            
            <div className="homepage-right">
                <div className="">
                    <Jumbotron fluid>
                        <Container fluid>
                            <h1 center className="display-3">Mobile Testing as a Service</h1>
                        </Container>
                        <header className="">
                            <Form onSubmit={this.uploadFile}>
                                <FormGroup>
                                    <FormGroup>
                                        <Label for="exampleSelect">Select Project</Label>
                                        <Input type="select" name="select" id="select" onChange={this.projectChangeHandler}>>
                                            {this.state.projectsOptions}
                                        </Input>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleSelect">Upload you files!</Label>
                                    <Input type="file" name="file" id="file" placeholder="Select file to upload"
                                        onChange={this.fileChangeHandle}
                                        required
                                    />
                                </FormGroup>
                                <Row>
                                    <Col></Col>
                                    <Col><Button className="textCenterSignup" type="submit">Submit</Button></Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </header>
                        <br />
                        <h4 style={{align:'center'}}>Your Files</h4>
                <div className="fileBrowserDiv">
                    <FileBrowser
                        files={this.state.filesfromS3}
                        icons={{
                            Text: <i className="fa fa-file-text" aria-hidden="true" />,
                            File: <i className="fa fa-file" aria-hidden="true" />,
                            Image: <i className="fa fa-file-image" aria-hidden="true" />,
                            Video: <i className="fa fa-file-video" aria-hidden="true" />,
                            Audio: <i className="fa fa-file-audio" aria-hidden="true" />,
                            Archive: <i className="fa fa-file-archive" aria-hidden="true" />,
                            Word: <i className="fa fa-file-word" aria-hidden="true" />,
                            Excel: <i className="fa fa-file-excel" aria-hidden="true" />,
                            PowerPoint: <i className="fa fa-file-powerpoint" aria-hidden="true" />,
                            Text: <i className="fa fa-file-text" aria-hidden="true" />,
                            PDF: <i className="fa fa-file-pdf" aria-hidden="true" />,
                            Rename: <i className="fa fa-i-cursor" aria-hidden="true" />,
                            Folder: <i className="fa fa-folder" aria-hidden="true" />,
                            FolderOpen: <i className="fa fa-folder-open" aria-hidden="true" />,
                            Delete: <i className="fa fa-trash" aria-hidden="true" />,
                            Loading: <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true" />,
                            Download: <i className="fa fa-download" aria-hidden="true" />
                        }}
                        onDeleteFile={this.onDeleteFileHandler}
                        onDownloadFile={(fileKey) => { window.location = this.state.base_url + fileKey }}
                    />
                    
                </div>
                    </Jumbotron>
                    
                </div>
     
            </div>
            </div>

        )
    }
}

export default TesterFilesView