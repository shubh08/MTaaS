var express = require('express');
var router = express.Router();
var manager = require('../models/manager');
var project = require('../models/project');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
                    res.status(200).send({ message: "Logged In succesfully", id:manager._id});
                } else {
                    var error = { message: "Invalid Password"}
                    next(error);
                }
            });
        }
    })
});

router.put('/update', function (req, res, next) {
    var update = { name: req.body.name, about: req.body.about, DOB: req.body.DOB, company: req.body.company, email: req.body.email }
    manager.findByIdAndUpdate(req.body.id , update).exec((err, manager) => {
        if (err) {
            next();
        } else {
            res.status(200).send({ message: "Succesfully Updated"});
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