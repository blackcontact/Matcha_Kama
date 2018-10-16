const multer = require('multer');
const _ = require('lodash');
// TODO - Lire le fichier final et checker sa validité avec magic (fileTyp) si on a du temps
// const readChunk = require('read-chunk');
// const fileType = require('file-type');



// File upload functions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + _.kebabCase(file.originalname) + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  }
});
const fileMimeTester = function(req, file, cb) {
  if (file.mimetype != 'image/gif' && file.mimetype != 'image/png' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/bmp')
  {
    return cb(null, false);
  }
  cb(null, true);
};
var upload = multer({storage, fileFilter: fileMimeTester, limits: {fileSize:  4 * 1024 * 1024}}).single('image'); //4MB max




module.exports = {
  uploadMiddleware(req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).send({err: err.message});
      } else if (err) {
        res.status(500).send({err: err.message});
      }
      else {
        next();  
      }
    });
  },
  uploadEnd(req, res) {
    if (req.file) {
      console.log(req.file);
      res.send('File uploaded');
    }
    else
      res.status(400).send({err: 'No file received or file is not a valid image'});  
  }
};