const passport    = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
var Users = require('../models/users');


module.exports = function(passport) {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'secretkey'
    },
        function (jwtPayload, done) {
            console.log("JWT Payload:", jwtPayload);
            //find the user in db if needed

            if(jwtPayload.username){
                
                Users.findOne({username : jwtPayload.username}, (err, user) => {
                    if (err) {
                        return done(err, false);
                    }
                    if(!user){
                        return done(null, false);
                    } else {
                        console.log("User Authentication")
                        return done(null, user);
                    }
                })
            }
            
        }
    ));
}