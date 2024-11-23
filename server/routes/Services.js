const express = require('express');
const router = express.Router();
const {Services} = require("../models");


router.get("/", async (req,res)=>
{
    const listOfServices = await Services.findAll();
    res.json(listOfServices);
});

router.post("/", async (req,res) => 
{
    const service = req.body;
   await Services.create(service);
   res.json(service);
});


module.exports = router;