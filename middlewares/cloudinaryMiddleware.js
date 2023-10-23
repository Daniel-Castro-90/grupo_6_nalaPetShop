import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'nalaPetShop',
  api_key: '672489388764445',
  api_secret: 'JTW2cHKhGQbVAhOzPN5F_208By8',
});

const cloudinaryMiddleware = (req, res, next) => {

  next();
}
