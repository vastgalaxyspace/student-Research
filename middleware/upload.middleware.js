const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const fileType=req.body.fileType;
        let folder='uploads/others/';
        if(fileType==='document') folder = 'uploads/documents/';
        if(fileType === 'image') folder = 'uploads/image/';
        if(fileType === 'video') folder = 'uploads/videos/';
        cb(null,folder);

    },
    filename:(req,file,cb)=>{
        const title = req.body.title.toLowerCase().replace(/\s+/g, '').slice(0, 10);
        const ext=file.originalname.split(".").pop();
        cb(null,`${title}.${ext}`);
    }

});
const upload=multer({storage:storage});
module.exports=upload;