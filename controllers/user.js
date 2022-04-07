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

