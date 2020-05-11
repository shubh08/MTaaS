var express = require('express');
var router = express.Router();
var project = require('../models/project');
var manager = require('../models/manager');
var tester = require('../models/tester');
var bugreports = require('../models/bugReport');
var admin = require('../models/admin');
var billing = require('../models/billing');
var testruns = require('../models/TestRun');
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
    //bugreports.findById(req.params.id).exec((err, bugreport) => {
    bugreports.find({ testerID: req.params.id}).exec((err, bugreport) => {
    //bugreports.find({ testerID: { $in: [req.params.id] } }).populate("testerID").exec((err, bugreport) => {
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

// router.post('/bugs', function (req, res, next) {
//     console.log("Inside Bugs");
//     console.log(req.params.id);
//
//     var update = { projectName: req.body.projectName, severity: req.body.severity, operatingSystem: req.body.operatingSystem, operatingSystemVersion: req.body.operatingSystemVersion, bugDescription: req.body.bugDescription, date: req.body.date }
//
//     bugreports.findByIdAndUpdate(req.params.id, update).exec((err, bugreport) => {
//         if (err) {
//             console.log(err);
//             next();
//         } else {
//             console.log("bug reports")
//             res.status(200).send({ message: "Succesfully Updated"});
//             //res.status(200).send({ bugreport: bugreport });
//             console.log(res.body);
//         }
//     });
// });

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
            project.findById(req.params.id).populate("testerID").exec((err, proj) => {
                if (err) {
                    next(err);
                } else {
                    var filesCount = proj.commanfiles.length;
                    proj.testerID.forEach((test)=>{
                        filesCount +=  test.s3files.length;

                    })
                    var array = {}
                    const startOfMonth = moment().subtract(30, 'd').format('YYYY-MM-DD');
                    const endOfMonth = moment().format('YYYY-MM-DD');
                    var date = startOfMonth;
                    var time = 0;
                    var totalCost = 0;
                    var totalTimeAWS = 0;
                    var totalTimeEmulator = 0;
                    var totalCostAWS = 0;
                    var totalCostEmulator = 0;
                    while (date >= startOfMonth && date <= endOfMonth) {
                        array[date] = 0;
                        date = moment(date).add(1, 'days').format("YYYY-MM-DD");
                    }
                    bills.forEach(bill => {
                        var dateDay = moment(bill.date).format('YYYY-MM-DD');
                        if (dateDay >= startOfMonth && dateDay <= endOfMonth) {
                            var val = array[dateDay]
                            time = time + bill.totalMinutes;
                            totalCost = totalCost + bill.cost;
                            totalCost = Math.round(totalCost * 100) / 100
                            if (bill.type == "Emulator") {
                                totalTimeEmulator = totalTimeEmulator + bill.totalMinutes;
                                totalTimeEmulator = Math.round(totalTimeEmulator * 100) / 100;
                                totalCostEmulator = totalCostEmulator + bill.cost;
                                totalCostEmulator = Math.round(totalCostEmulator * 100) / 100;
                            } else {
                                totalTimeAWS = totalTimeAWS + bill.totalMinutes;
                                totalTimeAWS = Math.round(totalTimeAWS * 100) / 100;
                                totalCostAWS = totalCostAWS + bill.cost;
                                totalCostAWS = Math.round(totalCostAWS * 100) / 100;
                            }

                            if (val == undefined) {
                                array[dateDay] = bill.cost;
                            } else {
                                val = val + bill.cost
                                array[dateDay] = Math.round(val * 100) / 100
                            }
                        }
                    });
                    res.status(200).send({ days: Object.keys(array), costs: Object.values(array), totalTimeEmulator: totalTimeEmulator, totalCostEmulator: totalCostEmulator, totalTimeAWS: totalTimeAWS, totalCostAWS: totalCostAWS, filesCount: filesCount, filesAmount : filesCount*0.5 });

                }
            });
        }
    });
});
router.get('/scriptsPerTester', function (req, res, next) {
    tester.find().exec((err, testers) => {
        if (err) {
            next();
        } else {
            var array = {}
            testers.forEach((tester) => {
                array[tester.name] = tester.s3files.length;

            })
            var tupleArray = [];
            for (var key in array) {
                tupleArray.push({ key: key, val: array[key] });
            }
            tupleArray.sort(function (a, b) { return b.val - a.val });
            let resultKey = tupleArray.map(a => a.key);
            let resultValue = tupleArray.map(a => a.val);
            res.status(200).send({ testerName: resultKey, testerScriptLength: resultValue });
        }
    });
});
router.get('/scriptsPerProject', function (req, res, next) {
    project.find().exec((err, projects) => {
        if (err) {
            next();
        } else {
            var array = {}
            projects.forEach((project) => {
                array[project.name] = project.commanfiles.length;

            })
            var tupleArray = [];
            for (var key in array) {
                tupleArray.push({ key: key, val: array[key] });
            }
            tupleArray.sort(function (a, b) { return b.val - a.val });
            let resultKey = tupleArray.map(a => a.key);
            let resultValue = tupleArray.map(a => a.val);
            res.status(200).send({ projectName: resultKey, projectScriptLength: resultValue });
        }
    });
});
router.get('/testerPerProject/(:id)', function (req, res, next) {
    project.find({ managerID: req.params.id }).exec((err, projects) => {
        if (err) {
            next();
        } else {
            var array = {}
            projects.forEach((project) => {
                array[project.name] = project.testerID.length;

            })
            var tupleArray = [];
            for (var key in array) {
                tupleArray.push({ key: key, val: array[key] });
            }
            tupleArray.sort(function (a, b) { return b.val - a.val });
            let resultKey = tupleArray.map(a => a.key);
            let resultValue = tupleArray.map(a => a.val);
            res.status(200).send({ projectName: resultKey, projectTesterLength: resultValue });
        }
    });
});
router.get('/bugsPerProject/(:id)', function (req, res, next) {
    bugreports.find().populate('projectID').exec((err, bugreport) => {
        if (err) {
            next();
        } else {
            var array = {}
            project.find({ managerID: req.params.id }).populate("testerID").exec((err, project1) => {
                project1.forEach((proj) => {
                    array[proj.name] = 0;
                })
                bugreport.forEach((bug) => {
                    if (bug.projectID.managerID == req.params.id) {
                        array[bug.projectID.name] = array[bug.projectID.name] + 1;
                    }
                })
                var tupleArray = [];
                for (var key in array) {
                    tupleArray.push({ key: key, val: array[key] });
                }
                tupleArray.sort(function (a, b) { return b.val - a.val });
                let resultKey = tupleArray.map(a => a.key);
                let resultValue = tupleArray.map(a => a.val);
                res.status(200).send({ projectName: resultKey, projectBugLength: resultValue });
            });
        }
    });
});
router.get('/scriptsPerProject/(:id)', function (req, res, next) {
    project.find({ managerID: req.params.id }).exec((err, projects) => {
        if (err) {
            next();
        } else {
            var array = {}
            projects.forEach((project) => {
                array[project.name] = project.commanfiles.length;

            })
            var tupleArray = [];
            for (var key in array) {
                tupleArray.push({ key: key, val: array[key] });
            }
            tupleArray.sort(function (a, b) { return b.val - a.val });
            let resultKey = tupleArray.map(a => a.key);
            let resultValue = tupleArray.map(a => a.val);
            res.status(200).send({ projectName: resultKey, projectScriptLength: resultValue });
        }
    });
});
router.get('/testrunPerProject/(:id)', function (req, res, next) {
    testruns.find().exec((err, testRun) => {
        if (err) {
            next();
        } else {
            var bigArray = [];
            var array = {}
            project.find({ managerID: req.params.id }).populate("testerID").exec((err, project1) => {
                project1.forEach((proj) => {
                    array[proj.name] = 0;
                })
                testRun.forEach((test) => {
                    if (array[test.projectName] >= 0) {
                        array[test.projectName] = array[test.projectName] + 1;
                    }
                })
                var tupleArray = [];
                for (var key in array) {
                    tupleArray.push({ key: key, val: array[key] });
                }
                tupleArray.sort(function (a, b) { return b.val - a.val });
                let resultKey = tupleArray.map(a => a.key);
                let resultValue = tupleArray.map(a => a.val);
                res.status(200).send({ projectName: resultKey, testRunLength: resultValue });
            });
        }
    });
});
router.get('/testerPerProject', function (req, res, next) {
    project.find().exec((err, projects) => {
        if (err) {
            next();
        } else {
            var array = {}
            projects.forEach((project) => {
                array[project.name] = project.testerID.length;

            })
            var tupleArray = [];
            for (var key in array) {
                tupleArray.push({ key: key, val: array[key] });
            }
            tupleArray.sort(function (a, b) { return b.val - a.val });
            let resultKey = tupleArray.map(a => a.key);
            let resultValue = tupleArray.map(a => a.val);
            res.status(200).send({ projectName: resultKey, projectTesterLength: resultValue });
        }
    });
});
router.get('/projectPerManager', function (req, res, next) {
    manager.find().exec((err, manager1) => {
        if (err) {
            next();
        } else {
            var array = {}
            manager1.forEach((manage) => {
                array[manage.name] = manage.projectID.length;

            })
            var tupleArray = [];
            for (var key in array) {
                tupleArray.push({ key: key, val: array[key] });
            }
            tupleArray.sort(function (a, b) { return b.val - a.val });
            let resultKey = tupleArray.map(a => a.key);
            let resultValue = tupleArray.map(a => a.val);
            res.status(200).send({ projectName: resultKey, projectLength: resultValue });
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
