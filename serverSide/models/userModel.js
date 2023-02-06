const mongoose=require('mongoose')

const userSchema = mongoose.Schema(
    {
name:{type:String, require:true},
phone:{type:Number,require:true,unique:true},
email:{type:String, require:true,unique:true},
password:{type:String,require:true},
address:{type:String,require:true},
state:{type:String},
zip:{type:Number}
    },{timeStamp:true}
)
const userModel=mongoose.model('user',userSchema)

module.exports=userModel