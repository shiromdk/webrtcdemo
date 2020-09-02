const express = require("express");
const router = express.Router();
const fs = require('fs')
const multer = require('multer')
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage})
const getStream = require('into-stream');


router.get('/', async(req,res)=>{
    res.json({ok:"OK"})
})

// router.put('/', async(req,res)=>{

// })

router.post('/', singleFileUpload.single('file'), async(req,res)=>{


})




module.exports = router;
