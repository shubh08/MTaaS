var express = require('express');
var router = express.Router();
var admin = require('../models/admin');
var manager = require('../models/manager');
var tester = require('../models/tester');

const bcrypt = require('bcrypt');
const saltRounds = 10;


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
    var update = { name: req.body.name, DOB: req.body.DOB, email: req.body.email }
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