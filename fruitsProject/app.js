const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit",fruitsSchema);

const orange = new Fruit({
    // name: "Oranage",
    rating: 4,
    review: "Very sour!"
})

// orange.save()


Fruit.find(function(err,fruits){
    if(err){
        console.log(err);
    }else{
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        })
    }
})