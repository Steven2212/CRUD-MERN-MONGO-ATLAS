const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()

require('./db/config')
const User = require('./db/User')
app.use(express.json()) 
app.use(cors())

// app.post('/form', async  (req,res)=>{
//     let user = new User(req.body); 
//     let result = await user.save(); 
//     res.send(result) 
// })

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb) //destination means where we want to save our file.
        {
            cb(null,"uploads") //uploads is our folder name where it will be saved.
        },
        filename:function(req,file,cb){
            cb(null,file.filename+"-"+Date.now()+".jpg")
        }
    })
}).single("image") //single file we are going to upload now.

app.post('/form',upload, async (req,res)=>{
    let user = new User({
    name:req.body.name,
    description:req.body.description,
    contactnum:req.body.contactnum,
    email:req.body.email,
    // image: req.file.filename,
    state:req.body.state,
    city:req.body.city
    }); 
    let result = await user.save(); 
    res.send(result) 
})

app.get('/userdata',async(req,res)=>{
    let userdata = await User.find();
    if(userdata.length>0){
        res.send(userdata)
    } else{result:"No data found."} 
})


//SINGLE PRODUCT GET API
app.get('/userdata/:id',async (req,res)=>{
    let result = await User.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    } else{result:"No record found."}
})



app.put('/updatedata/:id', async (req,res)=>{
    let result = await User.updateOne(
        {_id:req.params.id}, // with reference to this id we will fetch or identify the product which we want to update.
        {   
            $set:req.body  //these are the things which we will update.
        }
        )
        res.send(result)
})

app.delete('/deletedata/:id',async(req,res)=>{
    let result = await User.deleteOne({_id:req.params.id});
    res.send(result)
})



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
   

app.get('/',(req,res)=>{
    res.send("Hello backend here.")
})

app.listen(5000)