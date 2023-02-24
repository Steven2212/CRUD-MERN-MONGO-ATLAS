
//Connecting NodeJS to MongoDB using Mongoose.

const mongoose = require('mongoose')

//To connect to Local mongoDB :
//  mongoose.connect('mongodb://localhost:27017/companyDB');

//To connect to MongoDB Atlas:
 mongoose.connect('mongodb+srv://steven:steven123@cluster0.93jori1.mongodb.net/CRUD?retryWrites=true&w=majority').then(()=>{
    console.log("Connected successfully.")
 }).catch(()=>{
    console.log("Failed to connect.")
 });

