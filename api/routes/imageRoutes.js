var multer = require('multer');
var path = require('path');
var fs = require('fs');
const UPLOAD_PATH = path.join(__dirname,'../../uploads');
const UPLOAD_PATH_PERFIL = path.join(__dirname,'../../uploads/perfis');
const UPLOAD_PATH_ANUNCIO = path.join(__dirname,'../../uploads/anuncios');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    var uPath = UPLOAD_PATH;
    var tipo = req.headers.tipo;

    if(tipo == 'anuncio'){
      var an_id = req.headers.anuncio_id;
      uPath = UPLOAD_PATH_ANUNCIO;
    }

    if(tipo == 'perfil'){
      uPath = UPLOAD_PATH_PERFIL;
    }
    cb(null, uPath);
  },
  filename: function (req, file, cb) {
    var tipo = req.headers.tipo;

    var name = file.fieldname;

    if(tipo == 'perfil'){
      var apelido = req.headers.apelido;
      name = apelido;
    }

    if(tipo == 'anuncio'){
      var an_id = req.headers.anuncio_id;
      name = an_id;
    }
    cb(null, name + '.jpeg');
  }
})

const upload = multer({ storage: storage })

module.exports = function(app) {
  var anuncioController = require('../controllers/anuncioController');

  app.route('/uploads/realizarUpload').
    post(function(req,res) {
      upload.single('image')(req,res,function(err){
        if (err instanceof multer.MulterError) {
          console.log(err);
      // A Multer error occurred when uploading.
        } else if (err) {
          console.log(err);
      // An unknown error occurred when uploading.
        }
      });

      res.status(200).send('ok');
  });


  app.route('/uploads/perfis/:apelido')
    .get(function(req,res){
      const apelido = req.params.apelido;
      res.setHeader('Content-Type','image/jpeg');
      fs.createReadStream(path.join(UPLOAD_PATH_PERFIL,apelido+'.jpeg')).pipe(res);
    });

  app.route('/uploads/anuncios/:an_id')
    .get(function(req,res){
      const an_id = req.params.an_id;
      res.setHeader('Content-Type','image/jpeg');
      fs.createReadStream(path.join(UPLOAD_PATH_ANUNCIO,an_id+'.jpeg')).pipe(res);
    });
};
