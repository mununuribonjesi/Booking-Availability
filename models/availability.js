var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    barberId: {type:String,required:true},
    startTime: {type:Date,required:true},
    endTime: {type:Date,required:true},
    date: {type:Date,required:true},
    isAvailable: {type:Boolean,required:true,default:true},
})

module.exports = mongoose.model('StylistAvailability',schema);


