require('dotenv').config();
const express=require('express');
const app=express();
const connectDB=require('./config.js/db.config');
connectDB();

app.get('/',(req,res)=>{
    return res.send('hello researcher');
})
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    try{
        console.log(`port runnuing on ${port}`)
}catch(error){
        console.log('error');
}
})