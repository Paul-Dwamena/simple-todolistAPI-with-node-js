const express = require('express')
const app = express();
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
const db=require('./Api/config/db')

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




app.listen(5050, () => {
  console.log('CodePeepsApp listening on port 5050!')
});