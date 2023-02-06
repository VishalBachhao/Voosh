
const pizzaMod = require('../models/pizzaModels')

const pizzaDetails = async function(req,res){

    try{
        let data=req.body
        let createData = await pizzaMod.create(data)
        res.status(201).send({status:true,msg:createData})
    }catch(error){
        res.status(500).send({status:false,msg:error.message})
    }
}
/******************************************************************** */

const getPizzaDetails = async function(req,res){
try{
    let pizzaDetail = await pizzaMod.find().select({__v:0})
    res.status(200).send({status:false,msg:pizzaDetail})
}catch(error){
res.status(500).send({status:false,msg:error.message})
}

}

module.exports.pizzaDetails=pizzaDetails
module.exports.getPizzaDetails=getPizzaDetails