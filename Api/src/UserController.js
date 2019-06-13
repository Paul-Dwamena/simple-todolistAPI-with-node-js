const User = require('../database/user')
const express=require('express')
const router=express.Router()
const auth=require('../src/helper')


//register route
router.all('/', (req, res)=>{ 

    if (req.method != "POST"){
          console.log(req.method)
          res.status('405').send('Method not allowed')
      }
      else
    User.create({
        username:req.body.username,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password
    },(err,user)=>{
        if(err){
        console.log("There was a problem registering the user.")
        User.findOne({username:req.body.username},(err,doc)=>{
            if(doc){
                res.status(400).send({
                error:'Username already exists'	
                })
            }
            else{ 

                User.findOne({email:req.body.email},(err,doc)=>{
                if(doc){  
                res.status(400).send({
                error:'email already exists'	
                })
            }
            })
             }               
    })

}else{
    var token= auth.generate_token(user._id,user.password,user.email)
    res.status(200).send({
                success:'User registered successfully',
                auth:true,
                token:token
                })
}
})}
  )
    
    
  module.exports =router
  