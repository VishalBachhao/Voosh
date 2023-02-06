const express = require('express')
const mongoose = require('mongoose')
const db = require('./db')
const route = require('./routes/route')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


app.use('/',route)

const port = process.env.PORT || 5000

app.listen(port,()=>{console.log(' server connected 5000')})