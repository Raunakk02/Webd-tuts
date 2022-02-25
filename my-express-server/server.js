const express = require("express");

const app = express(); 

app.get("/",function(req,res){
    res.send("hello");
})

app.get("/contact",function(req,res){
    res.send("Contact me at: rk@email.com");
})

app.get("/about",function(req,res){
    res.send("I am a student!");
})

app.listen(3000, function (){
    console.log("Server started at port 3000");
});