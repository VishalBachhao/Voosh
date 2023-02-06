/*const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel")
const validation = require("../validators/validation")

const authentication = async function (req, res, next) {
    try {

    
        let token = req.headers['x-api-key']
        console.log(token)
        if (!token) {
            return res.status(401).send({ status: false, msg: "Token is required" })
        }

     

        jwt.verify(token, "voosh-pizzaDelivery-secret-key", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({ status: false, message: "Token is invalid" })
            } else {
                req.token = decodedToken
                next()
            }
        })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const authorization = async function (req, res, next) {
    try {
        let decodedToken = req.token

        if (!validation.isValidObjectId(userId)) { 
            return res.status(400).send({ status: false, message: "User ID is not valid, please enter correct user ID" }) 
        }

        const checkUserId = await userModel.findById(userId)
        if (!checkUserId) {
            return res.status(404).send({ status: false, message: "User ID not found, please use another user ID" })
        }

        if (userId != decodedToken.userId) {
            return res.status(403).send({ status: false, message: "Authorisation failed; You are not authorised person " })
        } else {
            next()
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { authentication }

*/