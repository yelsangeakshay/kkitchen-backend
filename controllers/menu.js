const Menu  = require("../models/menu")
const {errorHandler} = require('../helper/dbErrHelper')
const { userId } = require("./user")
var moment = require('moment');
exports.create = (req,res) =>{
    const menu = new Menu(req.body)
    console.log("Request Body",req.body)
    menu.save((err,data)=>{
        if(err){
            console.log("Error",err)
            res.status(400).json({error:"Dish Name is required"});
        }
        return res.json(data)
    })
}

exports.getmenu =(req,res)=>{
        let userid = req.query.userid
        var now = new Date();
        var today = moment(now).format('YYYY-MM-DD');
        Menu.find({
            $and:[
                {userId:userid},
                {date:{$gte:today}}
            ]
        }).exec((err,menu)=>{
            if(err){
                return res.status(400).json({error:"No Menu Uploaded"})
            }
            console.log(menu)
            return res.send(menu)
        });
    //    Menu.find({userId:userid}).exec((err,menu)=>{
    //        if(err){
    //            return res.status(400).json({error:"No Menu Uploaded"})
    //        }
    //        console.log(menu)
    //        return res.send(menu)
    //    });
}

exports.getdish =(req,res)=>{
    let id = req.query.id
    Menu.findOne({_id:id}).exec((err,dish)=>{
       if(err){
           return res.status(400).json({error:"No Menu Uploaded"})
       }
       console.log(dish)
       return res.send(dish)
   });
}

exports.menuId = (req, res, next, id) => {
    Menu.findById(id).exec((err, menu) => {
        if (err || !menu) {
            return res.status(400).json({
                error: "Order is not placed"
            });
        }
        req = menu;
        next();
    });
};

exports.getAllMenus=(req,res)=>{
    var now = new Date();
    var today = moment(now).format('YYYY-MM-DD');
    Menu.aggregate([ 
        {$match:  {date:{$gte:today}}  },           
        {
            $lookup:{
                from: "users",
                localField:"userId",
                foreignField:"_id",
                as:"user_info",
            },
        },
        // Deconstructs the array field from the
  // input document to output a document
  // for each element
  {
    $unwind: "$user_info",
  },
],function(err,data){
    if(!err){
        return  res.send(data)
    }
    console.log("DATA",data,err)
})    
    // Menu.find().exec((err,menu)=>{
    //     if(err){
    //         return res.status(400).json({error:"No Menu Uploaded"})
    //     }
    //     console.log(menu)
    //     return res.send(menu)
    // });
}