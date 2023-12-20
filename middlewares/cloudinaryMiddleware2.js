const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')
const user = require('../database/models/User.js');

cloudinary.config({ 
  cloud_name: 'do3hvqxmd', 
  api_key: '672489388764445 ',
  api_secret: 'JTW2cHKhGQbVAhOzPN5F_208By8'
});

const cloudinaryMiddleware = async (req, res, next) => {
  try {

    if(user && user.image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(user.image, { public_id: "profileIMG" }, 
      function(error, result) {console.log(result)});
      console.log(cloudinaryResponse);
    }
    next();
  } catch (error) {
    console.error('Error en el middleware de Cloudinary:', error);
    next(error);
  }
};

module.exports = cloudinaryMiddleware;
