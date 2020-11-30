var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
        Name:{type:String},
        isBarber:{type:Boolean,default:true},
})



module.exports = mongoose.model('Stylist',schema);

