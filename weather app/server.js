const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/get-weather",function(req,res){
    const city = req.body.city;


    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=bb642520e0c12105afa885bb8a774037&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.feels_like;
            const weatherDescription = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";

            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<h1>The current temparature is "+ temp +"</h1>");
            res.write("<img src='"+icon+"' alt='weather icon'>")
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("Server running at port 3000");
})