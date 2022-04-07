const jwt = require('jsonwebtoken')             //to generate signed web token
const expressJwt = require('express-jwt')       // for authorization check
const User = require('../models/user')
const {errorHandler} = require('../helper/dbErrHelper')

exports.signUp =  (req,res)=>{

    console.log(req.body);
    const user = new User(req.body)
    user.save((err,user)=>{
      if(err){
         return res.status(400).json({
              error:errorHandler(err)
            });
      }
    user.salt = undefined
    user.hashed_password = undefined
    return res.json({user});
  });
    
};



exports.signIn = (req,res)=>{

  //User based on email
  const{userId,password} = req.body
  User.findOne({userId},(err,user)=>{
      if(err || !user){
          return res.status(400).json({error:'User with userId does not exists. Please sign Up'});

      }
      //If user is found then check for password with hashed password
      if(!user.authenticate(password)){
              return res.status(401).json({error:'Invalid Credientials'});
      }

      //generate signed token with user id and secret

      token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
      //persist the token as 't' in cookie with expiry date
      res.cookie('t',token,{expire:new Date()+999});
      //return response with user and token to client

      const {_id,email,name,role,chefId} = user
      return res.json({token,user:{_id,email,name,role,chefId}});
       

  });

};

exports.signOut = (req,res)=>{

  res.clearCookie('t');
  return res.json({'message':'Sign Out successfull'});
  
  };

