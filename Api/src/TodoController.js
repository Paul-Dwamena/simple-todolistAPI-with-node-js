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

router.put('/update/:id',auth.checkToken,(req,res)=>{
    let body=req.body
    Todo.findById(req.params.id,'user title content completed',(err,doc)=>{
      if(err){console.error(err)}
      var userID=doc.user._id
      var authenticateduserid=req.userId
      if(userID !=authenticateduserid){
       return res.status(500).send("You do not have acces to edit Todo")
      }
      else if(req.body.completed=="true"){
        Todo.updateOne({_id:req.params.id},{$set:{completed:true},title:req.body.title,description:req.body.description }, function(err,result){
          if(err){
            
            return res.status(500).send("Unable to update Todo")
          }
          else{
            res.json("You have updated Todo successfully")
          }
      })
      }
      else if(req.body.completed=="false" || req.body.completed==null){
        Todo.updateOne({_id:req.params.id},{$set:{completed:false},title:req.body.title,description:req.body.description }, function(err,result){
            if(err){   
              return res.status(500).send("Unable to update Todo")
            }
            else{
              res.json("You have updated Todo successfully")
            }
        })

      }
      
    })

})
    //delete route
    router.put('/delete/:id', auth.checkToken,(req, res) => {

        Todo.findById(req.params.id,'user',(err,doc)=>{
            if(err){console.error(err)}
            var userID=doc.user._id.toString()
            var authenticateduserid=req.userId
            if(userID !==authenticateduserid){
             res.status(500).send("You are not authorised to delete Todo")
          }else{
            Todo.remove({
              _id: req.params.id
            }, function(err, post){
              if (err)
                res.status.send(err)
              res.json({
                msg:'You have successfully deleted a todo'
              })
            })
          }
      
        })
        
      })
      
      





        
       
    
    
    


  module.exports=router