var express = require('express');
var router = express.Router();
var project = require('../models/project');
var manager = require('../models/manager');
var tester = require('../models/tester');




router.get('/allManagers', function (req, res, next) {
    manager.find().populate("projectID").exec((err, managers) => {
        if (err) {
            next();
        } else {
            res.status(200).send({managers : managers});
        }
    });
});
router.get('/managerByManagerID/(:id)', function (req, res, next) {
    manager.findById(req.params.id).populate("projectID").exec((err, manager) => {
        if (err) {
            next();
        } else {
            res.status(200).send({manager : manager});
        }
    });
});
router.get('/managerByProjectID/(:id)', function (req, res, next) {
    manager.find({projectID : {$in: [req.params.id] }}).populate("projectID").exec((err, manager) => {
        if (err) {
            next();
        } else {
            res.status(200).send({manager : manager});
        }
    });
});
router.get('/allTesters', function (req, res, next) {
    tester.find().populate("projectID").exec((err, testers) => {
        if (err) {
            next();
        } else {
            res.status(200).send({testers : testers});
        }
    });
});
router.get('/testerByTesterID/(:id)', function (req, res, next) {
    tester.findById(req.params.id).populate("projectID").exec((err, testers) => {
        if (err) {
            next();
        } else {
            res.status(200).send({testers : testers});
        }
    });
});
router.get('/allProjects', function (req, res, next) {
    project.find().populate("managerID").exec((err, projects) => {
        if (err) {
            next();
        } else {
            res.status(200).send({projects : projects});
        }
    });
});
router.get('/projectsForManager/(:id)', function (req, res, next) {
    project.find({managerID : req.params.id }).populate("managerID").exec((err, projects) => {
        if (err) {
            next();
        } else {
            res.status(200).send({projects : projects});
        }
    });
});
router.get('/projectsForTester/(:id)', function (req, res, next) {
    project.find({testerID : {$in: [req.params.id] }}).populate("managerID").exec((err, projects) => {
        if (err) {
            next();
        } else {
            res.status(200).send({projects : projects});
        }
    });
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