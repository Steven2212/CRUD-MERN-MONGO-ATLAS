const mongoose = require("mongoose");

//Schema

const userSchema = new mongoose.Schema({
  name: String,
  description: String,
  contactnum:String,
  email: String,
  state: { type: String},
  city: { type: String}
});

//Model

// module.exports = mongoose.model("userdetails", userSchema); //userdetails is the collection name in our Mongo Database.
module.exports = mongoose.model("users", userSchema); //userdetails is the collection name in our Mongo Database.
