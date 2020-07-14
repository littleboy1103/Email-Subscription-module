const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")

const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


app.get("/",(req,res)=>{
        res.sendFile(__dirname+"/index.html")    
})

app.post("/",(req,res)=>{
    var name=req.body.name
    var email=req.body.email
    var data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:name,
            }
        }]
    }

    var jsonData=JSON.stringify(data)
    var options={
        url:"https://us4.api.mailchimp.com/3.0/lists/0e664e21f2",
        method:"POST",
        headers:{
            "Authorization":"littleboy1103 8f81391057ec4506b9b6fbfc0e33bfc2-us4"
        },
        body:jsonData

    }
    
    request(options,(err,response,body)=>{
        if (response.statusCode
            ==200) {
                res.sendFile(__dirname+"/success.html")
            
        }
        else{
            res.sendFile(__dirname+"/fail.html")


        }

    })
    
})

app.post("/fail",(req,res)=>{
    res.redirect("/")
})

app.listen(process.env.PORT || 1103,()=>{
    console.log(`Server Started on Port 1103`);
    
})
