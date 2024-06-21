const mongoose=require("mongoose");
const Research=new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
     created:{type:Date,    default:Date.now},
     files:[
        {
            filepath:{type:String,required:true},
            uploadAt:{type:String,required:true},
            filetype:{
                type:String,
                enum:['document','image','video'],
                required:true
            }
        }
     ]
},{timestamp:true})

module.exports=mongoose.model('Research',Research);