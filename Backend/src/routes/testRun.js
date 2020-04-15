var express = require('express');
var router = express.Router();
var testerRun = require('../models/TestRun');
var billing = require('../models/billing');
var moment = require('moment');
moment().format();
const multer = require('multer')
const awsConfig = require('../helpers/AWSConfig')
const AWS = require('aws-sdk');
var fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var Request = require('request');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

var devicefarm = new AWS.DeviceFarm({
    apiVersion: '2015-06-23',
    accessKeyId: awsConfig.AWS_DEVICE_FARM_KEY,
    secretAccessKey: awsConfig.AWS_DEVICE_FARM_SECRET,
    region: 'us-west-2'
});

async function getUploadStatus(UPLOAD_ARN) {
    return await devicefarm.getUpload({ arn: UPLOAD_ARN }).promise().then(
        function (data) {
            return data.upload.status;
        }, function (error) {
            console.error("getting upload failed with error: ", error);
        }
    );
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        console.log('here in')
        cb(null, file.originalname);

    }
})

const upload = multer({ storage: storage })

router.post('/dummyRun', function (req, res, next) {
    console.log('herere')
    console.log(req.file)
    console.log(req.file.path)
    res.send('fineshed')
})

router.post('/createRun', upload.single('file'), function (req, res, next) {
    createRun(req, res)
})

createRun = async (req, res) => {
    console.log('Inside createRun');
    console.log(req.body)
    console.log(req.file.path)

    const userName = req.body.userName
    const projectName = req.body.projectName
    const runname = req.body.runName
    const appFileName = 'TapTapSee.apk'
    const appFileType = req.body.appFileType
    const devicePoolName = req.body.devicePoolName
    const devicePoolARNs = req.body.devicePoolARNs
    let DEVICE_POOL_ARN = 'arn:aws:devicefarm:us-west-2::devicepool:082d10e5-d7d7-48a5-ba5c-b33d66efa1f5'
    const testType = req.body.testType
    const testPackageFileName = 'zip-with-dependencies.zip'
    const testPackageFileType = req.body.testPackageFileType

    const testPackageFile = 'testScriptFolder/zip-with-dependencies.zip'
    console.log('Request body is', req.body)
    //res.status(200).send({message:'ok'})

    let project_params = {
        name: userName + '_' + projectName + '_' + runname
    }
    let PROJECT_ARN = await devicefarm.createProject(project_params).promise().then(
        function (data) {
            return data.project.arn;
        },
        function (error) {
            console.log("Error creating project", "Error: ", error);
            res.status(400).json("Error creating project", "Error: ", error)
        }
    );
    console.log("Project created with name: " + projectName + '_' + runname + " Project arn: ", PROJECT_ARN);

    // create the upload and upload files to the project
    let app_upload_params = {
        name: appFileName,
        type: appFileType,
        projectArn: PROJECT_ARN
    };
    let APP_UPLOAD = await devicefarm.createUpload(app_upload_params).promise().then(
        function (data) {
            return data.upload;
        },
        function (error) {
            console.log("Creating upload failed with error: ", error);
            res.status(400).json("Creating upload failed with error: ", error)
        }
    );

    let APP_UPLOAD_ARN = APP_UPLOAD.arn;
    let APP_UPLOAD_URL = APP_UPLOAD.url;
    console.log("app upload created with arn: ", APP_UPLOAD_ARN);
    console.log("uploading app file...");

    let options = {
        method: 'PUT',
        url: APP_UPLOAD_URL,
        headers: {},
        body: fs.readFileSync(req.file.path)
    };

    // wait for upload to finish
    await new Promise(function (resolve, reject) {
        Request(options, function (error, response, body) {
            if (error) {
                console.log("uploading app file failed with error: ", error);
                res.status(400).json('uploading app file failed with error: ' + error)
                reject(error);
            }
            resolve(body);
        });
    });

    //get the status of the app upload and make sure if finished processing before scheduling
    let APP_UPLOAD_STATUS = await getUploadStatus(APP_UPLOAD_ARN);
    console.log("app upload status is: ", APP_UPLOAD_STATUS);
    while (APP_UPLOAD_STATUS !== "SUCCEEDED") {
        await sleep(5000);
        APP_UPLOAD_STATUS = await getUploadStatus(APP_UPLOAD_ARN);
        console.log("app upload status is: ", APP_UPLOAD_STATUS);
    }

    //to delete application file stored in ./applicationFile directory
    await unlinkAsync(req.file.path)

    // let devicePoolRules=[
    //     {
    //         "attribute": "ARN", 
    //         "operator": "IN",
    //         "value":devicePoolARNs
    //     }
    // ]

    // //create device pool
    // let device_pool_params = {
    //     projectArn: PROJECT_ARN,
    //     name: devicePoolName,
    //     rules: devicePoolRules
    // }

    // let DEVICE_POOL_ARN = await devicefarm.createDevicePool(device_pool_params).promise().then(
    //     function(data){
    //         return data.devicePool.arn; 
    //     },function(error){
    //         console.log("device pool failed to create with error: ",error);
    //         res.status(400).json("device pool failed to create with error: ",error)
    //     }
    // ); 
    console.log("Device pool created successfully with arn: ", DEVICE_POOL_ARN);
    let TEST_PACKAGE_UPLOAD_ARN = ''
    if (testType !== 'BUILTIN_FUZZ' && testType !== 'BUILTIN_EXPLORER') {
        // create the upload and upload files to the project
        let testPackage_upload_params = {
            name: testPackageFileName,
            type: testPackageFileType,
            projectArn: PROJECT_ARN
        };
        let TEST_PACKAGE_UPLOAD = await devicefarm.createUpload(testPackage_upload_params).promise().then(
            function (data) {
                return data.upload;
            },
            function (error) {
                console.error("Creating upload failed with error: ", error);
                res.status(400).json("Creating upload failed with error: ", error)
            }
        );

        TEST_PACKAGE_UPLOAD_ARN = TEST_PACKAGE_UPLOAD.arn;
        let TEST_PACKAGE_UPLOAD_URL = TEST_PACKAGE_UPLOAD.url;
        console.log("test package upload created with arn: ", TEST_PACKAGE_UPLOAD_ARN);
        console.log("uploading test package file...");

        let options = {
            method: 'PUT',
            url: TEST_PACKAGE_UPLOAD_URL,
            headers: {},
            body: fs.readFileSync(testPackageFile)
        };

        // wait for upload to finish
        await new Promise(function (resolve, reject) {
            Request(options, function (error, response, body) {
                if (error) {
                    console.error("uploading test package zip failed with error: ", error);
                    res.status(400).json("uploading test package zip failed with error: ", error)
                    reject(error);
                }
                resolve(body);
            });
        });

        //get the status of the app upload and make sure if finished processing before scheduling
        let TEST_PACKAGE_UPLOAD_STATUS = await getUploadStatus(TEST_PACKAGE_UPLOAD_ARN);
        console.log("test package upload status is: ", TEST_PACKAGE_UPLOAD_STATUS);
        while (TEST_PACKAGE_UPLOAD_STATUS !== "SUCCEEDED") {
            await sleep(5000);
            TEST_PACKAGE_UPLOAD_STATUS = await getUploadStatus(TEST_PACKAGE_UPLOAD_ARN);
            console.log("test package upload status is: ", TEST_PACKAGE_UPLOAD_STATUS);
        }
    }

    //schedule the run
    let schedule_run_params = {
        name: runname,
        devicePoolArn: DEVICE_POOL_ARN, // You can get the Amazon Resource Name (ARN) of the device pool by using the list-pools CLI command.
        projectArn: PROJECT_ARN, // You can get the Amazon Resource Name (ARN) of the project by using the list-projects CLI command.
        test: {
            type: testType
        },
        appArn: APP_UPLOAD_ARN
    };

    if (testType !== 'BUILTIN_FUZZ' && testType !== 'BUILTIN_EXPLORER') {
        schedule_run_params.test.testPackageArn = TEST_PACKAGE_UPLOAD_ARN
    }

    let schedule_run_result = await devicefarm.scheduleRun(schedule_run_params).promise().then(
        function (data) {
            return data.run;
        }, function (error) {
            console.error("Schedule run command failed with error: ", error);
            res.status(400).json("Schedule run command failed with error: ", error)
        }
    );
    console.log("run created successfully with run object: ", schedule_run_result);

    let arn = schedule_run_result.arn
    let name = runname
    let type = schedule_run_result.type
    let platform = schedule_run_result.platform
    let status = schedule_run_result.status
    let result = schedule_run_result.result
    let counters = schedule_run_result.counters
    let totalJobs = schedule_run_result.totalJobs
    let deviceMinutes = schedule_run_result.deviceMinutes
    const jobs = await getSubSchemas(schedule_run_result.arn)
    const testerRunObj = new testerRun({ userName, projectName, arn, name, type, platform, status, result, counters, totalJobs, deviceMinutes, jobs })

    testerRunObj.save()
        .then(() => {
            console.log("Inside then of testerRun save")
            res.status(200).send({ message: 'Inside then of newRun save', awsTestScheduled: testerRunObj });
        })
        .catch((err) => {
            console.log("Inside catch of testerRun save")
            res.status(400).json({ message: "Error in save of testerRun inside createRun: " + err });
        })


}

async function getSubSchemas(runARN) {
    console.log('Inisde getSubSchemas')
    let job_arr = []
    await listJobDevicesWithinARun(runARN, '', job_arr)
    for (var i = 0; i < job_arr.length; i++) {
        let suite_arr = []
        await listSuitesWithinAJob(job_arr[i].arn, '', suite_arr)
        for (var j = 0; j < suite_arr.length; j++) {
            let test_arr = []
            await listTestsWithinASuite(suite_arr[j].arn, '', test_arr)
            for (var k = 0; k < test_arr.length; k++) {
                let artifact_arr = []
                await listTestArtifacts(test_arr[k].arn, 'FILE', '', artifact_arr)
                await listTestArtifacts(test_arr[k].arn, 'LOG', '', artifact_arr)
                await listTestArtifacts(test_arr[k].arn, 'SCREENSHOT', '', artifact_arr)
                test_arr[k].artifacts = artifact_arr
            }
            suite_arr[j].tests = test_arr
        }
        job_arr[i].deviceName = job_arr[i].device.name
        job_arr[i].deviceOS = job_arr[i].device.os
        delete job_arr[i].device
        job_arr[i].suites = suite_arr
    }
    return job_arr
}

async function listJobDevicesWithinARun(PROJECT_ARN, nextToken, jobsArray) {
    console.log('inside listJobDevicesWithinARun')
    var params = {
        arn: PROJECT_ARN
    }
    if (nextToken !== '') {
        params.nextToken = nextToken
    }
    await devicefarm.listJobs(params).promise().then(
        async function (data) {
            console.log(data);
            if (data.jobs.length > 0)
                jobsArray.push(...(data.jobs))
            if ('nextToken' in data)
                await listJobDevicesWithinARun(PROJECT_ARN, data.nextToken, jobsArray)
        }, function (error) {
            console.log(error, error.stack)
        });
}

async function listSuitesWithinAJob(JOB_ARN, nextToken, suitesArray) {
    var params = {
        arn: JOB_ARN
    }
    if (nextToken !== '') {
        params.nextToken = nextToken
    }
    await devicefarm.listSuites(params).promise().then(
        async function (data) {
            console.log(data)
            if (data.suites.length > 0)
                suitesArray.push(...(data.suites))
            if ('nextToken' in data)
                await listSuitesWithinAJob(JOB_ARN, data.nextToken, suitesArray)
        },
        function (error) {
            console.log(error, error.stack)
        }
    )
}

async function listTestsWithinASuite(SUITE_ARN, nextToken, testsArray) {
    var params = {
        arn: SUITE_ARN
    }
    if (nextToken !== '') {
        params.nextToken = nextToken
    }
    await devicefarm.listTests(params).promise().then(
        async function (data) {
            console.log(data)
            if (data.tests.length > 0)
                testsArray.push(...(data.tests))
            if ('nextToken' in data) {
                await listTestsWithinASuite(SUITE_ARN, data.nextToken, testsArray)
            }
        },
        function (error) {
            console.log(error, error.stack)
        }
    )
}

async function listTestArtifacts(TEST_ARN, type, nextToken, artifactsArray) {
    var params = {
        arn: TEST_ARN,
        type: type
    }
    if (nextToken !== '') {
        params.nextToken = nextToken
    }
    await devicefarm.listArtifacts(params).promise().then(
        async function (data) {
            console.log(data)
            if (data.artifacts.length > 0)
                artifactsArray.push(...(data.artifacts))
            if ('nextToken' in data) {
                await listTestArtifacts(TEST_ARN, type, data.nextToken.artifactsArray)
            }
        }, function (error) {
        console.log(error, error.stack)
    }
    )
}

router.post('/stopRun', function (req, res, next) {
    console.log('Inside StopRun')
    stopRun(req, res)
});


stopRun = (req, res) => {
    console.log('Inside stopRun')
    devicefarm.stopRun({ arn: req.body.RUN_ARN }, function (err, data) {
        if (err) {
            console.log(err, err.stack)
            res.status(400).json('Error in stopping the run with arn: ' + req.body.RUN_ARN + ' with err: ' + err)
        }
        else {
            console.log('Stopping the run with arn: ' + req.body.RUN_ARN)
            res.json(data);
        }
    })
}

router.post('/getRunStatus', function (req, res, next) {
    console.log('Inside herere')
    getRunStatus(req, res, next)
});  //loadRunData'

router.post('/loadRunData', function (req, res, next) {
    console.log('here in the loadRunData')
    testerRun.find({ "projectName": req.body.projectName }).exec((err, data) => {
        if (err)
            next(err)
        //console.log("Run data is ",data)
        res.status(200).send({ data: data })

    })
    // getRunStatus(req,res,next)
});

getRunStatus = async (req, res, next) => {
    console.log('Inside getRunStatus')
    devicefarm.getRun({ arn: req.body.RUN_ARN }, function (err, data) {
        if (err) {
            console.log(err, err.stack)
            res.status(400).json('Error in getRunStatus for run_arn: ' + req.body.RUN_ARN + ' err: ' + err)
        }
        else {
            triggerJob(req.body.RUN_ARN, data, res, req.body.projectID, next)

        }
    })
}


triggerJob = async (arn, data, res, projectID, next) => {
    console.log('Job Triggered!')
    let jobs = await getSubSchemas(arn)
    console.log('Job Triggered End!')
    //console.log('Jobs returned',jobs[0])
    data.jobs = jobs
    // console.log('deviceeeeeeeeeeeeeeeeeeeeeeee minssssssssssss',data.run)
    let deviceMinutes1 = data.run.deviceMinutes.total
    console.log('Run device minutesssssssss are hereeeeeeeeeeeeeeeee', deviceMinutes1)
    let runParentObj = data.run

    arn = runParentObj.arn
    let name = runParentObj.name
    let type = runParentObj.type
    let platform = runParentObj.platform
    let status = runParentObj.status
    let result = runParentObj.result
    let counters = runParentObj.counters
    let totalJobs = runParentObj.totalJobs
    let deviceMinutes = runParentObj.deviceMinutes
    // const jobs = await getSubSchemas(schedule_run_result.arn)
    //const testerRunObj = new testerRun({ userName, projectName, arn, name, type, platform, status, result, counters, totalJobs, deviceMinutes, jobs })
    console.log('Run Parent obj', runParentObj)
    testerRun.findOneAndDelete({ "arn": arn }).exec((err, data) => {
        if (err)
            next(err)
        console.log('Deleted document is',data)
        let userName=''
        let projectName=''
        if(data!=null)
        { userName = data.userName
         projectName = data.projectName}
        const testerRunObj = new testerRun({ userName, projectName, arn, name, type, platform, status, result, counters, totalJobs, deviceMinutes, jobs })
        testerRunObj.save()
            .then(() => {
                console.log("Inside then of testerRun save")
                let cost = (0.01 * deviceMinutes1)
                let totalMinutes = deviceMinutes1
                const billingObj = new billing({ projectID, totalMinutes, cost })
                billingObj.save((err, billing) => {
                    console.log('Inside Billing!')
                    if (err) {
                        next(err);
                    } else {
                        res.status(200).send({ message: 'Billing Success!', testerRunObj });
                    }
                })
            })
            .catch((err) => {
                console.log(err)
                console.log("Inside catch of testerRun save")
                res.status(400).json({ message: "Error in save of testerRun inside createRun: " + err });
            })

    })
    // testerRun.findOneAndUpdate({"arn":arn},{runParentObj},{upsert:true}).exec((err, test) => {
    //     if (err) {
    //         console.log(err)
    //         next();
    //     } else {
    //         console.log('Data here isssssssssssssssssssssssssss',data)
    //         let cost = (0.01*deviceMinutes)
    //         let totalMinutes = deviceMinutes
    //         const billingObj = new billing({projectID,totalMinutes,cost})
    //         billingObj.save((err, billing) => {
    //             if (err) {
    //                 next(err);
    //             } else {
    //                 res.status(200).send({message:'Billing Success!',billingObj});
    //             }
    //         })  
    //     }
    //     })

}

getSingleRun = (req, res) => {
    console.log('Inside getSingleRun')
    Run.findById(req.body.id)
        .then((run) => {
            console.log(run)
            res.json(run)
        }).catch((err) => {
            res.status(400).json('Error in getSingleBug: ' + err);
        })
}

getDeviceOfARun = (req, res) => {
    console.log('Inside getDeviceOfARun')
    Run.find({ _id: req.body.rid }, { jobs: { $elemMatch: { _id: req.body.jid } } })
        .then((runs) => {
            console.log(runs[0])
            res.json(runs[0])
        }).catch((err) => {
            res.status(400).json('Error in getDeviceOfARun: ' + err);
        })
}

getTestsOfDeviceOfRun = (req, res) => {
    console.log('Inside getTestsOfDeviceOfRun')
    Run.find({ _id: req.body.rid }, { jobs: { $elemMatch: { _id: req.body.jid } } })
        .then((runs) => {
            runs[0].jobs[0].suites = runs[0].jobs[0].suites.filter((eachSuite) => {
                return eachSuite._id == req.body.sid
            })
            res.json(runs[0])
        }).catch((err) => {
            res.status(400).json('Error in getTestsOfDeviceOfRun: ' + err);
        })
}

getArtifactsOfTestOfSuiteOfDeviceOfRun = (req, res) => {
    console.log('Inside getArtifactsOfTestOfSuiteOfDeviceOfRun')
    Run.find({ _id: req.body.rid }, { jobs: { $elemMatch: { _id: req.body.jid } } })
        .then((runs) => {
            runs[0].jobs[0].suites = runs[0].jobs[0].suites.filter((eachSuite) => {
                return eachSuite._id == req.body.sid
            })
            runs[0].jobs[0].suites[0].tests = runs[0].jobs[0].suites[0].tests.filter((eachTest) => {
                return eachTest._id == req.body.tid
            })
            console.log(runs[0])
            res.json(runs[0])
        }).catch((err) => {
            res.status(400).json('Error in getArtifactsOfTestOfSuiteOfDeviceOfRun: ' + err);
        })
}
module.exports = router;

