const express = require('express')
const cors = require('cors')
const multer = require('multer')
const app = express()

require('./db/config')
const User = require('./db/User')
// const uploadModel = require('./db/User')
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
    companyName:req.body.companyName,
    companyDescription:req.body.companyDescription,
    companyNumber:req.body.companyNumber,
    contactEmail:req.body.contactEmail,
    // image: req.file.filename,
    state:req.body.state,
    city:req.body.city
    }); 
    let result = await user.save(); 
    res.send(result) 
})


// app.post("/upload",upload, (req,res)=>{
    


//     res.send("file upload")
// })




app.get('/',(req,res)=>{
    res.send("Hello backend here.")
})

app.listen(5000)