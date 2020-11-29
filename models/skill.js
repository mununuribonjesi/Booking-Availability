var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
    Name: {type:String,required:true},
})



module.exports = mongoose.model('Skill',schema);

