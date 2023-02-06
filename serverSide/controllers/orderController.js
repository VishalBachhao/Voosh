const orderMod= require('../models/orderModels')
const usrMod = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createOrder = async function(req,res){

try{

    
    let data = req.body
    let token=req.headers['x-api-key']
    let tokenVerify=jwt.verify(token,"voosh-pizzaDelivery-secret-key")
    let getData = tokenVerify.userId

    let findEmail=await usrMod.findOne({email:getData}).select({password:0,__v:0,email:0})
    if(!findEmail){
        res.send({msg:"user not found"})
    }
    let ordr = {
        pizzaOrder:data,
        customerData:findEmail,
        email:getData
    }
    let placeOrd= await orderMod.create(ordr)
   
return res.status(201).send({ status: true, data:{placeOrd}})

}catch(error){
    return res.status(500).send({ status: false, data:error.message})
}
  
}

// get orders

const getOrders = async function(req,res){
    try{
       
        let token=req.headers['x-api-key']
        let tokenVerify=jwt.verify(token,"voosh-pizzaDelivery-secret-key")
        if(!tokenVerify){
            res.status(401).send({status:false,msg:"unauthorised user"})
        }
        let getData = tokenVerify.userId

        let orders = await orderMod.find({email:getData})
        if(!orders){
            res.status(404).send({status:false,data:"not found"})
        }else{
            
            res.status(200).send({status:true,data:orders})
        }
       
    }catch(error){
        res.status(500).send({status:false,data:error.message})
    }
    
}


module.exports.createOrder = createOrder
module.exports.getOrders = getOrders
