//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Admin-KruNULL:1234@cluster0.xoqc4.mongodb.net/BlogsDB",{ useNewUrlParser: true , useUnifiedTopology: true});

//Schema
const BlogSchema = mongoose.Schema(
    {
      title: String,
      content: String
    }
);

//Model
const Blogs = mongoose.model("blogs",BlogSchema);

const homeStartingContent = "Welcome to Blog website!!";
const aboutContent = "About Page";
const contactContent = "Contact Page";

app.get("/",function(req,res)
{
  Blogs.find(function(err,finalList)
  {
    if(!err)
    {
      // console.log(finalList);
      res.render("home",{homeStartingContent:homeStartingContent, allP: finalList});
    }
  });
  
});

app.get("/posts/:topic",function(req,res)
{
  Blogs.findOne({_id: req.params.topic},function(err,post)
  {
    if(!err){
      res.render("post",{post:post});
    }
  });
  
});


app.get("/about",function(req,res)
{
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res)
{
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res)
{
  res.render("compose",{});
});

app.post("/compose",function(req,res)
{
  const newPost = new Blogs(
    {
      title: req.body.newTitle,
      content: req.body.newContent
    }
  );
  
  newPost.save();
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running");
});
