const port = process.env.PORT || 3010;
const rooturl = "http://3.17.152.109:3006";
//const rooturl = "";
const path = require('path');
const fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const db = require('./src/helpers/settings').mongoURI;
var jwt = require('jsonwebtoken');
const AWS=require('aws-sdk');
const multerS3 = require('multer-s3')
const multer = require('multer')
 

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(session({
    secret              : 'cmpe_281',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', rooturl);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Routes

var adminRoute = require('./src/routes/admin.js');
var managerRoute = require('./src/routes/manager.js');
var testerRoute = require('./src/routes/tester.js');
var commonRoute = require('./src/routes/common.js');

app.use(express.static('./uploads'));
app.use(cors({ origin: rooturl, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/admin", adminRoute);
app.use("/manager", managerRoute);
app.use("/tester", testerRoute);
app.use("/", commonRoute);

app.use('/uploads', express.static(path.join(__dirname, '/uploads/'))); 

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: 'AKIA6N3UPZHSOLL3YCM5',
  secretAccessKey: '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'
});

const commonFileUpload = multer({
storage: multerS3({
  s3: s3,
  bucket: 'mtaasbucket',//'mtaas-course-project-nachiket',
  key: function (req, file, cb) {
      cb(null, req.body.name+'/'+'Common/'+file.originalname)
  }
})
})

app.post("/addProject",commonFileUpload.single('file'), function(req, res) {
  console.log('File Upload success',req.body)
});

app.listen(port);
console.log("Server Listening on port " + port);