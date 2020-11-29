var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
   
    availability:[{
        barberId:String,
        startTime:Date,
        endTime:Date,
        Date:Date,
        isAvailable:Boolean
    }]
})



module.exports = mongoose.model('Stylist',schema);

