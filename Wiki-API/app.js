const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
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

const Article = mongoose.model("Article", articleSchema);

// TODO START

////////////////////////////////// REQUESTS FOR ALL ARTICLES ////////////////////////////////////////
app.route("/articles")

    .get(function (req, res) {
        Article.find(function (err, articles) {
            if (err) {
                res.send(err);
            } else {
                res.send(articles);
            }
        });
    })

    .post(function (req, res) {
        let t = req.body.title;
        let c = req.body.content;
        console.log(t, c);

        const article = new Article({
            title: t,
            content: c
        });

        article.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully saved the data!");
            }
        });
    })

    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("All the articles deleted successfully!");
            }
        })
    });

////////////////////////////////////// REQUESTS FOR SPECIFIC ARTICLE //////////////////////////
app.route("/articles/:articleTitle")

    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No articles found that match the given title");
            }
        });
    })

    .put(function (req, res) {
        Article.replaceOne(
            { title: req.params.articleTitle },
            {
                title: req.body.title,
                content: req.body.content
            },
            function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Updated successfully");
                }
            }
        );
    })
    
    .patch(function(req,res){
        Article.updateOne(
            { title: req.params.articleTitle },
            {
                title: req.body.title,
                content: req.body.content
            },
            function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Updated successfully");
                }
            }
        );
    })
    
    .delete(function(req,res){
        Article.deleteOne(
            { title: req.params.articleTitle },
            function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Deleted successfully");
                }
            }
        );
    });

// TODO END

app.listen(3000, function () {
    console.log("Server running on port 3000");
})