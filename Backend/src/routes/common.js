var express = require('express');
var router = express.Router();
var project = require('../models/project');
var manager = require('../models/manager');
var tester = require('../models/tester');
var bugreports = require('../models/bugReport');
var admin = require('../models/admin');
var billing = require('../models/billing');
var moment = require("moment")


router.get('/allManagers', function (req, res, next) {
    manager.find().populate("projectID").exec((err, managers) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ managers: managers });
        }
    });
});

router.get('/managerByManagerID/(:id)', function (req, res, next) {
    manager.findById(req.params.id).populate("projectID").exec((err, manager) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ manager: manager });
        }
    });
});

router.get('/bugs/:id', function (req, res, next) {
    console.log("Inside Bugs");
    console.log(req.params.id);
    bugreports.findById(req.params.id).exec((err, bugreport) => {
        if (err) {
            console.log(err);
            next();
        } else {
            console.log("bug reports")
            res.status(200).send({ bugreport: bugreport });
            console.log(res.body);

        }
    });
});

router.get('/managerByProjectID/(:id)', function (req, res, next) {
    manager.find({ projectID: { $in: [req.params.id] } }).populate("projectID").exec((err, manager) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ manager: manager });
        }
    });
});
router.get('/allTesters', function (req, res, next) {
    tester.find().populate("projectID").exec((err, testers) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ testers: testers });
        }
    });
});
router.get('/testerByTesterID/(:id)', function (req, res, next) {
    tester.findById(req.params.id).populate("projectID").exec((err, testers) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ testers: testers });
        }
    });
});
router.get('/testersforProject/(:id)', function (req, res, next) {
    project.findById(req.params.id).populate("testerID").exec((err, project) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ testers: project.testerID });
        }
    });
});
router.get('/allProjects', function (req, res, next) {
    project.find().populate("managerID").exec((err, projects) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ projects: projects });
        }
    });
});
router.get('/projectByProjectID/(:id)', function (req, res, next) {
    project.findById(req.params.id).populate("managerID").exec((err, project) => {
        if (err) {
            next(err);
        } else {
            res.status(200).send({ project: project });
        }
    });
});
router.get('/projectsForManager/(:id)', function (req, res, next) {
    project.find({ managerID: req.params.id }).populate("testerID").exec((err, projects) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ projects: projects });
        }
    });
});
router.get('/projectsForTester/(:id)', function (req, res, next) {
    project.find({ testerID: { $in: [req.params.id] } }).populate("managerID").exec((err, projects) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ projects: projects });
        }
    });
});
router.put('/insertProjectIntoTester', function (req, res, next) {
    tester.findByIdAndUpdate(req.body.id, { '$push': { 'projectID': req.body.projID } }).exec((err, tester) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ tester: tester });
        }
    });
});
router.put('/insertTesterIntoProject', function (req, res, next) {
    project.findByIdAndUpdate(req.body.id, { '$push': { 'testerID': req.body.testerID } }).exec((err, project) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ project: project });
        }
    });
});
router.get('/adminByAdminID/(:id)', function (req, res, next) {
    admin.findById(req.params.id).exec((err, admin) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ admin: admin });
        }
    });
});
router.get('/billing/(:id)', function (req, res, next) {
    billing.find({ projectID: req.params.id }).exec((err, bills) => {
        if (err) {
            next();
        } else {
            var array = {}
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
            const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
            var date = startOfMonth;
            var time = 0;
            var totalCost = 0;
            while(date>= startOfMonth && date<=endOfMonth){
                array[date] = 0;
                date = moment(date).add(1,'days').format("YYYY-MM-DD");
            }
            bills.forEach(bill => {
                var dateDay = moment(bill.date).format('YYYY-MM-DD');
                if(dateDay>= startOfMonth && dateDay<=endOfMonth){
                    var val = array[dateDay]
                    time = time + bill.totalMinutes;
                    totalCost = totalCost + bill.cost;
                    totalCost = Math.round(totalCost * 100) / 100
                    if (val == undefined) {
                        array[dateDay] = bill.cost;
                    } else {
                        val = val + bill.cost
                        array[dateDay] = Math.round(val * 100) / 100
                    }
                }
            });
             res.status(200).send({ days:Object.keys(array) ,costs:Object.values(array),time:time, totalCost:totalCost });
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
    var errors = "Something went wrong s!";
    message.push(errors);
    res.writeHead(201, {
        'Content-Type': 'text/plain'
    });
    res.end(JSON.stringify(message));
})

module.exports = router;
