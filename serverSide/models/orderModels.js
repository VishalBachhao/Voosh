const mongoose=require('mongoose')

const orderSchema = mongoose.Schema(
    {
pizzaOrder:{type:Object},
customerData:{type:Object},
email:{type:String,required:true,unique:true}
    },{timeStamp:true}
)
const orderModel=mongoose.model('order',orderSchema)

module.exports=orderModel