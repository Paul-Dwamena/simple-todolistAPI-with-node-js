const express = require('express')
const app = express();
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
const db=require('./Api/config/db')
const usercontroller=require('./Api/src/UserController')
const todocontroller=require('./Api/src/TodoController')

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use(bodyParser.json())

mongoose.connect(db.name,{useNewUrlParser: true, useCreateIndex: true},(err)=>{
  if(err){
      console.log("can't connect to database")
      return
  }
})


app.use('/user',usercontroller)
app.use('/todos',todocontroller)

app.listen(5050, () => {
  console.log('CodePeepsApp listening on port 5050!')
});