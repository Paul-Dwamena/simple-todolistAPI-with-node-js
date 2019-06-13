
var mongoose = require('mongoose');

const Todo = mongoose.Schema({
    title: {type: String, required: [true, "cant be blank"]},
    description: {type: String, required: [true, "cant be blank"]},
    completed:{
        type:Boolean,
        enum:['true','false']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
      },
    },{
    timestamps: true
});

Todo.pre('save', function(next){
    this.completed ='false'
    next()
})

module.exports = mongoose.model('todo', Todo) 