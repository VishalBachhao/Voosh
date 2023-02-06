const { ok } = require('assert');
const express = require('express');
const router = express.Router();
const pizzaCont= require("../controllers/pizzaController")
const userCont= require("../controllers/userController")
const orderCont = require("../controllers/orderController")
//const auths = require('../checkUsr/auth')


//to add the products in our websites
router.post("/pizza",pizzaCont.pizzaDetails)
router.get("/pizzaDetails",pizzaCont.getPizzaDetails)

//consumer part

router.post("/add-user",userCont.createUser)
router.post('/login-user', userCont.loginUser)
router.post('/add-order',orderCont.createOrder)
router.get('/get-order',orderCont.getOrders)




module.exports = router;
