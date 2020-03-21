var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Transcripts = new Schema({
    username: {
        type: String,
        required : true
    },
    text: {
        type: String,
        required : true
    },
    topic: {
        type: String,
        required : true
    },
    length: {
        type: Number,
        required : true,
        default : 5
    },
    time : {
        type : Date,
        default : Date.now
    },
    duration : {
        type : Number
    }
})

module.exports = mongoose.model('transcripts', Transcripts);