const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()
const User = require('./db/User')
require('./db/config')
app.use(express.json()) 
app.use(cors())

//POST API to send data to MongoDB.

app.post('/form', async (req,res)=>{
    let user = new User({
    name:req.body.name,
    description:req.body.description,
    contactnum:req.body.contactnum,
    email:req.body.email,
    state:req.body.state,
    city:req.body.city
    }); 
    let result = await user.save(); 
    res.send(result) 
})

//GET API to fetch data from MongoDB.

app.get('/userdata',async(req,res)=>{
    let userdata = await User.find();
    if(userdata.length>0){
        res.send(userdata)
    } else{result:"No data found."} 
})


//GET API to fetch data of single user from MongoDB.
app.get('/userdata/:id',async (req,res)=>{
    let result = await User.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    } else{result:"No record found."}
})

//UPDATE API to update or edit data in MongoDB.

app.put('/updatedata/:id', async (req,res)=>{
    let result = await User.updateOne(
        {_id:req.params.id},
        {   
            $set:req.body 
        }
        )
        res.send(result)
})

//DELETE API to delete data from MongoDB.

app.delete('/deletedata/:id',async(req,res)=>{
    let result = await User.deleteOne({_id:req.params.id});
    res.send(result)
})

//SEARCH API to search data from MongoDB.

app.get('/search/:key',async(req,res)=>{
    let result = await User.find(
       {
           "$or":[
               {name:{$regex:req.params.key}},
               {description:{$regex:req.params.key}},
               {contactnum:{$regex:req.params.key}},
               {email:{$regex:req.params.key}},
               {state:{$regex:req.params.key}},
               {city:{$regex:req.params.key}}
           ]
       })
       res.send(result)
   })

app.listen(5000)