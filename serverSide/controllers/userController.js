
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const validation = require("../validators/validation")
const jwt = require('jsonwebtoken')


//-------------------------------------------------create User/ post"register" ---------------------------------------------------

const createUser = async function (req, res) {

    try {
        let data = req.body;
        // console.log(data)
        let { name,  email, password, phone, address } = data

        if (!validation.isValidRequestBody(data))
            return res.status(400).send({ status: false, message: "please provide  details" })

        //============================================NAME====================================================    
        if (!validation.isValid(name))
            return res.status(400).send({ status: false, message: "first name is required or not valid" })

        if (!validation.isValidName(name))
            return res.status(400).send({ status: false, message: "first name is not valid" })


        //============================================EMAIL====================================================

        if (!validation.isValid(email))
            return res.status(400).send({ status: false, message: "email is required " })

        if (!validation.isValidEmail(email))
            return res.status(400).send({ status: false, message: "email is not valid" })

        let checkEmail = await userModel.findOne({ email: email })

        if (checkEmail) return res.status(409).send({ status: false, message: "This email has already been registered" })

        //===========================================PHONE=================================================
        if (!validation.isValid(phone))
            return res.status(400).send({ status: false, message: "phone No. is required " })

        if (!validation.isValidPhone(phone))
            return res.status(400).send({ status: false, message: "Please provide a valid Indian phone No." })

        let checkPhone = await userModel.findOne({ phone: phone })

        if (checkPhone) return res.status(409).send({ status: false, message: "This phone No. has already been registered" })

        //==========================================PASSWORD================================================

        if (!validation.isValid(password))
            return res.status(400).send({ status: false, message: "Pasword is required or not valid" })

        if (!validation.isValidPassword(password))
            return res.status(400).send({ status: false, message: "Password length should be 8 to 15 digits and enter atleast one uppercase or lowercase and special character" })



        //===========================================HASHING PASSWORD==============================================
        const salt = await bcrypt.genSalt(10)
        // return res.send(salt.toString())
        const hashedPassword = await bcrypt.hash(data.password, salt)
        data.password = hashedPassword


        //===========================================CREATING DOCUMENT==============================================
        let createData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User created successfully", data: createData })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
        
    }
}

//-------------------------------------------------login User/post(login) ------------------------------------------

const loginUser = async function (req, res) {
    try {

        const requestBody = req.body;
        console.log(requestBody)

        //-----------validating request body----------

        if (!validation.isValidRequestBody(requestBody)) {
            return res.status(400).send({
                status: false,
                message: " Please provide login credentials",
            });
        }

        //-----------destructuring--------------------

        let { email, password } = requestBody;

        //------------email validation-----------------
        if (!email) {
            return res.status(400).send({
                status: false,
                message: `Email is required`
            });
        }
        if (!validation.isValidEmail(email)) {
            return res.status(400).send({
                status: false,
                message: `Provide valid email address`,
            });
        }

        //------------password validation-----------------

        if (!password) {
            return res.status(400).send({
                status: false,
                message: `Password is required`
            });
        }
        if (!validation.isValidPassword(password)) {
            return res.status(400).send({
                status: false,
                message: "Please enter a valid password"
            });
        }

        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).send({ status: false, message: "Invalid credentials" })
        }

        let userPass = user.password
        let checkPass = await bcrypt.compare(password, userPass)
        if (!checkPass) { return res.status(400).send({ status: false, message: "Invalid password" }) }

        //---------------- token creation--------------

        let token = jwt.sign(
            {
                userId: email,
                Team: "Vishal",
                organisation: "Voosh-Pizza"

            },
            "voosh-pizzaDelivery-secret-key", { expiresIn: '1h' }
        );
            res.cookie("jwt",token,{expires:new Date(Date.now()+25892000000),httpOnly:true});
        res.status(201).send({ status: true, message: "login successful", user : { token: token, userId: user._id } });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};



module.exports = { createUser, loginUser}

