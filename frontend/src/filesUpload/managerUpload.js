
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


class ManagerFilesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileSelected: null,
            filesfromS3: [],
            options:[],
            projectName:null,
            projectsOptions:[]

        }

    }

    projectChangeHandler=(e)=>{
        this.setState({
            projectName:e.target.value
        });
        console.log(e.target.value)
        axios.get(ROOT_URL + '/manager/loadFiles/'+e.target.value).then(res => {
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
        fd.append('projectID', this.state.projectID);
        fd.append('projectName', this.state.projectName);
        fd.append('file', this.state.fileSelected);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        axios.post(ROOT_URL + '/manager/upload', fd, config).then((res) => {
            console.log(res.data);
            alert('File Uploaded Successfully')
            window.location.reload();

        }).catch(error => { console.log("Error while uploading file " + error) })

    }

    fileChangeHandle = (e) => {
        this.setState({
            fileSelected: e.target.files[0]
        });
    }

    componentDidMount() {

        let data = {
            userName: this.state.username,
            projectName: this.state.projectName
        }

        axios.get(ROOT_URL+'/projectsForManager/'+localStorage.getItem('ManagerID')).then(res=>{
            console.log('result from the load projects',res)
            let projectsOpts = res.data.projects.map(el =>{
            return (<option key={el.name} value={el.name}>{el.name}</option>)
            })
            this.setState({projectsOptions:projectsOpts})

        }).catch(err=>console.log(err))


    }



    onDeleteFileHandler(e) {
        console.log('Event',e)
        axios.post(ROOT_URL+'/manager/deleteFile',{file_key:e}).then((response)=>{
            alert('File Deleted Successfully')
            // window.location.reload()
        }).catch((err)=>{
            alert('Error in deleting the file '+err)})
    }




    render() {
        return (
          <div className="signup">
            <TopNavManager/>
            <SideNavManager/>
          <div className="signup-right">
                <div className="fileupload">

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
                        onDownloadFile={(fileKey) => { window.location = 'https://mtaasbucket.s3.us-east-2.amazonaws.com/' + fileKey }}
                    />
                </div>


                </div>
      </div>
    </div>

        )
    }
}

export default ManagerFilesView
