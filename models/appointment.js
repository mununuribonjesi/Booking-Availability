var mongoose = require('mongoose');
const { Barber } = require('../methods/add');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    barberId: {type:String,required:true},
    avalabilityId: {type:String,required:true},
    skillId: {type:String,required:true},
    customerId: {type:String,required:true},
})

module.exports = mongoose.model('CustomerAppointment',schema);