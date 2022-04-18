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
     dishName:{
      type:String,     
      maxlength:32
    },
  cusineType:{
      type:String
  },

    quantity:{
   type:Number
      },
   price:{
   type:Number
   },
   shipping:{
   type:String
      },
     date:{
        type:Date
    },
      time:{
         type:String
      }},{timestamps:true})

module.exports = mongoose.model('Order',OrderSchema);
