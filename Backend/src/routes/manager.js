var express = require('express');
var moment = require('moment');
var router = express.Router();
var manager = require('../models/manager');
var project = require('../models/project');
const AWS=require('aws-sdk');
var tester = require('../models/tester');
const multerS3 = require('multer-s3')
const multer = require('multer')
const awsConfig = require('../helpers/AWSConfig')
var notification = require('../models/notification');
var tester = require('../models/tester');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: awsConfig.AWS_KEY,
    secretAccessKey: awsConfig.AWS_SECRET
  });

const commonFilesUploadToS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'mtaasbucket',
      key: function (req, file, cb) {
          cb(null, req.body.name+'/'+'Common/'+file.originalname)
      }
    })
    })


router.post('/signup', function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (!err) {
            const name = req.body.name;
            const about = req.body.about;
            const company = req.body.company;
            const email = req.body.email;
            const password =hash;
            const DOB = req.body.DOB;

            const newManager = new manager({
                name,
                about,
                company,
                email,
                password,
                DOB
            });
            newManager.save((err, manager) => {
                if (err) {
                    var error = { message: "Manager already registered"}
                    next(error);
                } else if (manager == null) {
                   next();
                } else {
                    res.status(200).send({ message: "Successful Sign Up", id:manager._id});
                }
            })
        } else {
            next();
        }
    }); 
});

router.post('/login', function (req, res, next) {
    manager.findOne({ email: req.body.email }).exec((err, manager) => {
        if (err) {
           next();
        }
        else if (manager == null) {
            var error = { message: "Manager does not exist"}
            next(error);
        } else {
            bcrypt.compare(req.body.password, manager.password, function (err, result) {
                if (result) {
                    res.status(200).send({ message: "Logged In succesfully", id:manager._id, active : manager.active });
                } else {
                    var error = { message: "Invalid Password"}
                    next(error);
                }
            });
        }
    })
});

router.post('/upload',commonFilesUploadToS3.single('file'),function (req, res, next) {
    console.log('File here')
    let filePath = {filePath:req.body.name+'/'+'Common/'+req.file.originalname,fileName:req.file.originalname}
    console.log(filePath)
    console.log('id',req.body.id)
    project.findByIdAndUpdate(new ObjectId(req.body.id) ,{$push: {filePaths: filePath}}).exec((err, project) => {
        if (err) {
            next();
        } else {
            console.log('File Uploaded');
            res.status(200).send({ message: "Succesfully Uploaded file to AWS S3"});
        }
    });
});

router.get('/viewFiles/:id', function (req, res, next) {
    project.findById(req.params.id).exec((err, project) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ filePaths: project.filePaths });
        }
    });
});

router.post('/approve', function (req, res, next) {
    console.log('In Approved request')
    project.findByIdAndUpdate({"_id":req.body.projectID}, {$push: {testerID: req.body.testerID},
    $pull:[{activeApplication: req.body.testerID},{rejectedApplication: req.body.testerID}],
}).exec((err, project) => {
        if (err) {
           console.log(err)
        } else {
            tester.findByIdAndUpdate({"_id":req.body.testerID}, {
                $push:{projectID: req.body.projectID}
            }).exec((err, project) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('Approved')
                        res.status(200).send({ message: 'Application Approved'});
                    }
                });
        }
    });
});

router.post('/reject', function (req, res, next) {
    project.findByIdAndUpdate({"_id":req.body.projectID}, {
    $pull:{activeApplication: req.body.testerID},
    $push:{rejectedApplication:req.body.testerID}
}).exec((err, project) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: 'Application Rejected'});
        }
    });
});

router.post('/createProject', function (req, res, next) {
    const name = req.body.name;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;
    const technologies = req.body.technologies;
    const testCriteria = req.body.testCriteria;
    const managerID = req.body.managerID;
    const newProject = new project({
        name,
        startDate,
        endDate,
        description,
        technologies,
        testCriteria,
        managerID
    });

    newProject.save((err, project) => {
        if (err || project == null) {  
           next();
        } else {
            manager.findByIdAndUpdate(managerID,{'$push':{ "projectID": project._id }}).exec((err,manager) =>{
                if(err || manager == null){
                    next();
                }else{
                    res.status(200).send({ message: "Project Created Successfully"});
                }
            })
        }
    })
});

router.put('/updateProject', function (req, res, next) {
    var update = { name: req.body.name, startDate: req.body.startDate, endDate :req.body.endDate,description : req.body.description, technologies : req.body.technologies, testCriteria : req.body.testCriteria  }
    project.findByIdAndUpdate(req.body.id , update).exec((err, project) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Updated"});
        }
    });
});

router.put('/createNotification', function (req, res, next) {
    const description = req.body.description;
    const createdOn = moment.now();
    const managerID = req.body.managerID;
    const projectID = req.body.projectID;
    const newNotification = new notification({
        description,
        createdOn,
        managerID,
        projectID
    });
    newNotification.save((err, notification) => {
        if (err || notification == null) {  
           next();
        } else {
            manager.findByIdAndUpdate(managerID,{'$push':{ "notificationID": notification._id }}).exec((err,manager) =>{
                if(err || manager == null){
                    next();
                }else{
                    tester.updateMany({projectID : {$in: [req.body.projectID] }},{'$push':{ "notificationID": notification._id }}).exec((err,tester)=>{
                        if(err){
                            next();
                        }else{
                            res.status(200).send({ message: "Notification Created Successfully"});

                        }
                    })
                }
            })
        }
    })
});
router.use((error, req, res, next) => {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify(error));
})

router.use((req, res, next) => {
    var message = [];
    var errors = "Something went wrong!";
    message.push(errors);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify(message));
})

module.exports = router;