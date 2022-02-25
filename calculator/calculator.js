const express = require("express");
const bodyParser = require("body-parser"); 

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    var n1 = Number(req.body.num1);
    var n2 = Number(req.body.num2);
    res.send("The result is: "+(n1+n2));
})

app.get("/bmiCalculator",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
})

app.post("/bmiCalculator",function(req,res){
    var h = Number(req.body.height);
    var w = Number(req.body.weight);

    res.send("Your BMI is: "+(w/(h*h)));
})

app.listen(3000,function(){
    console.log("Server running on port 3000");
})