require('dotenv').config();
const express=require('express');
const app=express();
const connectDB=require('./config.js/db.config');
connectDB();
const research=require('./router/research.router');

app.get('/',(req,res)=>{
    return res.send('hello researcher');
})

app.use('/user',research);
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    try{
        console.log(`port runnuing on ${port}`)
}catch(error){
        console.log('error');
}
})