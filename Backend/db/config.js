
//Connecting NodeJS to MongoDB using Mongoose.

const mongoose = require('mongoose')

//  mongoose.connect('mongodb://localhost:27017/companyDB');
//  mongoose.connect('mongodb+srv://steven:steven123@cluster0.93jori1.mongodb.net/CRUD?retryWrites=true&w=majority');
 mongoose.connect('mongodb+srv://steven:steven123@cluster0.93jori1.mongodb.net/CRUD?retryWrites=true&w=majority').then(()=>{
    console.log("Connected successfully.")
 }).catch(()=>{
    console.log("Failed to connect.")
 });


 /////////////////////////////////////////////////

 //Mongo DB Atlas

//  const mongoose = require('mongoose');

//  const connectionString = 'mongodb+srv://steven:steven123>@users/CRUD?retryWrites=true&w=majority';
//  const connectionString = 'mongodb+srv://steven:steven123@cluster0.93jori1.mongodb.net/CRUD?retryWrites=true&w=majority';
 
//  mongoose.connect(connectionString, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//  }).then(()=>{
//     console.log("Connected successfully.")
//  }).catch(()=>{"Not connected."})
 
//  const db = mongoose.connection;
//  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//  db.once('open', function() {
//    console.log('Connected to MongoDB');
//  });
 