const Todo=require('../database/todo')
const User=require('../database/user')
const express=require('express')
const router=express.Router()
const auth=require('../src/helper')


//getting all Todos
router.get('/',(req,res)=>{
    Todo.find().populate({path:'user',select:'username contact'}).sort({_id: -1}).limit(10).exec(function(error, doc){
          if(error){
              console.error(error)
          }
          res.json({
              Todos:doc
          })
      })
  })


//add a Todo
router.post('/createTodo',auth.checkToken,(req,res)=>{

    User.findById(req.userId,(err,result)=>{
        if (err) 
        {
          return res.status(404).send("Account not found")
        }
        var user=result;
        let body=req.body
        if("title" in body && "description" in body){
            Todo.create({
                title:body.title,
                description:body.description,
                user:user
            },(err,success)=>{

                if(err) res.status(500).send("Unable to create new Todo")
                else res.send({
                  msg:"Todo added successfuly"
                })
            })
        }
        else res.send("Provide both a title and a description")
    })
   
  })
  


  //updating a Todo

  module.exports=router