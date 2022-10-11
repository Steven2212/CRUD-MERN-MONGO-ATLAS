const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    companyName:String,
    companyDescription:String,
    companyNumber:Number,
    contactEmail:String,
    // image: String,
    state:String,
    city:String
})

module.exports = mongoose.model("userdetails",userSchema) //userdetails is our collection name in our Database.
  