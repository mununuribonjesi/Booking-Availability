var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    barberId: {type:String,required:true},
    skillId: {type:String,required:true}
})

module.exports = mongoose.model('BarberSkill',schema);

