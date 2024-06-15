const mongoose= require('mongoose')


const Product=mongoose.Schema({
  Title:String,
  Price:Number,
  Description:String,
  Image:String,
})


module.exports=mongoose.model('Product',Product)