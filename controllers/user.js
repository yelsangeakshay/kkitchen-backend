const User = require('../models/user')
const Menu = require('../models/menu')




exports.userId = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req = user;
        next();
    });
};

exports.getChef = (req,res)=>{   
    Menu.find().exec((err,data)=>{
        if(err || !data){
            return res.status(400).json({error:"No Menus uploadedd"})
        }
        else{
            return res.send(data)
        }
    });
           
   
    // User.find({role:"1"}).exec((err,user)=>{
    //     if(err || !user){
    //         return res.status(400).json({
    //             error: "Chef not available for near by location"
    //         });
    //     }
    //     else{
    //         var arr = [];
    //         Promise.all(user.map((u,i)=>{
    //              return Menu.find({userId:u._id}).exec();
    //          })).then(data=>{
    //            return res.send(data)
    //          }).catch(err=>{
 
    //          })
    //     }
    // }) ;    
}

exports.getLocation=(req,res)=>{
    User.find({role:"1"}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "Chef not available for near by location"
            });
        }
        else{
           
            console.log("User Location")
            return res.send(user)
        }
    }) ;    
}

exports.addOrderToUserHistory = (req,res)=>{
    console.log("Request Body", req.body)
//     let history = []
    User.findOneAndUpdate(
    { _id: req.body.userId },
    {$push:{orderhistory:req.body}},
   
    { new: true },
    (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            });
        }
       console.log("User",user)
       return res.json(user);
    }
);
}

exports.getUserName=(req,res)=>{
    
}

exports.getProfile=(req,res)=>{
    console.log("Request bidy")
    let userid = req.query.id
    console.log(req.query.id)
    User.find({_id:userid}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "Error fetching User Details"
            });
        }
        else{
                   
            return res.send(user)
        }
    }) ;  
}

exports.update = (req, res) => {
    console.log("Body",req.body)
    let userid = req.query.id
    User.findOneAndUpdate(
        { _id: userid},
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};

exports.getCustomerDetails=(req,res)=>{
    console.log("In FUnction")
     User.find({role:0},{_id:1,name:1,email:1,contactNumber:1,address:1}).exec((err,data)=>{
        if(err || !data){
            return res.status(400).json({error:"No Customer Available"})
         }
        else{
            return res.send(data)
        }
    });
}

exports.getChefDetails=(req,res)=>{
    User.find({role:1}).exec((err,data)=>{
        if(err || !data){
            return res.status(400).json({error:"No Chefs Available"})
         }
        else{
            return res.send(data)
        }
    }); 
}