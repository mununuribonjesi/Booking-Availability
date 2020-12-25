var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    barberId: {type:String,required:true},
    startTime: {type:Date,required:true},
    endTime: {type:Date,required:true},
    date: {type:Date,required:true},
})

module.exports = mongoose.model('WorkHours',schema);


