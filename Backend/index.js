const port = process.env.PORT || 3010;
const rooturl = "http://3.17.152.109:3006";
//const rooturl = "";
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var encrypt = require('./src/helpers/passwordEncryption.js');
const mongoose = require('mongoose');
const db = require('./src/helpers/settings').mongoURI;
var passport = require('passport');
var jwt = require('jsonwebtoken');
 

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

require('./src/helpers/passport')(passport);


app.use(session({
    secret              : 'cmpe272_smartmom_mysql',
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

var loginsignup = require('./src/routes/loginsignup');
var profileupdate = require('./src/routes/profileupdate');
var transcripts = require('./src/routes/transcript');
var getCountryData = require('./src/routes/countryData');

app.use(express.static('./uploads'));
var basePath = '/';
app.use(cors({ origin: rooturl, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use('/user', passport.authenticate('jwt', {session: false}), user);

app.use(basePath, loginsignup);
app.use(basePath, profileupdate);
app.use(basePath, transcripts);
app.use(basePath,getCountryData);
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));


app.listen(port);
console.log("Server Listening on port " + port);