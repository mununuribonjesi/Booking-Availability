const { duration } = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
    Name: {type:String,required:true},
    Price:{type:Number},
    Duration:{type:String}
})


module.exports = mongoose.model('Skill',schema);

