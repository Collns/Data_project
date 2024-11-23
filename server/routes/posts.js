const express = require('express');
const router = express.Router();
const {Services} = require("../models");
const { Customers} = require("../models");

router.get("/", async (req,res)=>
{
    const listOfPost = await Customers.findAll();
    res.json(listOfPost);
});

router.post("/", async (req,res) => 
{
    const post = req.body;
   await Customers.create(post);
   res.json(post);
});


module.exports = router;