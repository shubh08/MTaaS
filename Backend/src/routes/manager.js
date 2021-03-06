var express = require('express');
var moment = require('moment');
var router = express.Router();
var manager = require('../models/manager');
var project = require('../models/project');
var bugreports = require('../models/bugReport');
const AWS = require('aws-sdk');
var tester = require('../models/tester');
const multerS3 = require('multer-s3')
const multer = require('multer')
const awsConfig = require('../helpers/AWSConfig')
var notification = require('../models/notification');
var tester = require('../models/tester');

const bcrypt = require('bcrypt');
const saltRounds = 10;
var application = require('../models/application');


const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: awsConfig.AWS_KEY,
    secretAccessKey: awsConfig.AWS_SECRET,
    region: 'us-east-2'
});

const commonFilesUploadToS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mtaasbucket',
        key: function (req, file, cb) {
            cb(null, req.body.projectName + '/' + 'Common/' + file.originalname)
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
            const password = hash;
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
                    var error = { message: "Manager already registered" }
                    next(error);
                } else if (manager == null) {
                    next();
                } else {
                    res.status(200).send({ message: "Successful Sign Up", id: manager._id });
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
            var error = { message: "Manager does not exist" }
            next(error);
        } else {
            bcrypt.compare(req.body.password, manager.password, function (err, result) {
                if (result) {
                    res.status(200).send({ message: "Logged In succesfully", id: manager._id, active: manager.active });
                } else {
                    var error = { message: "Invalid Password" }
                    next(error);
                }
            });
        }
    })
});

router.post('/upload', commonFilesUploadToS3.single('file'), function (req, res, next) {
    console.log('File here', req.body)
    let filePath = { filePath: req.body.projectName + '/' + 'Common/' + req.file.originalname, fileName: req.file.originalname }
    console.log(filePath)
    console.log('id', req.body.id)
    project.findOneAndUpdate({"name":req.body.projectName}, { $push: { commanfiles: filePath } }).exec((err, project) => {
        if (err) {
            next(err);
        } else {
            console.log('File Uploaded');
            res.status(200).send({ message: "Succesfully Uploaded file to AWS S3" });
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
    application.findOneAndUpdate({ _id: req.body.applicationID }, { $set: { status: 'Approved' } }).exec((err, app) => {
        if (err) {
            next(err);
        } else {
            project.findByIdAndUpdate({ "_id": req.body.projectID }, { $push: { testerID: req.body.testerID } }).exec((err, project) => {
                if (err) {
                    next(err);
                }
                else {
                    tester.findByIdAndUpdate({ "_id": req.body.testerID }, {
                        $push: { projectID: req.body.projectID }
                    }).exec((err, tester) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('Approved')
                            res.status(200).send({ message: 'Application Approved', tester: tester });
                        }
                    });
                }
            })
        }
    })
})

router.post('/reject', function (req, res, next) {
    application.findOneAndUpdate({ _id: req.body.applicationID }, { $set: { status: 'Reject' } }).exec((err, app) => {
        if (err) {
            next(err);
        } else {
            res.status(200).send({ message: 'Application Rejected', app: app });
        }
    })
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
            manager.findByIdAndUpdate(managerID, { '$push': { "projectID": project._id } }).exec((err, manager) => {
                if (err || manager == null) {
                    next();
                } else {
                    res.status(200).send({ message: "Project Created Successfully" });
                }
            })
        }
    })
});


router.put('/updateProject', function (req, res, next) {
    var update = { name: req.body.name, startDate: req.body.startDate, endDate: req.body.endDate, description: req.body.description, technologies: req.body.technologies, testCriteria: req.body.testCriteria }
    project.findByIdAndUpdate(req.body.id, update).exec((err, project) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Updated" });
        }
    });
});

router.post('/createNotification', function (req, res, next) {
    const description = req.body.description;
    const createdOn = moment.now();
    const managerID = req.body.managerID;
    const projectID = req.body.projectID;
    const severity = req.body.severity;
    const newNotification = new notification({
        description,
        createdOn,
        managerID,
        projectID,
        severity
    });
    newNotification.save((err, notification) => {
        if (err || notification == null) {
            next();
        } else {
            manager.findByIdAndUpdate(managerID, { '$push': { "notificationID": notification._id } }).exec((err, manager) => {
                if (err || manager == null) {
                    next();
                } else {
                    tester.updateMany({ projectID: { $in: [req.body.projectID] } }, { '$push': { "notificationID": notification._id } }).exec((err, tester) => {
                        if (err) {
                            next();
                        } else {
                            res.status(200).send({ message: "Notification Created Successfully" });

                        }
                    })
                }
            })
        }
    })
});
router.put('/blockProject', function (req, res, next) {
    project.findByIdAndUpdate(req.body.id , {active : false}).exec((err, project) => {
        if (err) {
            next(err);
        } else {
            res.status(200).send({ message: "Succesfully Blocked"});
        }
    });
});
router.put('/unblockProject', function (req, res, next) {
    project.findByIdAndUpdate(req.body.id , {active : true}).exec((err, project) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully unblocked"});
        }
    });
});

router.get('/notification/(:id)', function (req, res, next) {
    manager.findById(req.params.id).populate({ path: "notificationID", populate: [{ path: 'managerID', model: 'manager' }, { path: 'projectID', model: 'project' }] }).exec((err, manager) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ notifications: manager.notificationID });
        }
    });
});

// router.get('/bugs/:id', function (req, res, next) {
//     console.log(req.body);
//     console.log("Inside Bugs");
//     bugreports.findById(req.params.id).exec((err, project) => {
//     //bugreports.find({ 'projectID': req.params.id }).exec((err, bug) => {
//       if (err) {
//           next(err);
//       } else {
//           console.log('Got all the bugs on the project', bug)
//           res.status(200).send({ bugs: bug });
//           console.log(res.body);
//       }
//   });
// });

router.put('/update', function (req, res, next) {
    var update = { name: req.body.name, about: req.body.about, email: req.body.email, company: req.body.company }
    manager.findByIdAndUpdate(req.body.id, update).exec((err, project) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Updated" });
        }
    });
});

router.get('/loadApplications/:id', function (req, res, next) {
    application.find({ 'managerID': req.params.id }).populate('testerID').populate('projectID').exec((err, apps) => {
        if (err) {
            next(err);
        } else {
            console.log('result', apps)
            res.status(200).send({ applications: apps });
        }
    });
});

router.get('/loadFiles/:name', function (req, res, next) {
    console.log('in the loadfiles',req.params.name)
      let bucketParams={
        Bucket:'mtaasbucket',
        Prefix:req.params.name+'/'
    }
    console.log('in the loadfiles2')
    s3.listObjects(bucketParams, function(err, data) {
             if (err) {
                 console.log("Error in fetching contents of Bucket: "+err);
                 res.status(400).json("Error in fetching contents of Bucket: "+err)
             } else {
                 let files=[]
                 files=data.Contents.map((el)=>{
                     return {
                         key:el.Key,
                         modified:el.LastModified,
                         size:el.Size,

                     }
                 })
                 res.json(files)
             }
        });

});

router.post('/deleteFile',function(req,res,next){
   deleteFile(req,res,next)
})


//Delete File Helper Function
deleteFile = async(req,res,next)=>{
    console.log('Inside Delete File',req.body.file_key[0])
    console.log('Type',typeof req.body.file_key)
    let str = JSON.stringify(req.body.file_key)
    console.log('String is ',str)
    const bucketParams={
        Bucket:'mtaas',
        Key:req.body.file_key[0]
    }
    try {
        await s3.headObject(bucketParams).promise()
        console.log("File Found in S3")
        try {
            await s3.deleteObject(bucketParams).promise()
            console.log("file deleted from s3 Successfully")
            res.json('File Deleted Successfully')
        }
        catch (err) {
            next(err)
        }
    }
    catch (err) {
        next(err)
    }
}

router.put('/removeTesterFromProject', function (req, res, next) {
    tester.findByIdAndUpdate(req.body.testerID, { '$pull': { "projectID": req.body.projectID } }).exec((err, test) => {
        if (err) {
            next();
        } else {
            project.findByIdAndUpdate(req.body.projectID, { '$pull': { "testerID": req.body.testerID } }).exec((err, proj) => {
                const description = "You have been released from the project " + proj.name + " by the Manager";
                const createdOn = moment.now();
                const managerID = proj.managerID;
                const projectID = req.body.projectID;
                const severity = "1";
                const newNotification = new notification({
                    description,
                    createdOn,
                    managerID,
                    projectID,
                    severity
                });
                newNotification.save((err, notif) => {
                    if (err) {
                        next();
                    } else {
                        manager.findByIdAndUpdate(managerID, { '$push': { "notificationID": notif._id } }).exec((err, manage) => {
                            if (err) {
                                next();
                            } else {
                                tester.findByIdAndUpdate(req.body.testerID, { '$push': { "notificationID": notif._id } }).exec((err, tester) => {
                                    if (err) {
                                        next();
                                    } else {
                                        res.status(200).send({ message: "Succesfully Deleted the project" });
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }
    });
});

router.use((error, req, res, next) => {
    res.writeHead(201, {
        'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify(error));
})

router.use((req, res, next) => {
    var message = [];
    var errors = "Something went wrong!";
    message.push(errors);
    res.writeHead(201, {
        'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify(message));
})

module.exports = router;
