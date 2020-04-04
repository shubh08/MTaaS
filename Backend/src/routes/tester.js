var express = require('express');
var router = express.Router();
var tester = require('../models/tester');
var project = require('../models/project');

const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/signup', function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (!err) {
            const name = req.body.name;
            const about = req.body.about;
            const technologies = req.body.technologies;
            const email = req.body.email;
            const password =hash;
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
                    var error = { message: "Tester already registered"}
                    next(error);
                } else if (tester == null) {
                   next();
                } else {
                    res.status(200).send({ message: "Successful Sign Up", id:tester._id});
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
            var error = { message: "Tester does not exist"}
            next(error);
        } else {
            bcrypt.compare(req.body.password, tester.password, function (err, result) {
                if (result) {
                    res.status(200).send({ message: "Logged In succesfully", id:tester._id});
                } else {
                    var error = { message: "Invalid Password"}
                    next(error);
                }
            });
        }
    })
});


router.put('/update', function (req, res, next) {
    var update = { name: req.body.name, about: req.body.about, DOB: req.body.DOB, technologies: req.body.technologies, email: req.body.email }
    tester.findByIdAndUpdate( req.body.id , update).exec((err, tester) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Updated"});
        }
    });
});


router.get('/loadProjects', function (req, res, next) {
    project.find().populate("managerID").exec((err, project) => {
        if (err) {
            console.log("err")
            next();
        } else {
            console.log("project")
            res.status(200).send(project);
        }
    });
});

router.post('/applyProject', function (req, res, next) {
    console.log('here in the loadprpjects')
    project.findOneAndUpdate(
        {"_id":req.body.projectID},
        {$push: {activeApplication: req.body.testerID},
    $pull:{rejectedApplication: req.body.testerID}},
            function(err,tester) {
                if (err) {
                    console.log("err")
                    next();
                }
                else{
                    console.log('Applied to project')
                    res.status(200).send({status:true});
                  }
            }
        );
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