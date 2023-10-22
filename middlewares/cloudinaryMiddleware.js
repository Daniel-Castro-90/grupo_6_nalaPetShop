import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'tu_nombre_de_cloud',
  api_key: 'tu_api_key',
  api_secret: 'tu_api_secret',
});

const cloudinaryMiddleware = (req, res, next) => {

  next();
}
