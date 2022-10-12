
app.get('/userdata',async(req,res)=>{
    let userdata = await userSchema.find();
    if(userdata.length>0){
        res.send(userdata)
    } else{result:"No Data found."}
})

