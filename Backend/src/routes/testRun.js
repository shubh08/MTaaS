var express = require('express');
var router = express.Router();
var testerRun = require('../models/TestRun');
var notification = require('../models/notification');
var project = require('../models/project');
var moment = require('moment');
moment().format();
const multer = require('multer')
const awsConfig = require('../helpers/AWSConfig')
const AWS = require('aws-sdk');
var fs=require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var Request = require('request');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

var devicefarm = new AWS.DeviceFarm({apiVersion: '2015-06-23',
                                        accessKeyId:awsConfig.AWS_DEVICE_FARM_KEY,
                                        secretAccessKey:awsConfig.AWS_DEVICE_FARM_SECRET,
                                        region:'us-west-2'});







async function getUploadStatus(UPLOAD_ARN){
    return await devicefarm.getUpload({arn: UPLOAD_ARN}).promise().then(
        function(data){
            return data.upload.status;
        },function(error){
            console.error("getting upload failed with error: ", error);
        }
    );
}


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
      
    }
})

const upload = multer({storage:storage})

router.post('/dummyRun', function (req, res, next) {
console.log('herere')
console.log(req.file)
console.log(req.file.path)
res.send('fineshed')
})

router.post('/createRun',upload.single('file'), function (req, res, next) {
createRun(req,res)
})

createRun = async (req,res)=>{
    console.log('Inside createRun');
    console.log(req.body)
    console.log(req.file.path)
    
    const userName=req.body.userName
    const projectName=req.body.projectName
    const runname=req.body.runname
    const appFileName=req.body.appFileName
    const appFileType=req.body.appFileType
    const devicePoolName=req.body.devicePoolName
    const devicePoolARNs=req.body.devicePoolARNs
    let DEVICE_POOL_ARN= 'arn:aws:devicefarm:us-west-2::devicepool:082d10e5-d7d7-48a5-ba5c-b33d66efa1f5'
    const testType=req.body.testType
    const testPackageFileName='zip-with-dependencies.zip'
    const testPackageFileType=req.body.testPackageFileType

    //Array of test file names that need to be zipped
   // const testFileNames=JSON.parse(req.body.testFileNames)
    const testPackageFile='testScriptFolder/zip-with-dependencies.zip'

    let project_params={
        name:userName+'_'+projectName+'_'+runname
    }
    let PROJECT_ARN = await devicefarm.createProject(project_params).promise().then(
        function(data){
            return data.project.arn;
        },
        function (error) {
            console.log("Error creating project", "Error: ", error);
            res.status(400).json("Error creating project", "Error: ", error)
        }
    );
    console.log("Project created with name: "+projectName+'_'+runname+ " Project arn: ", PROJECT_ARN);

    // create the upload and upload files to the project
    let app_upload_params = {
        name: appFileName,
        type: appFileType,
        projectArn: PROJECT_ARN
    };
    let APP_UPLOAD = await devicefarm.createUpload(app_upload_params).promise().then(
        function(data){
            return data.upload;
        },
        function(error){
            console.log("Creating upload failed with error: ", error);
            res.status(400).json("Creating upload failed with error: ", error)
        }
    );

    let APP_UPLOAD_ARN = APP_UPLOAD.arn;
    let APP_UPLOAD_URL = APP_UPLOAD.url;
    console.log("app upload created with arn: ", APP_UPLOAD_ARN);
    console.log("uploading app file...");

    let options = {
        method: 'PUT',
        url: APP_UPLOAD_URL,
        headers: {},
        body: fs.readFileSync(req.file.path)
    };

    // wait for upload to finish
    await new Promise(function(resolve,reject){
        Request(options, function (error, response, body) {
            if (error) {
                console.log("uploading app file failed with error: ", error);
                res.status(400).json('uploading app file failed with error: '+error)
                reject(error);
            }
            resolve(body);
        });
    });
