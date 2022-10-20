const mongoose = require("mongoose");

//Schema

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  contactnum: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

//Model

module.exports = mongoose.model("userdetails", userSchema); //userdetails is the collection name in our Mongo Database.
