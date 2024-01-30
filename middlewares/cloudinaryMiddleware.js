const cloudinary = require('cloudinary').v2;
const { validationResult } = require("express-validator");

cloudinary.config({
    cloud_name: 'do3hvqxmd', 
    api_key: '672489388764445',
    api_secret: 'JTW2cHKhGQbVAhOzPN5F_208By8'
});

function addPropertiesCloudinary(file, result) {
    file.cloudinaryUrl = result.secure_url;
}

const cloudinaryMiddleware = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        const file = req.file;

        if (!file) {
            return next();
        }

        if (!errors.isEmpty()) {
            return next();
        }

        const options = {};

        if (req.body.idImagenAntesDeActualizar) {
            options.public_id = req.body.idImagenAntesDeActualizar;
            options.invalidate = true;
            options.overwrite = true;
        } else {
            options.folder = 'seatech';
            options.allowed_formats = ['jpg', 'png', 'jpeg'];
        }

        options.transformation = [{ width: 512, height: 512 }];

        const result = await cloudinary.uploader.upload(file.path, options);

        if (result.error) {
            console.error(result.error);
            return res.status(500).json({ error: 'Error al subir el archivo a Cloudinary' });
        } else {
            addPropertiesCloudinary(file, result);
            return next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir el archivo a Cloudinary' });
    }
};

module.exports = cloudinaryMiddleware;
