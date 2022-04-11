const Menu  = require("../models/menu")
const {errorHandler} = require('../helper/dbErrHelper')
const { userId } = require("./user")
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
       Menu.find({userId:userid}).exec((err,menu)=>{
           if(err){
               return res.status(400).json({error:"No Menu Uploaded"})
           }
           console.log(menu)
           return res.send(menu)
       });
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
    Menu.find().exec((err,menu)=>{
        if(err){
            return res.status(400).json({error:"No Menu Uploaded"})
        }
        console.log(menu)
        return res.send(menu)
    });
}