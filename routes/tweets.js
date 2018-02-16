const express = require("express");
const router = express.Router();
const Tweet = require("../models/Tweet");

router.get("/", (req,res)=>{
    Tweet.find({}, (err,docs)=>{
        if(err) return res.send(err);
        res.render("home", {tweets:docs});
    });
});

router.get("/new", (req,res)=>{
    if(!req.session.currentUser) return res.redirect("/users/login");
    res.render("tweet_form", {
        user:req.session.currentUser,
        errorMessage:null
    });
});

router.post("/new", (req,res)=>{
    
    const tweet = new Tweet({
        body: req.body.tweetText,
        user_id: req.session.currentUser._id,
        user_name: req.session.currentUser.username,
    });
   tweet.save((err, result)=>{
    if(err) return res.send(err);
    res.redirect("/");
   }); 
});

module.exports = router;



