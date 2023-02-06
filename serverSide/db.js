const mongoose = require('mongoose')
const mongoUrl = "mongodb+srv://vishalwildrider:6yZfkOyIdxIrmxAJ@cluster0.visax7o.mongodb.net/vishal101194?retryWrites=true&w=majority"

mongoose.set('strictQuery', true)
mongoose.connect(mongoUrl,{useUnifiedTopology:true,useNewUrlParser:true})

var db=mongoose.connection

db.on('connected',()=>{
    console.log('db connected')
})
db.on('error',()=>{console.log('db connection failed')})

module.exports = mongoose