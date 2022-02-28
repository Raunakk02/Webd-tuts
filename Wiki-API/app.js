const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// MONGODB

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    content: String
});

const Article = mongoose.model("Article",articleSchema);

// TODO START

app.get("/articles",function(req,res){
    Article.find(function(err,articles){
        if(err){
            res.send(err);
        }else{
            res.send(articles);
        }
    });
});

app.post("/articles",function(req,res){
    let t = req.body.title;
    let c = req.body.content;
    console.log(t, c);

    const article = new Article({
        title: t,
        content: c
    });

    article.save(function(err){
        if(err){
            res.send(err);
        }else{
            res.send("Successfully saved the data!");
        }
    });
});

// TODO END

app.listen(3000,function(){
    console.log("Server running on port 3000");
})