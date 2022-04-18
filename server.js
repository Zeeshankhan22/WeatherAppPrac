const express=require("express")
const bodyparser=require("body-parser")
const request =require("request")
const https=require("https")
const { json } = require("body-parser")


const app=express()

app.use(express.static("info"))
app.use(bodyparser.urlencoded({extended:true}))


app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post('/',function(req,res){
    const value=req.body.cityname
    const id="d51dc9bc6179a29ff70fb7a5a4e05251"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+value+"&appid="+id+"&units=metric"
    
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on('data',function(data){
            const wea=JSON.parse(data)
            const des=wea.weather[0].description
            const temp=wea.main.temp
            const icon=wea.weather[0].icon
            const iconimg="http://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<h1>Your City Weather is: "+des+"</h1>")
            res.write("<h1>Your City Temperature is: "+temp+"</h1>")
            res.write("<img src="+iconimg+">")
            res.send()

        })
    })
    

})

app.listen(3000,function(){
    console.log("Server run on 3000 Port");
})



