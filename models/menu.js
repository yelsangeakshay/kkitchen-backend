const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema
const MenuSchema = new mongoose.Schema({
    dishName:{
        type:String,
        required:true,
        maxlength:32
    },
    cusineType:{
        type:String
    },
    date:{
        type:String
    },

    description:{
        type:String,
        trim:true,
     },
     ingredients:{
        type:String,
        trim:true,
     },
     userId:{
         type:ObjectId,
         ref:'User',
        
     },
     price_pickup:{
         type:Number
     },
     price_delivery:{
        type:Number
    }

})

module.exports = mongoose.model('Menu',MenuSchema);