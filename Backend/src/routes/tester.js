var express = require('express');
var router = express.Router();
var tester = require('../models/tester');
var project = require('../models/project');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var moment = require('moment');
moment().format();
var application = require('../models/application');

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
                    res.status(200).send({ message: "Logged In succesfully", id: tester._id });
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
            console.log("err")
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
                console.log("project")
                res.status(200).send(results);
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