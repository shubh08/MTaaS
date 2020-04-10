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
