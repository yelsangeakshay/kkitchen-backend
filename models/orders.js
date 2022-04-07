const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const OrderSchema = new mongoose.Schema({   
     userId:{
         type:ObjectId,
         ref:'User',
        },
        chefId:{
         type:ObjectId,
         ref:'User',
        },
     menuId:{
        type:ObjectId,
        ref:'Menu',
     },
     date:{
        type:Date
    }},{timestamps:true})

module.exports = mongoose.model('Order',OrderSchema);
