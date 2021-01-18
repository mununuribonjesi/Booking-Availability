const { duration } = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
    name: {type:String,required:true},
    price:{type:Number},
    duration:{type:String},
    organisationId:{type:String,required:true}
})


module.exports = mongoose.model('Skill',schema);

