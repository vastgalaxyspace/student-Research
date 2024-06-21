const express=require('express');
const research=express.Router();
const researchcontroller=require('../controller/research.controller');
const upload=require('../middleware/upload.middleware');

research.post('/create',upload.single('file'),researchcontroller.createresearch);

module.exports=research;

