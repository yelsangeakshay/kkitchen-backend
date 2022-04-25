const User = require('../models/user')

exports.getCustomerDetails=(req,res)=>{
    console.log("In FUnction")
    // User.find({role:1}).exec((err,data)=>{
    //     if(err || !data){
    //         return res.status(400).json({error:"No Customer Available"})
    //     }
    //     else{
    //         return res.send(data)
    //     }
    // });
}

exports.getdish1 =(req,res)=>{
  console.log(req)
}
