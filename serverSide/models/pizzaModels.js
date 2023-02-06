
const mongoose=require('mongoose')

const pizzaSchema = mongoose.Schema(
    {
name:{type:String, require},
variants:[],
prices:[],
category:{type:String,require},
image:{type:String},
description:{type:String}

    },{timeStamps:true}
)
const pizzaModel=mongoose.model('pizzas',pizzaSchema)

module.exports=pizzaModel