const multer = require('multer');
const path = require('path')

const dest = path.join(__dirname,'../storage/uploads/');

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    if (!file) {
      next(null,true)
    }
    else if (file.mimetype.startsWith('image/')) {
      console.log(file.originalname);
      console.log(file.mimetype);
      next(null, dest+'images/');
    }
     
    else if (file.mimetype.startsWith('video/'))
      next(null, dest+'videos');
    else if(file.mimetype.startsWith('audio/'))
      next(null, dest+'audio/');
    else {
      console.log(file.mimetype);
      next({ message: 'File format not supported! select another one.' })
    }
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname);
    console.log(file.size);
     cb(null,file.originalname);
  }  
});
const fileFilter = function (req, file, cb) {
  if (!file) {
    console.log("no file");
    cb(null,true);
  }
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype.startsWith('audio/'))
    cb(null,true);
  else{
    cb({ message: 'format not supported' })
  } ;
}

module.exports= multer({fileFilter , storage });