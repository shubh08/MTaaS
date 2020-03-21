var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/users');
var Transcripts = require('../models/transcripts');
var Summary = require('../models/summary');
var mongoose = require('mongoose');
const axios = require('axios');
var pythonURL = require('../config');

router.route('/createsummary').post(function(req, res){
    console.log("Inside Load Transcript");

    var data = {
        username: req.body.username,
        text: req.body.text,
        topic: req.body.topic,
        duration: req.body.duration
    }
    try{
        if(req.body.length >= 5){
        data.length = req.body.length;
        } else {
            data.length = 5;
        }

        Transcripts.create(data, (err, result) => {
            if (err) {
                console.log("unable to insert into database", err);
                res.status(401).send({responseMessage: err});
            } else {
                console.log("Transcript added");
                console.log(result);
                console.log("Transcript ID is: " + result._id);
                
                var data1 = {
                    id: result._id,
                }

                /* Comment below function when using Python API to fetch data */
                var summaryId = "5ddf1776837e6c3add7d2cc5";
                // Summary.findById(summaryId, (err, result1) => {
                //     if (err) {
                //         console.log("unable to insert into database", err);
                //         res.status(401).send({responseMessage: err});
                //     } else {
                //         if(result1){
                //             console.log(result1);
                //             res.status(200).send({responseMessage: result1})
                //         } else {
                //             res.status(404).send({responseMessage: "Summary Not Found"});
                //         }
                //     }
                // })

                /* Uncomment below part when Python API to fetch the summary is ready */

                axios.post(pythonURL, data1)
                .then(response => {
                    if(response.status === 200){
                        console.log("API call successful");
                        console.log(response.data);
                        var summaryId = response.data._id;
                        Summary.findById({"_id":mongoose.Types.ObjectId(summaryId) }, (err, result1) => {
                            if (err) {
                                console.log("unable to insert into database", err);
                                res.status(401).send({responseMessage: err});
                            } else {
                                if(result1){
                                    console.log(result1);
                                    res.status(200).send({responseMessage: result1})
                                } else {
                                    res.status(404).send({responseMessage: "Summary Not Found"});
                                }
                            }
                        })
                    } else {
                        console.log("API call unsuccessful");
                        res.status(401).send({responseMessage: err});
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(401).send({responseMessage: err});
                })               
            }
        })
    } catch(err) {
        console.log("Error Occurred. Please try again");
        res.status(501).send({"responseMessage" : "Internal Server Error"});
    }
    
})

router.route('/pastsummary').post(function(req, res){
    console.log("Inside Past Summaries API");

    var data = {
        username: req.body.username
    }

    // var data1 = {
    //     username: req.body.username,
    //     text: "This is first summary of the application",
    //     transcriptid: mongoose.Types.ObjectId("5dd93a4619677531941d6a65")
    // }

    // Summary.create(data1, (err, result) => {
    //     if (err) {
    //         console.log("unable to insert into database", err);
    //         res.status(401).send({responseMessage: err});
    //     } else {
    //         console.log("Summaries added");
    //         console.log(result);
    //         //res.status(200).send({responseMessage: result});
    //     }
    // })

    Summary.find({username : data.username}, (err, result) => {
        if (err) {
            console.log("unable to insert into database", err);
            res.status(401).send({responseMessage: err});
        } else {
            console.log("Summaries fetched");
            console.log(result);
            res.status(200).send({responseMessage: result});
        }
    })

})

module.exports = router;