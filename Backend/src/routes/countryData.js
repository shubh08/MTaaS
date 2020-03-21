var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var Users = require('../models/users');
var Transcripts = require('../models/transcripts');

router.route('/getWelcomeData').get(function(req, res){
    console.log("Get Country Data",req.body);
    let responseObj = {}
    // var signupData = {
    //     "name": req.body.name,
    //     "username": req.body.username,
    //     "password": "",
    //     "country":req.body.country
    // }
    // var msg = {
    //     signupData : signupData,
    //     encryptPass : encryptPass
    // }

    Users.aggregate([
		{"$group" : {_id:"$country", count:{$sum:1}}}
	], (err, rows) => {
        if (err){
            console.log(err);
            console.log("unable to read the database");
            res.status(401).send({welocomeData: err});
            
        } else {
            responseObj.responseMessage = rows;
            console.log("Country Data retrieved from DB");
                Users.count({}, (err, rows) => {

                    if(err)
                    {
                        console.log(err);
            console.log("unable to read the database");
            res.status(401).send({welocomeData: err});
                    }

                    else{
                        console.log('USers count------->',rows)
                        responseObj.usersCount = rows;

                        Transcripts.count({},(err,tcount)=>{
                            if(err)
                            {
                                console.log(err);
            console.log("unable to read the database");
            res.status(401).send({welocomeData: err});
                            }

                            else{

                                responseObj.tcount = tcount;

                                Transcripts.aggregate([
                                    {"$group" : {_id:"$duration", count:{$sum:1}}}
                                ],(err,resp)=>{
                                    if(err)
                            {
                                console.log(err);
            console.log("unable to read the database");
            res.status(401).send({welocomeData: err});
                            }
                            else{
                                responseObj.duration = resp;
                                res.status(200).send({welocomeData: responseObj});
                            } 
                                })


                               
                            }
                        })

                        
                    }

                })

                

            
        }
    })
})



module.exports = router;