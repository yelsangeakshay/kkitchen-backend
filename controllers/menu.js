const Menu  = require("../models/menu")
const {errorHandler} = require('../helper/dbErrHelper')
const { userId } = require("./user")
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')
var moment = require('moment');
exports.create = (req,res) =>{
     
   let form =new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) =>{
        if(err){            
            return res.status(400).json({
                error:'Image could not be uploaded'
            });
         }
         console.log("Fields",fields)
       const {description, dishName, cusineType, ingredients, price_pickup, price_delivery, date,  photo} = fields;
      // console.log("DishName",dishName,photo)
       if(!dishName || !description  || !ingredients  || !date){
          return res.status(400).json({
                 error:'All Fields are required'
              })
     }
      let menu = new Menu(fields)
       if(files.photo){

             if(files.photo.size > 10000000){
                return res.status(400).json({
                    error:'Image should be less than 10 MB'
                 })
            }
           
           
            menu.photo.data = fs.readFileSync(files.photo.filepath)
            menu.photo.contentType = files.photo.mimetype
        }
      menu.save((err,data)=>{
         if(err){
              console.log("Error",err)
           res.status(400).json({error:"Dish Name is required"});
          }
       return res.json(data)
  })
        
    })
}
    // menu.save((err,data)=>{
    //         console.log("Error",err)
    //         res.status(400).json({error:"Dish Name is required"});
    //     }
    //     return res.json(data)
    // })/     if(err){
    
exports.photo =(req,res,next)=>{
    if(req.menu.photo.data){
        res.set('Content-Type',req.menu.photo.contentType);
        return res.send(req.menu.photo.data)
    }
    next();
    // Menu.find({_id:menuId}).exec((err,menu)=>{
    //     if(err){
    //         return res.status(400).json({error:"No Menu Uploaded"})
    //     }
    //     res.set('Content-Type',menu.photo.contentType);
    //     return res.send(menu.photo.data)
    // });
 
}


exports.getmenu =(req,res)=>{
    //consoel.log("updated")
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
           // console.log(menu)
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
    Menu.findOne({_id:id}).select("-photo").exec((err,dish)=>{
       if(err){
           return res.status(400).json({error:"No Menu Uploaded"})
       }
      // console.log(dish)
       return res.send(dish)
   });
}

exports.menuId = (req, res, next, id) => {
    Menu.findById(id).exec((err, menu) => {
        if (err || !menu) {
            return res.status(400).json({
                error: "Menu is not available"
            });
        }
        req.menu = menu;
        next();
    });
};

exports.getAllMenus=(req,res)=>{
    var now = new Date();
    var today = moment(now).format('YYYY-MM-DD');
    console.log(today)
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
    //console.log("DATA",data,err)
})    
    // Menu.find().exec((err,menu)=>{
    //     if(err){
    //         return res.status(400).json({error:"No Menu Uploaded"})
    //     }
    //     console.log(menu)
    //     return res.send(menu)
    // });
}