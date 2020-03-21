var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Users = new Schema({
    name: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    contact: {
        type: String
    },
    imglink: {
        type: String
    },
    address: {
        type: String
    },
    country:{
        type:String
    },
    time : {
        type : Date,
        default : Date.now
	}
})

module.exports = mongoose.model('users', Users);