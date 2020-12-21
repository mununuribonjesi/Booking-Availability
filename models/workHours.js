var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    barberId: {type:String,required:true},
    startTime: {type:String,required:true},
    endTime: {type:String,required:true},
    date: {type:String,required:true},
})

module.exports = mongoose.model('WorkHours',schema);


