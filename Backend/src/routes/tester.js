var express = require('express');
var router = express.Router();
var tester = require('../models/tester');
var notification = require('../models/notification');
var project = require('../models/project');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var moment = require('moment');
moment().format();
var application = require('../models/application');
const multerS3 = require('multer-s3')
const multer = require('multer')
const awsConfig = require('../helpers/AWSConfig')
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: awsConfig.AWS_KEY,
    secretAccessKey: awsConfig.AWS_SECRET,
    region: 'us-east-2'
});

const testerFilesUploadToS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mtaasbucket',
        key: function (req, file, cb) {
            cb(null, req.body.projectName + '/' + req.body.testerName+'/' + file.originalname)
        }
    })
})

router.post('/signup', function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (!err) {
            const name = req.body.name;
            const about = req.body.about;
            const technologies = req.body.technologies;
            const email = req.body.email;
            const password = hash;
            const DOB = req.body.DOB;
            const newTester = new tester({
                name,
                about,
                technologies,
                email,
                password,
                DOB
            });
            newTester.save((err, tester) => {
                if (err) {
                    var error = { message: "Tester already registered" }
                    next(error);
                } else if (tester == null) {
                    next();
                } else {
                    res.status(200).send({ message: "Successful Sign Up", id: tester._id });
                }
            })
        } else {
            next();
        }
    });
});

router.post('/login', function (req, res, next) {
    tester.findOne({ email: req.body.email }).exec((err, tester) => {
        if (err) {
            next();
        }
        else if (tester == null) {
            var error = { message: "Tester does not exist" }
            next(error);
        } else {
            bcrypt.compare(req.body.password, tester.password, function (err, result) {
                if (result) {
                    res.status(200).send({ message: "Logged In succesfully", id:tester._id, active: tester.active});
                } else {
                    var error = { message: "Invalid Password" }
                    next(error);
                }
            });
        }
    })
});


router.put('/update', function (req, res, next) {
    var update = { name: req.body.name, about: req.body.about, DOB: req.body.DOB, technologies: req.body.technologies, email: req.body.email }
    tester.findByIdAndUpdate(req.body.id, update).exec((err, tester) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Updated" });
        }
    });
});


router.get('/loadProjects/:id', function (req, res, next) {
    project.find({ 'endDate': { $gt: moment() } }).populate("managerID").exec((err, project) => {
        if (err) {
            console.log(err)
            next();
        } else {
            tester.findOne({ '_id': req.params.id }).exec((err, tester) => {
                if (err)
                    next(err)
                let results = []
                console.log(tester)
                project.forEach(el => {
                    if (!tester.appliedTo.includes(el._id))
                        results.push(el)
                })
                console.log("project",results)
                application.find({'testerID':req.params.id}).populate('projectID').exec((err,app)=>{
                    if(err)
                    next(err)
                    let finalResult = {'activeprojects':results,"applications":app}
                    res.status(200).send(finalResult);

                })
                
            })

        }
    });
});

router.post('/applyProject', function (req, res, next) {
    console.log('here in the loadprpjects')
    const managerID = req.body.managerID;
    const testerID = req.body.testerID;
    const projectID = req.body.projectID;
    const newApplication = new application({
        managerID,
        testerID,
        projectID
    });
    newApplication.save((err, app) => {
        if (err) {
            next(error);
        } else if (app == null) {
            next();
        } else {
            tester.findByIdAndUpdate({ "_id": req.body.testerID }, { $push: { appliedTo: req.body.projectID } }).exec((err, tester) => {
                if (err)
                    next(err)
                res.status(200).send({ message: "Application Success", tester: tester });

            }
            )

        }
    })
});

router.delete('/deleteNotification', function (req, res, next) {
    tester.findByIdAndUpdate( req.body.id , {'$pull':{ "notificationID": req.body.notificationID }}).exec((err, tester) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Deleted"});
        }
    });
});
router.get('/notification/(:id)', function (req, res, next) {
    tester.findById( req.params.id).populate({path : "notificationID", populate :[{ path : 'managerID', model : 'manager'}, {path : 'projectID', model : 'project'}]}).exec((err, tester) => {
        if (err) {
            next();
        } else {
            res.status(200).send({  notifications : tester.notificationID});
        }
    });
});

router.post('/upload', testerFilesUploadToS3.single('file'), function (req, res, next) {
    console.log('File here')
    let filePath = { filePath: req.body.projectName + '/' +req.body.testerName+'/' + req.file.originalname, fileName: req.file.originalname }
    console.log(filePath)
    tester.findOneAndUpdate({"_id":req.body.testerID}, { $push: { s3files:filePath } }).exec((err, project) => {
        if (err) {
            next(err);
        } else {
            console.log('File Uploaded');
            res.status(200).send({ message: "Succesfully Uploaded file to AWS S3" });
        }
    });
});
router.post('/loadFiles', function (req, res, next) {
    console.log('in the loadfiles',req.body)
      let bucketParams={
        Bucket:'mtaasbucket',
        Prefix:req.body.projectName+'/'+req.body.testerName+'/'
    }
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