require('dotenv').config();
const express=require('express');
const app=express();
const connectDB=require('./config.js/db.config');
connectDB();
const research=require('./router/research.router');
const user=require('./router/user.router');

app.use(express.json);
app.get('/',(req,res)=>{
    return res.send('hello researcher');
})

app.use('/user',research);
app.use('/user',user);
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    try{
        console.log(`port runnuing on ${port}`)
}catch(error){
        console.log('error');
}
})