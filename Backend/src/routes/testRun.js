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
