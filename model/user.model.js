const mongoose=require('mongoose');
const {createHmac, randomBytes}=require('crypto');
const {generateToken}=require('../services/auth.services');
const userSchema=new mongoose.Schema({

     name:{type:String,required:true},
     email:{type:String,required:true},
     password:{type:String,required:true},
     role:{type:String,enum:['user','researcher'],required:true},
     salt:{type:String,required:true}
},{timestamps:true});

userSchema.pre('save',function(next){
     const user =this;
     if(!user.isModified('password')) return next();
     const salt=randomBytes(16).toString('hex');
     const hash=createHmac('sha256',salt)
     .update(user.password)
     .digest('hex');

     this.salt=salt;
     this.password=hash;
     next();

});

userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
     const user=await this.findOne({email});
     if(!user) throw new Error('user not found');

     const salt=user.salt;
     const hashpassword=user.password;

     const userprovidehash=createHmac('sha256',salt)
     .update(user.password)
     .digest('hex');

     if(hashpassword !== userprovidehash) throw new Error('Invalid Password');

     const token=generateToken(user);
     return token;
})
module.exports=mongoose.model('User',userSchema);
