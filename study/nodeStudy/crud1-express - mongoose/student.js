const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/itcast',{useNewUrlParser:true})

let studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0,1],
    default: 0
  },
  age: {
    type: Number
  },
  hobbies: {
    type:String
  }
})


module.exports = mongoose.model('student',studentSchema)