const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

cloudinary.config({
    cloud_name: 'do3hvqxmd', 
    api_key: '672489388764445',
    api_secret: 'JTW2cHKhGQbVAhOzPN5F_208By8'
});

//Multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../public/images/profiles'));
    },
    filename: (req, file, callback) => {
        const newProfileImage = 'profile-' + Date.now() + path.extname(file.originalname);
        callback(null, newProfileImage);
    }
});

const upload = multer({ storage });

const cloudinaryMiddleware = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se proporcionó ningún archivo.');
    }

    //Subir la imagen a Cloudinary
    cloudinary.uploader.upload(
      req.file.path,
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Error al subir la imagen a Cloudinary.');
        }

        console.log('URL de Cloudinary:', result.secure_url);

        req.cloudinaryUrl = result.secure_url;

        //Guardar url en una constante
        if (req.user) {
            req.user.cloudinaryUrl = result.secure_url;
        }

        next();
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error en el middleware de Cloudinary.');
  }
};

module.exports = cloudinaryMiddleware;

