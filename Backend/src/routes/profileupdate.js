var express = require('express');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');
var passport = require('passport');
var Users = require('../models/users');


var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + ".png")
    }
});
var upload = multer({storage: storage});


router.route('/updateprofile').post(upload.single('imglink'), function(req, res){
    console.log("User Profile");
    var signupData = {
        "name": req.body.name,
        "username": req.body.username,
        "contact": req.body.contact,
        "address": req.body.address,
        "country":req.body.country
    }

    if(req.file){
        signupData.imglink = req.file.filename;
        console.log("Image received", signupData.imglink)
    }

    Users.findOneAndUpdate({username:signupData.username}, signupData, (err,user) =>{
        if (err) {
            console.log(err);
            //console.log("Unable to update Database");
            res.status(400).json({responseMessage: 'Error Occurred'});
        } else {
            console.log("Result:", user)
            console.log("Profile update Successful");
            res.status(200).json({responseMessage: user});
        } 
    })
})


router.route('/getprofile').post(function(req, res){
	var username = req.body.username;
    var msg = {
        username : username
	}
	console.log(req.body);
	Users.findOne({username: msg.username}, function(err,user){
        if (err) {
            console.log(err);
            console.log("User not found");
            res.status(400).json({responseMessage: 'Error Occurred'});
        } else {
            console.log("user:", user)
            console.log("User Profile Fetched Successful");
            res.status(200).json({responseMessage: user});
        } 
    })
})

module.exports = router;