
var mongoose = require('mongoose');




const Todo = mongoose.Schema({
    title: {type: String, required: [true, "cant be blank"]},
    description: String,
    completed:{
        type:Boolean,
        enum:['true','false']
    }
    },{
    timestamps: true
});

Todo.pre('save', function(next){
    this.completed ='false'
    next()
})

module.exports = mongoose.model('todo', Todo) 