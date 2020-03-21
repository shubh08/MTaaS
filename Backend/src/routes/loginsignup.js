var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var encrypt = require('../helpers/passwordEncryption');
var jwt = require('jsonwebtoken');
var Users = require('../models/users');

router.route('/signup').post(function(req, res){
    var encryptPass = req.body.password;
    console.log("SignUp User",req.body);
    var signupData = {
        "name": req.body.name,
        "username": req.body.username,
        "password": "",
        "country":req.body.country
    }
    var msg = {
        signupData : signupData,
        encryptPass : encryptPass
    }

    Users.findOne({username : msg.signupData.username}, (err, rows) => {
        if (err){
            console.log(err);
            console.log("unable to read the database");
            res.status(401).send({responseMessage: err});
            
        } else {
            if(rows){
                console.log("User already exists");
                res.status(401).send({responseMessage: "User already exists"});
                
            } else {
                encrypt.createHash(msg.encryptPass, function (response){
                    msg.signupData.password = response;
                    console.log("Encrypted Password is: " + msg.signupData.password);
                    
                    Users.create(msg.signupData, function (err,user) {
                        if (err) {
                            console.log("unable to insert into database", err);
                            res.status(401).send({responseMessage: err});
                            
                        } else {
                            console.log("User added");
                            res.status(200).send({responseMessage: user})
                            
                        }
                    });
                }, function (err) {
                    console.log(err);
                    res.status(401).send({responseMessage: err});
                });
            }
            
        }
    })
})

router.route('/login').post((req, res) => {
    console.log("Inside login");
    var username = req.body.username;
    var password = req.body.password;

    var msg = {
        username : username,
        password : password
    }

    Users.findOne({username : msg.username}, (err, user) => {
        if (err){
            console.log(err);
            console.log("unable to read the database");
            res.status(401).send({responseMessage: err});
        } else {
            if(user) {
                console.log(user);
                encrypt.compareHash(msg.password, user.password, function(err, isMatch){
                    if (isMatch && !err) {
                        console.log("User Login Successful");
                        res.status(200).send({responseMessage: user})
                    } else {
                        console.log("Authentication failed. Passwords did not match");
                        res.status(400).send({responseMessage: "Authentication failed. Passwords did not match"})
                    }
                }, function (err) {
                    console.log(err);
                    res.status(401).send({responseMessage: err});
                });
            } else {
                console.log("User does not exist");
                res.status(401).send({responseMessage: 'User does not exist'});
            }

        }
    })
});

module.exports = router;