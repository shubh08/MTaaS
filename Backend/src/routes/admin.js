var express = require('express');
var router = express.Router();
var admin = require('../models/admin');
var manager = require('../models/manager');
var tester = require('../models/tester');
var project = require('../models/project');
const AWS = require('aws-sdk');
const awsConfig = require('../helpers/AWSConfig')
const bcrypt = require('bcrypt');
const multerS3 = require('multer-s3')
const multer = require('multer')
const saltRounds = 10;

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: awsConfig.AWS_KEY,
    secretAccessKey: awsConfig.AWS_SECRET,
    region: 'us-east-2'
});

const adminFilesUploadToS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mtaasbucket',
        key: function (req, file, cb) {
            cb(null, req.body.projectName + '/' + 'AdminDocs/' + file.originalname)
        }
    })
})


router.post('/signup', function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (!err) {
            const name = req.body.name;
            const email = req.body.email;
            const password =hash;
            const DOB = req.body.DOB;

            const newAdmin = new admin({
                name,
                email,
                password,
                DOB
            });
            newAdmin.save((err, admin) => {
                if (err) {
                    var error = { message: "Admin already registered"}
                    next(error);
                } else if (admin == null) {
                   next();
                } else {
                    res.status(200).send({ message: "Successful Sign Up", id:admin._id});
                }
            })
        } else {
            next();
        }
    }); 
});

router.post('/login', function (req, res, next) {
    admin.findOne({ email: req.body.email }).exec((err, admin) => {
        if (err) {
           next();
        }
        else if (admin == null) {
            var error = { message: "Admin does not exist"}
            next(error);
        } else {
            bcrypt.compare(req.body.password, admin.password, function (err, result) {
                if (result) {
                    res.status(200).send({ message: "Logged In succesfully", id:admin._id});
                } else {
                    var error = { message: "Invalid Password"}
                    next(error);
                }
            });
        }
    })
});

router.put('/update', function (req, res, next) {
    var update = { name: req.body.name, email: req.body.email }
    admin.findByIdAndUpdate(req.body.id , update).exec((err, admin) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Updated"});
        }
    });
});

router.put('/blockTester', function (req, res, next) {
    tester.findByIdAndUpdate(req.body.id , {active : false} ).exec((err, tester) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Blocked"});
        }
    });
});
router.put('/unblockTester', function (req, res, next) {
    
    tester.findByIdAndUpdate(req.body.id , {active : true}).exec((err, tester) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Unblocked"});
        }
    });
});

router.put('/blockManager', function (req, res, next) {
    
    manager.findByIdAndUpdate(req.body.id , {active : false}).exec((err, manager) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Blocked"});
        }
    });
});


router.put('/unblockManager', function (req, res, next) {
    manager.findByIdAndUpdate(req.body.id , {active : true}).exec((err, manager) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Unblocked"});
        }
    });
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
router.get('/loadFiles/:name', function (req, res, next) {
    console.log('in the loadfiles',req.params.name)
      let bucketParams={
        Bucket:'mtaasbucket',
        Prefix:req.params.name+'/'
    }
  console.log('in the loadfiles admin!!!:)')
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

router.get('/projectsForAdmin', function (req, res, next) {
    project.find().populate("testerID").exec((err, projects) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ projects: projects });
        }
    });
});
router.post('/upload', adminFilesUploadToS3.single('file'), function (req, res, next) {
    console.log('File here', req.body)
    let filePath = { filePath: req.body.projectName + '/' + 'AdminDocs/' + req.file.originalname, fileName: req.file.originalname }
    console.log(filePath)
    //console.log('id', req.body.id)
    project.findOneAndUpdate({"name":req.body.projectName}, { $push: { adminDocs: filePath } }).exec((err, project) => {
        if (err) {
            next(err);
        } else {
            console.log('File Uploaded for admin success!!!');
            res.status(200).send({ message: "Succesfully Uploaded file to AWS S3" });
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