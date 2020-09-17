const multer = require('multer')
// const path = require('path')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.fieldname}-${Date.now()}.png`)
    }
})

const upload = multer({
  storage ,
  limits: {fileSize: 512000}, // 500mb
  fileFilter(req,file,callback){
      if(file.originalname.match(/\.(jpg|jpeg|png)\b/)){
          callback(null, true)
      }else{
          callback('Image type must jpg,jpeg,png', null)
      }
  }
})

module.exports = upload