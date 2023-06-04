// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

// console.log(date());
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const items = [];
const workitems = [];
app.set('view engine', 'ejs');

app.get("/" , function(req , res){
    let day = date.getDate();  
    res.render("list", {ListTitle: day , newListItems : items});
});

app.post("/" , function(req,res){
    let item = req.body.newItem;
    if(req.body.list == "work"){
        workitems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
})

app.get("/work" , function(req , res){
    res.render("List" , {ListTitle: "work List" , newListItems: workitems});
})

app.post("/work" , function(req , res){
    let item = req.body.newItem;
    workitems.push(item);
    res.redirect("/work");
})

app.get("/about" , function(req , res){
    res.render("about");
})
app.listen(3000 , function(){
    console.log("Server is running at port 3000");
});