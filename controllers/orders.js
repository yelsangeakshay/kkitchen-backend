const Order  = require("../models/orders")
const Menu  = require("../models/menu")
const User  = require("../models/user")
const {errorHandler} = require('../helper/dbErrHelper')
const { userId } = require("./user")
const { menuId } = require("./menu")
const mongoose = require('mongoose');
var moment = require('moment');
const {ObjectId} = mongoose.Schema
exports.create = (req,res) =>{
    const order = new Order(req.body)
    console.log("Create Order",req.body)
    order.save((err,data)=>{
        if(err){
            console.log("Error",err)
            res.status(400).json({error:"Oredrs is not placed. Please try again"});
        }
        return res.json(data)   
    })
}

exports.getOrderHistory =(req,res)=>{
    let userid = req.query.id   
        Order.aggregate([                
            {
                $lookup:{
                    from: "menus",
                    localField:"menuId",
                    foreignField:"_id",
                    as:"orders_info",
                },
            },
            // Deconstructs the array field from the
      // input document to output a document
      // for each element
      {
        $unwind: "$orders_info",
      },
    ],function(err,data){
        if(!err){
            return  res.send(data)
        }
        console.log("DATA",data,err)
    })    
}

exports.getOrderHistory1 =(req,res)=>{
    let userid = req.query.id   
    userid = mongoose.Types.ObjectId(userid)
    console.log(userid)
        Order.aggregate([
            {$match: { userId:userid } },
              {
                $lookup:{
                    from: "users",
                    localField:"chefId",
                    foreignField:"_id",
                    as:"orders_info",
                },
            },
            // Deconstructs the array field from the
      // input document to output a document
      // for each element
      {
        $unwind: "$orders_info",
      },
    ],function(err,data){
        if(!err){
            return  res.send(data)
        }
        console.log("DATA",data,err)
    })    
}

exports.getChefCurentOrders=(req,res)=>{
    let id = req.query.id   
    id = mongoose.Types.ObjectId(id)
    var now = new Date();
    var today = moment(now).format('YYYY-MM-DD');
    console.log(id,today)
    Order.aggregate([ 
        {$match: { 
            $and:[
                {chefId:id },
                {date:{$gte:today}}              
               
            ] }},
        {
            $lookup:{
                from: "users",
                localField:"userId",
                foreignField:"_id",
                as:"customer_info",
            },
        },
        // Deconstructs the array field from the
  // input document to output a document
  // for each element
  {
    $unwind: "$customer_info",
  },
],function(err,data){
    if(!err){
        return  res.send(data)
    }
    console.log("DATA",data,err)
})  
    
}

exports.getOrderHistoryChef =(req,res)=>{

    let userid = req.query.id   
    userid = mongoose.Types.ObjectId(userid)
    console.log(userid) 
        Order.aggregate([  
            
            {$match: { chefId:userid } },
            {
                $lookup:{
                    from: "users",
                    localField:"userId",
                    foreignField:"_id",
                    as:"orders_info",
                },
            },
            // Deconstructs the array field from the
      // input document to output a document
      // for each element
      {
        $unwind: "$orders_info",
      },
    ],function(err,data){
        if(!err){
            return  res.send(data)
        }
        console.log("DATA",data,err)
    })    
}




