const User = require('../database/user')
const express=require('express')
const router=express.Router()
const auth=require('../src/helper')


//register route
router.all('/register', (req, res)=>{ 

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


  //login route
  router.all('/login',(req,res)=>{

	if (req.method != "POST"){
        console.log(req.method)
        res.status('405').send('Method not allowed')
	}
	
User.findOne({$or:[{username:req.body.username},{email:req.body.email}]},(err,doc)=>{
		if (err)
			res.status(500).send("Error on the server ")
		else{
			if(doc){
                var ispasswordvalid=doc.password==req.body.password
                if(ispasswordvalid){
                    res.json({
                        id:doc.id,
                        username:doc.username,
                        contact:doc.contact,
                        email:doc.email,
                        token: auth.generate_token(doc.id,doc.password,doc.email)
                    })
                }else{
                    res.status(401).send({
                        error:"Wrong username or Password",
                        auth:false,
                    token:null})
                }
            }
                		
            else{
				res.status(400).send({
					error:"Wrong username or Password"})
			}
		}
	})

})

router.put('/editUser',auth.checkToken,(req, res) => {
    User.findById(req.userId, 'username,contact ', function (error, user) {
      if (error) 
      {
        return res.status(404).send("Account not found")
      }
      user.username=req.body.username
      user.contact=req.body.contact
      user.save(function(error){
        if(error){
          console.error(error)
        }
        res.send({
          msg:'You have updated the your profile successfully'
        })
      })
    })
  })
    
  module.exports =router
  