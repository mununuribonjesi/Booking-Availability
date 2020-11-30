var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
    Name: {type:String,required:true},
    Price:{type:Number}
})


module.exports = mongoose.model('Skill',schema);

