var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    companyName:{type:String,required:true},
    addressLine1: {type:String,required:true},
    addressLine2: {type:String,required:false},
    town: {type:String,required:true},
    county: {type:String,required:true},
    postCode: {type:String,required:true},
    uri:{type:String},
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
})

schema.index({location:"2dsphere"});
module.exports = mongoose.model('Address',schema);

