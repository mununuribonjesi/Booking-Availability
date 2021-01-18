var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = mongoose.Schema({
        name:{type:String},
        isBarber:{type:Boolean,default:true},
        organisationId:{type:String}

})



module.exports = mongoose.model('Stylist',schema);

