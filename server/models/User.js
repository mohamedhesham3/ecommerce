const mongoose= require('mongoose')


const User=mongoose.Schema({
  Username:String,
  Email:String,
  Password:String,
  Avatar:String,
  List:Array
})


module.exports=mongoose.model('User',User)