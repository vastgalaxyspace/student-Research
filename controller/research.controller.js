const Research=require('../model/research.model');

const researchcontroller={};

researchcontroller.createresearch=async(req,res)=>{
    try{const {title,description,fileType}=req.body;
    const userid=req.user._id;

    const file=req.file;
    const filepath=file.path;

    const newresearch=new Research({
        title,
        description,
        user:userid,
        files:[{
            fileType,
            filepath
        }]
    });

    await newresearch.save();
    res.status(200).json({message:"sucess",research:newresearch});
}catch(error){
    return res.status(400).json(error);
}
};

module.exports=researchcontroller;