const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true},
    description:{type:String, required: true},
    contactnum:{type:String, required: true},
    email:{type:String, required: true, unique: true},
    // image: String,
    state:{type:String, required: true},
    city:{type:String, required: true},
})

module.exports = mongoose.model("userdetails",userSchema) //userdetails is our collection name in our Database.
  